using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using OperativaCaja.Models;

namespace OperativaCaja.Controllers
{
    public class configCajeroesController : Controller
    {
        private FNSOFTEntities db = new FNSOFTEntities();

        // GET: configCajeroes
        public ActionResult Index()
        {
            var configCajero = db.configCajero.Include(c => c.ClaseComprobante).Include(c => c.ClaseComprobante1).Include(c => c.PlanCuentas).Include(c => c.PlanCuentas1).Include(c => c.PlanCuentas2).Include(c => c.PlanCuentas3).Include(c => c.Terceros).Include(c => c.Caja).Include(c => c.TiposComprobantes).Include(c => c.TiposComprobantes1).Include(c => c.CentrosCostos).Include(c => c.CentrosCostos1).Include(c => c.TiposComprobantes2);
            return View(configCajero.ToList());
        }

        // GET: configCajeroes/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            configCajero configCajero = db.configCajero.Find(id);
            if (configCajero == null)
            {
                return HttpNotFound();
            }
            return View(configCajero);
        }
		[HttpPost]
		public JsonResult GetCajeroInfo(string cajeroId)

		{			
			Terceros terceros = db.Terceros.Find(cajeroId);
			var response = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2; 
			return Json(response);
			
		}
		// GET: configCajeroes/Create
		public ActionResult Create()
        {
            ViewBag.Compr_ingreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre");
            ViewBag.Compr_egreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre");
            ViewBag.Contr_banco = new SelectList(db.PlanCuentas.Where(a =>a.CODIGO.Length>=9), "CODIGO", "NOMBRE");
            ViewBag.Contr_otro = new SelectList(db.PlanCuentas.Where(a => a.CODIGO.Length>=9), "CODIGO", "NOMBRE");
            ViewBag.Cta_efectivo = new SelectList(db.PlanCuentas.Where(a=>a.CODIGO.Length>=9), "CODIGO", "NOMBRE");
            ViewBag.Cta_cheque = new SelectList(db.PlanCuentas.Where(a => a.CODIGO.Length>=9), "CODIGO", "NOMBRE");
            ViewBag.Nit_cajero = new SelectList(db.Terceros, "NIT", "NIT");
            ViewBag.Codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja");
            ViewBag.Compr_ingreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE");
            ViewBag.Compr_egreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE");
            ViewBag.centrocosto = new SelectList(db.CentrosCostos, "Codigo", "Nombre");
            ViewBag.CentroCostoCaja = new SelectList(db.CentrosCostos, "Codigo", "Nombre");
            ViewBag.Tipocomprobante_caja = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE");
            return View();
        }

        // POST: configCajeroes/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Codigo_caja,Nit_cajero,Compr_ingreso,Compr_egreso,Contr_banco,Contr_otro,Cta_efectivo,Cta_cheque,centrocosto,CentroCostoCaja,Tipocomprobante_caja")] configCajero configCajero)
        {
			if (db.configCajero.Any(a => a.Nit_cajero == configCajero.Nit_cajero))
			{
				ModelState.AddModelError("Nit_cajero", "Usuario Registrado en Caja");
				ViewBag.alertCreate = "Usuario Registrado en Caja";
			}
			if (ModelState.IsValid)
			{
				Session["Creado"] = "si";//valiable que funciona como una bandera dentro de la vista para la alerta de que el usuario se a creado con exito
				db.configCajero.Add(configCajero);
				db.SaveChanges();
				return RedirectToAction("Index");
			}

            ViewBag.Compr_ingreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_ingreso);
            ViewBag.Compr_egreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_egreso);
            ViewBag.Contr_banco = new SelectList(db.PlanCuentas.Where(a => a.CODIGO.Length>9), "CODIGO", "NOMBRE", configCajero.Contr_banco);
            ViewBag.Contr_otro = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>9), "CODIGO", "NOMBRE", configCajero.Contr_otro);
            ViewBag.Cta_efectivo = new SelectList(db.PlanCuentas.Where(a =>a.CODIGO.Length>9), "CODIGO", "NOMBRE", configCajero.Cta_efectivo);
            ViewBag.Cta_cheque = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>9), "CODIGO", "NOMBRE", configCajero.Cta_cheque);
            ViewBag.Nit_cajero = new SelectList(db.Terceros, "NIT", "NIT", configCajero.Nit_cajero);
            ViewBag.Codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja", configCajero.Codigo_caja);
            ViewBag.Compr_ingreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_ingreso);
            ViewBag.Compr_egreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_egreso);
            ViewBag.centrocosto = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.centrocosto);
            ViewBag.CentroCostoCaja = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.CentroCostoCaja);
            ViewBag.Tipocomprobante_caja = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Tipocomprobante_caja);
            return View(configCajero);
        }

        // GET: configCajeroes/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            configCajero configCajero = db.configCajero.Find(id);
            if (configCajero == null)
            {
                return HttpNotFound();
			}
			else
			{
				Terceros terceros = db.Terceros.Find(id);
				ViewBag.nombre = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;
				ViewBag.Compr_ingreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_ingreso);
				ViewBag.Compr_egreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_egreso);
				ViewBag.Contr_banco = new SelectList(db.PlanCuentas.Where(a => a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Contr_banco);
				ViewBag.Contr_otro = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Contr_otro);
				ViewBag.Cta_efectivo = new SelectList(db.PlanCuentas.Where(a =>a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Cta_efectivo);
				ViewBag.Cta_cheque = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Cta_cheque);
				ViewBag.Nit_cajero = new SelectList(db.Terceros, "NIT", "DIGVER", configCajero.Nit_cajero);
				ViewBag.Codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja", configCajero.Codigo_caja);
				ViewBag.Compr_ingreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_ingreso);
				ViewBag.Compr_egreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_egreso);
				ViewBag.centrocosto = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.centrocosto);
				ViewBag.CentroCostoCaja = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.CentroCostoCaja);
				ViewBag.Tipocomprobante_caja = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Tipocomprobante_caja);
				return View(configCajero);

			}
			


		}

        // POST: configCajeroes/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Codigo_caja,Nit_cajero,Compr_ingreso,Compr_egreso,Contr_banco,Contr_otro,Cta_efectivo,Cta_cheque,centrocosto,CentroCostoCaja,Tipocomprobante_caja")] configCajero configCajero)
        {
            if (ModelState.IsValid)
            {
				Session["editado"] = "si";
				db.Entry(configCajero).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.Compr_ingreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_ingreso);
            ViewBag.Compr_egreso = new SelectList(db.ClaseComprobante, "Codigo", "Nombre", configCajero.Compr_egreso);
            ViewBag.Contr_banco = new SelectList(db.PlanCuentas.Where(a => a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Contr_banco);
            ViewBag.Contr_otro = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Contr_otro);
            ViewBag.Cta_efectivo = new SelectList(db.PlanCuentas.Where(a =>a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Cta_efectivo);
            ViewBag.Cta_cheque = new SelectList(db.PlanCuentas.Where(a =>  a.CODIGO.Length>=9), "CODIGO", "NOMBRE", configCajero.Cta_cheque);
            ViewBag.Nit_cajero = new SelectList(db.Terceros, "NIT", "Nit", configCajero.Nit_cajero);
            ViewBag.Codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja", configCajero.Codigo_caja);
            ViewBag.Compr_ingreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_ingreso);
            ViewBag.Compr_egreso = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Compr_egreso);
            ViewBag.centrocosto = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.centrocosto);
            ViewBag.CentroCostoCaja = new SelectList(db.CentrosCostos, "Codigo", "Nombre", configCajero.CentroCostoCaja);
            ViewBag.Tipocomprobante_caja = new SelectList(db.TiposComprobantes, "CODIGO", "NOMBRE", configCajero.Tipocomprobante_caja);
            return View(configCajero);
        }

        // GET: configCajeroes/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            configCajero configCajero = db.configCajero.Find(id);
            if (configCajero == null)
            {
                return HttpNotFound();
            }
            return View(configCajero);
        }

        // POST: configCajeroes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            configCajero configCajero = db.configCajero.Find(id);
			string cajero = db.Database.SqlQuery<string>("SELECT nit_cajero FROM dbo.FactOpcaja WHERE nit_cajero='" + id + "' ").FirstOrDefault();
			if (cajero == null)
			{
				Session["Eliminado"] = "si";
				db.configCajero.Remove(configCajero);
				db.SaveChanges();
				return RedirectToAction("Index");
			}
			else
			{
				Session["Eliminado"] = "no";
				return RedirectToAction("Index");
			}
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
