using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using OperativaCaja.Models;

namespace OperativaCaja.Controllers
{
    public class CajasController : Controller
    {
        private FNSOFTEntities db = new FNSOFTEntities();

        // GET: Cajas
        public ActionResult Index()
        {
            var caja = db.Caja.Include(c => c.agencias).Include(c=>c.PlanCuentas);
            return View(caja.ToList());
        }
		public ActionResult registroAbastecimiento()
        {
            var registroAbastecimiento = db.RegistroAbastecimientos.Include(c => c.Caja).Include(c=>c.PlanCuentas).Include(c=>c.agencias);
            return View(registroAbastecimiento.ToList());
        }

        // GET: Cajas/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Caja caja = db.Caja.Find(id);
            if (caja == null)
            {
                return HttpNotFound();
            }
            return View(caja);
        }

        // GET: Cajas/Create
        public ActionResult Create()
        {
            ViewBag.agencia = new SelectList(db.agencias, "codigoagencia", "nombreagencia");
            ViewBag.cta_abastecimiento = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE");
            return View();
        }

        // POST: Cajas/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Codigo_caja,Nombre_caja,Consecutivo_ini,consecutivo_fin,TopeMaximo_caja,consecutivo_actual,Serie,agencia,cta_abastecimiento")] Caja caja)
        {
			if (db.Caja.Any(a => a.Codigo_caja == caja.Codigo_caja))
			{
				ModelState.AddModelError("Codigo_caja", "Codigo Registrado Anteriormente ");
				ViewBag.alert = "Codigo de caja Registrado Anteriormente ";
			}
			else
			{
				if (caja.Consecutivo_ini >= caja.consecutivo_fin)
				{
					ModelState.AddModelError("consecutivo_fin", "No debe ser menor o igual al consecutivo inicial.");
					ViewBag.alert = "Consecutivo Final  Mayor o igual al Inicial";
				}
				else
				{
					String id = caja.cta_abastecimiento;
					PlanCuentas plan = db.PlanCuentas.Find(id);
					if (plan == null)
					{
						return HttpNotFound();
					}
					else
					{
						decimal saldoCaja;
						saldoCaja = plan.Saldo;
						decimal topmax = Convert.ToDecimal(caja.TopeMaximo_caja);
						if (saldoCaja < topmax)
						{
							ModelState.AddModelError("TopeMaximo_caja", "No hay saldo para Abastecimiento.");
							ViewBag.alert = "Cuenta sin Efectivo Suficiente para Abastecimiento.";

						}
						else
						{
							if (ModelState.IsValid)
							{
								ViewBag.alert = "Guardado";
								var updatePlancuentasCajageneral = "UPDATE acc.PlanCuentas SET Saldo=Saldo-" + caja.TopeMaximo_caja + "WHERE CODIGO='" + id + "'";
								db.Database.ExecuteSqlCommand(updatePlancuentasCajageneral);

								string fecha= Convert.ToString(DateTime.Now);
								
								

								db.Caja.Add(caja);
								db.SaveChanges();
								ViewBag.agencia = new SelectList(db.agencias, "codigoagencia", "nombreagencia", caja.agencia);
								ViewBag.cta_abastecimiento = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", caja.cta_abastecimiento);

								var insertAbastecimientos = "INSERT INTO dbo.RegistroAbastecimientos (fecha, cod_caja, cta_abastecimiento, abastecimiento,agencia)VALUES('" + fecha + "','" + caja.Codigo_caja + "','" + caja.cta_abastecimiento + "'," + caja.TopeMaximo_caja + "," + caja.agencia + ")";
								db.Database.ExecuteSqlCommand(insertAbastecimientos);
								return View();
							}
							
							
						}
					}
				}
			}
			ViewBag.agencia = new SelectList(db.agencias, "codigoagencia", "nombreagencia", caja.agencia);
			ViewBag.cta_abastecimiento = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", caja.cta_abastecimiento);
			return View(caja);
		}

        // GET: Cajas/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Caja caja = db.Caja.Find(id);
            if (caja == null)
            {
                return HttpNotFound();
            }
			Session["tope_caja"] = caja.TopeMaximo_caja;

			ViewBag.agencia = new SelectList(db.agencias, "codigoagencia", "nombreagencia", caja.agencia);
			ViewBag.cta_abastecimiento = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE",caja.cta_abastecimiento);
			return View(caja);
        }

        // POST: Cajas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Codigo_caja,Nombre_caja,Consecutivo_ini,consecutivo_fin,TopeMaximo_caja,consecutivo_actual,Serie,agencia,cta_abastecimiento")] Caja caja, String aumento)
        {
			if (caja.Consecutivo_ini >= caja.consecutivo_fin)
			{
				ModelState.AddModelError("consecutivo_fin", "No debe ser menor o igual al consecutivo inicial.");
				ViewBag.alert = "Consecutivo Final  Mayor o igual al Inicial";
			}
			else
			{
				String id = caja.cta_abastecimiento;
				PlanCuentas plan = db.PlanCuentas.Find(id);
				if (plan == null)
				{
					return HttpNotFound();
				}
				else
				{
					decimal saldoCaja;
					saldoCaja = plan.Saldo;
					decimal aumen = Convert.ToDecimal(aumento);
					if (saldoCaja < aumen)
					{
						ModelState.AddModelError("TopeMaximo_caja", "No hay saldo para Abastecimiento.");
						ViewBag.alert = "Cuenta sin Efectivo Suficiente para Abastecimiento.";

					}
					else
					{
						if (ModelState.IsValid)
						{
							Session["editado"] = "si";
							var updatePlancuentasCajageneral = "UPDATE acc.PlanCuentas SET Saldo=Saldo-" + aumento + "WHERE CODIGO='" + id + "'";
							db.Database.ExecuteSqlCommand(updatePlancuentasCajageneral);


							var fecha = DateTime.Now;
							var insertAbastecimientos = "INSERT INTO dbo.RegistroAbastecimientos (Fecha, cod_caja, cta_abastecimiento, abastecimiento,agencia)VALUES('" + fecha + "','" + caja.Codigo_caja + "','" + caja.cta_abastecimiento + "'," + aumento + ","+caja.agencia+")";
							db.Database.ExecuteSqlCommand(insertAbastecimientos);


							db.Entry(caja).State = EntityState.Modified;
							db.SaveChanges();
							return RedirectToAction("Index");
						}
					}
				}
			}
			ViewBag.cta_abastecimiento = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", caja.cta_abastecimiento);
			ViewBag.agencia = new SelectList(db.agencias, "codigoagencia", "nombreagencia", caja.agencia);
			return View(caja);
        }

        // GET: Cajas/Delete/5
        public ActionResult Delete(string id)
        {
			configCajero configCajero = db.configCajero.Find(id);
			string cajaregistrada = db.Database.SqlQuery<string>("SELECT Codigo_caja FROM dbo.configCajero WHERE Codigo_caja='" + id + "' ").FirstOrDefault();
			if (cajaregistrada == null)
			{
				Session["Eliminado"] = "si";
				Caja caja = db.Caja.Find(id);
				db.Caja.Remove(caja);
				db.SaveChanges();
				return RedirectToAction("Index");
			}
			else
			{
				Session["Eliminado"] = "no";
				return RedirectToAction("Index");
			}
		}

        // POST: Cajas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Caja caja = db.Caja.Find(id);
            db.Caja.Remove(caja);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
