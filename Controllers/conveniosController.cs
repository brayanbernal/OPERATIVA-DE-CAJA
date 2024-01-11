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
    public class conveniosController : Controller
    {
        private FNSOFTEntities db = new FNSOFTEntities();

        // GET: convenios
        public ActionResult Index()
        {
            var convenio = db.convenio.Include(c => c.PlanCuentas);
            return View(convenio.ToList());
        }

        // GET: convenios/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            convenio convenio = db.convenio.Find(id);
            if (convenio == null)
            {
                return HttpNotFound();
            }
            return View(convenio);
        }

        // GET: convenios/Create
        public ActionResult Create()
        {
            ViewBag.cuenta = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE");
            return View();
        }

        // POST: convenios/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "codigo,nombre_convenio,cuenta")] convenio convenio)
        {
			if (db.convenio.Any(a => a.codigo == convenio.codigo))
			{
				ModelState.AddModelError("codigo", "Codigo ya existe Ingrese uno nuevo.");
			}

			if (ModelState.IsValid)
            {
                db.convenio.Add(convenio);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.cuenta = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", convenio.cuenta);
            return View(convenio);
        }

        // GET: convenios/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            convenio convenio = db.convenio.Find(id);
            if (convenio == null)
            {
                return HttpNotFound();
            }
            ViewBag.cuenta = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", convenio.cuenta);
            return View(convenio);
        }

        // POST: convenios/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "codigo,nombre_convenio,cuenta")] convenio convenio)
        {
            if (ModelState.IsValid)
            {
                db.Entry(convenio).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.cuenta = new SelectList(db.PlanCuentas, "CODIGO", "NOMBRE", convenio.cuenta);
            return View(convenio);
        }

        // GET: convenios/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            convenio convenio = db.convenio.Find(id);
            if (convenio == null)
            {
                return HttpNotFound();
            }
            return View(convenio);
        }

        // POST: convenios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            convenio convenio = db.convenio.Find(id);
            db.convenio.Remove(convenio);
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
