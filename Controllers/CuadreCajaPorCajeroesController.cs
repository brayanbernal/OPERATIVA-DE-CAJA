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
    public class CuadreCajaPorCajeroesController : Controller
    {
        private FNSOFTEntities db = new FNSOFTEntities();

        // GET: CuadreCajaPorCajeroes
        public ActionResult Index()
        {
			

            var cuadreCajaPorCajero = db.CuadreCajaPorCajero.Include(c => c.configCajero).Include(c => c.Caja);
            return View(cuadreCajaPorCajero.ToList());
        }

        // GET: CuadreCajaPorCajeroes/Details/5
      
        // GET: CuadreCajaPorCajeroes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CuadreCajaPorCajero cuadreCajaPorCajero = db.CuadreCajaPorCajero.Find(id);
			if (cuadreCajaPorCajero == null)
			{
				return HttpNotFound();
			}
			else
			{
				Session["cajero"] = cuadreCajaPorCajero.nit_cajero;
				Session["cod_caja"] = cuadreCajaPorCajero.codigo_caja;
				Session["ret_efect"] = cuadreCajaPorCajero.retiros_cheque;
				Session["ret_cheque"] = cuadreCajaPorCajero.retiros_cheque;
				Session["cons_efect"] = cuadreCajaPorCajero.consignacion_efectivo;
				Session["cons_cheque"] = cuadreCajaPorCajero.consignacion_cheque;
				Session["tope"] = cuadreCajaPorCajero.tope;
				configCajero configcajero = db.configCajero.Find(Session["cajero"]);
				Session["cta_efectivo"] = configcajero.Cta_efectivo;
				Session["cta_cheque"] = configcajero.Cta_cheque;
				Session["contrapartida_banco"] = configcajero.Contr_banco;
				Session["contrapartida_otro"] = configcajero.Contr_otro;
				Session["centrocosto"] = configcajero.centrocosto;
				Session["CentroCostoCaja"] = configcajero.CentroCostoCaja;
				Session["comprobante_cierre"] = configcajero.Tipocomprobante_caja;
				
				TiposComprobantes tiposComprobantes = db.TiposComprobantes.Find(Session["comprobante_cierre"]);
				Session["consecutivo"] =tiposComprobantes.CONSECUTIVO;
				return View(cuadreCajaPorCajero);


			}
            
        }

        // POST: CuadreCajaPorCajeroes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
			CuadreCajaPorCajero cuadreCajaPorCajero = db.CuadreCajaPorCajero.Find(id);
			int cierrecons =  Convert.ToInt32(cuadreCajaPorCajero.cierre);
			if (cierrecons == 0)
			{
								
				Session["fallo"] = "si";
				string ano = Convert.ToString(DateTime.Now.Year);
				string mes = Convert.ToString(DateTime.Now.Month);
				string dia = Convert.ToString(DateTime.Now.Day);
				string fechacierre = Convert.ToString(DateTime.Now);
				var cierre = "UPDATE dbo.CuadreCajaPorCajero SET cierre=1,horacierre='" + fechacierre + "' WHERE id=" + id + "";
				db.Database.ExecuteSqlCommand(cierre);
				double tope = Convert.ToDouble(Session["tope"]);
				var plancuentas = "UPDATE acc.PlanCuentas SET Saldo=Saldo+"+tope+"WHERE CODIGO='"+Session["contrapartida_otro"]+"'";
				db.Database.ExecuteSqlCommand(plancuentas);
				//Generar comprobante para cierre de caja.
				var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('"+Session["comprobante_cierre"]+"',"+Session["consecutivo"]+",'"+ano+"','"+mes+"','"+dia+"','"+Session["CentroCostoCaja"]+"',NULL,'Cierre Caja','"+Session["cajero"]+"',NULL,'"+Session["contrapartida_otro"]+"',NULL,"+tope+",0,'"+fechacierre+ "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
				db.Database.ExecuteSqlCommand(Comprobante);
				//MOVIMIENTOS 
				var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('"+Session["comprobante_cierre"]+"',"+Session["consecutivo"]+",'"+Session["cta_efectivo"]+"','"+Session["cajero"]+"','CAJEROS',0,"+tope+",0,'"+Session["CentroCostoCaja"]+"','"+fechacierre+"',NULL)";
				db.Database.ExecuteSqlCommand(movimieno1);
				var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('"+Session["comprobante_cierre"]+"',"+Session["consecutivo"]+",'"+Session["contrapartida_otro"]+"','"+Session["cajero"]+"','CAJA GENERAL',"+tope+ ",0,0,'"+Session["CentroCostoCaja"]+"','"+fechacierre+"',NULL)";
				db.Database.ExecuteSqlCommand(movimieno2);
				//SaldosCCS
				var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["cta_efectivo"]+"','"+Session["cajero"]+"','"+Session["CentroCostoCaja"]+"','"+ano+"','"+mes+"',0,"+tope+","+tope+")";
				db.Database.ExecuteSqlCommand(saldosCCS);
				var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["contrapartida_otro"]+"','"+Session["cajero"]+"','"+Session["CentroCostoCaja"]+"','"+ano+"','"+mes+"',"+tope+",0,"+tope+")";
				db.Database.ExecuteSqlCommand(saldosCCS1);
				//saldoscuentas
				var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["cta_efectivo"]+"','"+ano+"','"+mes+"',0,"+tope+","+tope+")";
				db.Database.ExecuteSqlCommand(saldoscuentas);
				var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["contrapartida_otro"]+"','"+ano+"','"+mes+"',"+tope+",0,"+tope+")";
				db.Database.ExecuteSqlCommand(saldoscuentas1);
				//sadosterceros
				var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["cta_efectivo"]+"','"+Session["cajero"]+"','"+ano+"','"+mes+"',0,"+tope+","+tope+")";
				db.Database.ExecuteSqlCommand(saldosterceros);
				var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('"+Session["contrapartida_otro"]+"','"+Session["cajero"]+"','"+ano+"','"+mes+"',"+tope+",0,"+tope+")";
				db.Database.ExecuteSqlCommand(saldosterceros1);
				//actulizamos consecutivo
				string codcaja = Convert.ToString(Session["cod_caja"]);
				var cajaencero = "UPDATE dbo.Caja SET TopeMaximo_caja=0 WHERE Codigo_caja='" + codcaja + "'";
				db.Database.ExecuteSqlCommand(cajaencero);
				Session["cons"] = Convert.ToInt32(Session["consecutivo"]) + 1;
				var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO='"+ Session["cons"] + "' WHERE CODIGO='" + Session["comprobante_cierre"] + "'";
				db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);
				return RedirectToAction("Index");
			}
			else
			{
				Session["fallo"] = "no";
			}
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
