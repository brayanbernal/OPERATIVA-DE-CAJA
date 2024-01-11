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
    public class FactOpcajasController : Controller
    {
        private FNSOFTEntities db = new FNSOFTEntities();


		////////************** SECCION DE VARIABLES PARA CREACION DE COMPROBANTES
		public string Comprobante;
		public string Comprobante1;
		public string movimieno1;
		public string movimieno2;
		public string movimieno3;
		public string movimieno4;
		public string saldosCCS;
		public string saldosCCS1;
		public string saldosCCS2;
		public string saldosCCS3;
		public string saldoscuentas;
		public string saldoscuentas1;
		public string saldoscuentas2;
		public string saldoscuentas3;
		public string saldosterceros;
		public string saldosterceros1;
		public string saldosterceros2;
		public string saldosterceros3;
		public string updateconsecutivoTiposComprobantes;
		//////////////////----FIN-----------///////////////////////////////


		/////////////////////////// METODOS CREACION DE COMPROBANTES//////////
		///*********CONSIGNACION EFECTIVO
		public void efectivoCons(int consecutivo, string ano, string dia, string mes, string nit_propietario, string fpago, decimal valor_efectivo, string fechaOp, string comp_ingreso, string cc_transacciones, string bandera, string cta_efectivo)
		{
			//Generar comprobante.
			Comprobante = "INSERT INTO acc.Comprobantes (TIPO,NUMERO,ANO,MES,DIA,CCOSTO ,ELIMINADO ,DETALLE,TERCERO,FPAGO,CTAFPAGO,NUMEXTERNO,VRTOTAL,SUMDBCR,FECHARealiz,MODIFICA,EXPORTADO,MARCASEG,BLOQUEADO,NUMIMP,PC,USUARIO,ANULADO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + ano + "','" + mes + "','" + dia + "','" + cc_transacciones + "',NULL,'CONSIGNACION DESDE CAJA','" + nit_propietario + "', NULL,'" + fpago + "',NULL," + valor_efectivo + ",0, '" + fechaOp + "',NULL, NULL, NULL, NULL,NULL, NULL, NULL,'false')";
			db.Database.ExecuteSqlCommand(Comprobante);
			//MOVIMIENTOS 
			movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + fpago + "','" + nit_propietario + "','" + bandera + "',0," + valor_efectivo + ",0,'" + cc_transacciones + "','" + fechaOp + "',NULL)";
			db.Database.ExecuteSqlCommand(movimieno1);
			movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + cta_efectivo + "','" + nit_propietario + "','" + bandera + "'," + valor_efectivo + ",0,0,'" + cc_transacciones + "','" + fechaOp + "',NULL)";
			db.Database.ExecuteSqlCommand(movimieno2);
			//SaldosCCS
			saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + nit_propietario + "','" + cc_transacciones + "','" + ano + "','" + mes + "',0," + valor_efectivo + "," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldosCCS);
			saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_efectivo + "','" + nit_propietario + "','" + cc_transacciones + "','" + ano + "','" + mes + "'," + valor_efectivo + ",0," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldosCCS1);
			//saldoscuentas
			saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + valor_efectivo + "," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldoscuentas);
			saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_efectivo + "','" + ano + "','" + mes + "'," + valor_efectivo + ",0," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldoscuentas1);
			//sadosterceros
			saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + nit_propietario + "','" + ano + "','" + mes + "',0," + valor_efectivo + "," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldosterceros);
			saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_efectivo + "','" + nit_propietario + "','" + ano + "','" + mes + "'," + valor_efectivo + ",0," + valor_efectivo + ")";
			db.Database.ExecuteSqlCommand(saldosterceros1);

		}
		///*********CONSIGNACION CHEQUE

		public void chequescons(int consecutivo, string ano, string dia, string mes, string nit_propietario_cuenta, string fpago, decimal valor_cheque, string fechaOp, string comp_ingreso, string cc_transacciones, string bandera, string cta_cheques)
		{
			//****************** operaciones cheque*******************

			//Generar comprobante.
			Comprobante1 = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + ano + "','" + mes + "','" + dia + "','" + cc_transacciones + "',NULL,'CONSIGNACION CHEQUE CAJA','" + nit_propietario_cuenta + "',NULL,'" + fpago + "',NULL," + valor_cheque + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
			db.Database.ExecuteSqlCommand(Comprobante1);
			//MOVIMIENTOS 
			movimieno3 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + fpago + "','" + nit_propietario_cuenta + "','" + bandera + "',0," + valor_cheque + ",0,'" + cc_transacciones + "','" + fechaOp + "',NULL)";
			db.Database.ExecuteSqlCommand(movimieno3);
			movimieno4 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + comp_ingreso + "'," + consecutivo + ",'" + cta_cheques + "','" + nit_propietario_cuenta + "','" + bandera + "'," + valor_cheque + ",0,0,'" + cc_transacciones + "','" + fechaOp + "',NULL)";
			db.Database.ExecuteSqlCommand(movimieno4);
			//SaldosCCS
			saldosCCS2 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + nit_propietario_cuenta + "','" + cc_transacciones + "','" + ano + "','" + mes + "',0," + valor_cheque + "," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldosCCS2);
			saldosCCS3 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_cheques + "','" + nit_propietario_cuenta + "','" + cc_transacciones + "','" + ano + "','" + mes + "'," + valor_cheque + ",0," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldosCCS3);
			//saldoscuentas
			saldoscuentas2 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + valor_cheque + "," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldoscuentas2);
			saldoscuentas3 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_cheques + "','" + ano + "','" + mes + "'," + valor_cheque + ",0," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldoscuentas3);
			//sadosterceros
			saldosterceros2 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + valor_cheque + "," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldosterceros2);
			saldosterceros3 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + cta_cheques + "','" + nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + valor_cheque + ",0," + valor_cheque + ")";
			db.Database.ExecuteSqlCommand(saldosterceros3);


		}


		// GET: FactOpcajas
		public ActionResult Index()
        {
			var factOpcaja = db.FactOpcaja.Include(f => f.Caja).Include(f => f.CodigosBanco).Include(f => f.CodigosBanco1).Include(f => f.CodigosBanco2).Include(f => f.CodigosBanco3).Include(f => f.CodigosBanco4).Include(f => f.CodigosBanco5).Include(f => f.configCajero).Include(f => f.Terceros);
			if (Session["nit"] != null)// para evitar Visualizacion de los registros de las facturas sin haberse registrado al cajero 
			{
				return View(factOpcaja.ToList());
			}
			else
			{
				return RedirectToAction("Logopcaja");
			}
		}

		public ActionResult Cuentas()
		{
			var cuentasAhorro = db.FichasAhorros.Where(f => f.tipoPago == "Caja");
			return View(cuentasAhorro.ToList());

		}
		public ActionResult CuentaAportes()
		{
			var cuentasAporte = db.FichasAportes.Where(f => f.tipoPago == "Caja");
			return View(cuentasAporte.ToList());
		}


		// GET: FactOpcajas/Details/5
		public ActionResult Details(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
			if (factOpcaja == null)
			{
				return HttpNotFound();
			}
			return View(factOpcaja);
		}
		public ActionResult DetailsRet(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
			if (factOpcaja == null)
			{
				return HttpNotFound();
			}
			return View(factOpcaja);
		}


		public ActionResult DetailsRetCheque(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
			if (factOpcaja == null)
			{
				return HttpNotFound();
			}
			return View(factOpcaja);
		}


		public ActionResult seleccionCuentaAhorro(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			FichasAhorros fichasAhorros = db.FichasAhorros.Find(id);
			if (fichasAhorros == null)
			{
				return HttpNotFound();
			}
			else
			{
				Session["Seleccionada"] = fichasAhorros.numeroCuenta;
				return RedirectToAction("CuentaOperacion");
			}
			//return View(fichasAhorros);
		}

		public ActionResult seleccionCuentaAportes(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			FichasAportes fichasAportes = db.FichasAportes.Find(id);
			if (fichasAportes == null)
			{
				return HttpNotFound();
			}
			else
			{
				Session["Seleccionada"] = fichasAportes.NumeroCuenta;
				return RedirectToAction("CuentaOperacion");
			}
			//return View(fichasAhorros);
		}




		public ActionResult Logopcaja()
		{
			var fech = DateTime.Now.Date;
			Session["fecha"] = fech.ToShortDateString();
			Session["nit"] = null;


			return View();
		}
		// POST: FactOpcajas/Create
		[HttpPost]
		public ActionResult Logopcaja(string nit, string fecha1)
		{
			if (nit == null)
			{
				//return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			configCajero configCajero = db.configCajero.Find(nit); //consultamos cajero registrado
			if (configCajero == null)
			{
				ViewBag.mensaje = "Nit no encontrado ";
				//return HttpNotFound();
			}
			else
			{
				//Valores de configuracion Cajero
				Session["nit"] = configCajero.Nit_cajero;
				Session["cod_caja"] = configCajero.Codigo_caja;
				Session["cta_cheques"] = configCajero.Cta_cheque;
				Session["cta_efectivo"] = configCajero.Cta_efectivo;
				Session["comp_ingreso"] = configCajero.Compr_ingreso;
				Session["comp_egreso"] = configCajero.Compr_egreso;
				Session["cc_transacciones"] = configCajero.centrocosto;


				Caja caja = db.Caja.Find(Session["cod_caja"]);//consultamos la Caja a la cual pertenece el cajero 
				if (caja == null)
				{
					return HttpNotFound();
				}
				else
				{
					//datos de Caja
					Session["nombre_caja"] = caja.Nombre_caja;
					Session["actual"] = caja.consecutivo_actual;
					Session["tope_maximo"] = caja.TopeMaximo_caja;
					Session["con_fin"] = caja.consecutivo_fin;
					Session["con_ini"] = caja.Consecutivo_ini;
					Session["serie"] = caja.Serie;
					Session["agencia"] = caja.agencia;

					Terceros terceros = db.Terceros.Find(Session["nit"]);// identificamos el nombre del cajero
					if (terceros == null)
					{
						return HttpNotFound();
					}
					else
					{



						int idcuadre = db.Database.SqlQuery<int>("SELECT id FROM dbo.CuadreCajaPorCajero WHERE fecha='" + fecha1 + "' AND codigo_caja='" + Session["cod_caja"] + "'and nit_cajero='" + Session["nit"] + "'AND cierre=0").FirstOrDefault();
						Session["IDcuadre"] = idcuadre;

						CuadreCajaPorCajero CuadreCajaPorCajero = db.CuadreCajaPorCajero.Find(Session["IDcuadre"]);//  buscamos el Id de cuadre parcial de caja 
						if (CuadreCajaPorCajero == null)
						{

							//creamos el registro en la tabla cuadre parcial de caja con la fecha y el codigo de caja para evitar repetidos
							var insertcuadre1 = "INSERT INTO dbo.CuadreCajaPorCajero (fecha, codigo_caja, nit_cajero, retiros_efectivo, retiros_cheque, consignacion_efectivo, consignacion_cheque, cierre,horacierre,tope)" +
												"VALUES('" + fecha1 + "','" + Session["cod_caja"] + "','" + Session["nit"] + "',0,0,0,0,0,''," + Session["tope_maximo"] + ")";
							db.Database.ExecuteSqlCommand(insertcuadre1);
							// para cuader parcial de caja

							Session["nombre"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;

							ViewBag.nombre = Session["nombre"];

							return RedirectToAction("CuentaOperacion");
						}
						else
						{
							// se extrae los valores de cuadre parciade caja

							Session["nombre"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;

							ViewBag.nombre = Session["nombre"];
							return RedirectToAction("CuentaOperacion");
						}
					}
				}
			}
			return View();
		}




		// metodos cuenta operacion son para encontrar las cuentas de quien desea hacer el retiro o consignacion 
		public ActionResult CuentaOperacion()
		{

			var fech = DateTime.Now.Date;
			Session["fecha"] = fech.ToShortDateString();
			if (Session["nit"] != null && Session["IDcuadre"]!=null)// para evitar Visualizacion de los registros de las facturas sin haberse registrado al cajero 
			{
				Caja caja = db.Caja.Find(Session["cod_caja"]);

				Session["actual"] = caja.consecutivo_actual;
				Session["Serie"] = caja.Serie;
				Session["agencia"] = caja.agencia;
				Session["tope_maximo"] = caja.TopeMaximo_caja;
				Session["Factura"] = Session["agencia"] + "-" + Session["cod_caja"] + "-" + Session["Serie"] + "-" + Session["actual"];
				Session["CUENTA"] = null;

				int idcuadre = db.Database.SqlQuery<int>("SELECT id FROM dbo.CuadreCajaPorCajero WHERE fecha='" + Session["fecha"] + "' AND codigo_caja='" + Session["cod_caja"] + "'and nit_cajero='" + Session["nit"] + "'AND cierre=0").FirstOrDefault();
				Session["IDcuadre"] = idcuadre;
				CuadreCajaPorCajero CuadreCajaPorCajero = db.CuadreCajaPorCajero.Find(Session["IDcuadre"]);//  buscamos el Id de cuadre parcial de caja 

				Session["retiros_efectivo"] = CuadreCajaPorCajero.retiros_efectivo;
				Session["retiros_cheque"] = CuadreCajaPorCajero.retiros_cheque;
				Session["consignacion_efectivo"] = CuadreCajaPorCajero.consignacion_efectivo;
				Session["consignacion_cheque"] = CuadreCajaPorCajero.consignacion_cheque;
				Session["tope"] = CuadreCajaPorCajero.tope;

				return View(CuadreCajaPorCajero);
			}
			else
			{
				return RedirectToAction("Logopcaja");
			}
		}
		[HttpPost]
		public ActionResult CuentaOperacion(string cuenta, string operacion)
		{


			if (operacion == "Ret") //condicion cuando hace retiros
			{
				Session["op"] = "Ret";
				Session["op1"] = "Retiro Efectivo";
				Session["CUENTA"] = cuenta;

				int idAhorros = db.Database.SqlQuery<int>("SELECT id FROM aho.FichasAhorros WHERE numeroCuenta='" + Session["CUENTA"] + "' AND tipoPago='Caja'").FirstOrDefault();
				Session["IdAhorro"] = idAhorros;
				FichasAhorros fichasAhorros = db.FichasAhorros.Find(Session["IdAhorro"]);// encontramos la cuenta
				if (fichasAhorros == null)
				{
					ViewBag.mensaje = "No se encontro la Cuenta ";

				}
				else
				{
					Session["nit_cuenta"] = fichasAhorros.idPersona;

					Terceros terceros = db.Terceros.Find(Session["nit_cuenta"]);
					Session["cuenta"] = fichasAhorros.numeroCuenta;
					Session["Tipo_pago"] = fichasAhorros.tipoPago;
					Session["saldo_cuenta"] = fichasAhorros.totalAhorros;
					Session["valor_cuota"] = fichasAhorros.valorCuota;
					Session["nombre_cuenta"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;

					int Saldo_cuenta;
					int Valor_cuota;
					Valor_cuota = Convert.ToInt32(Session["valor_cuota"]);
					Saldo_cuenta = Convert.ToInt32(Session["saldo_cuenta"]);

					if (Saldo_cuenta < Valor_cuota)
					{
						ViewBag.mensaje = "Fondos Insuficientes para realizar retiros";
						return View();
					}
					else
					{
						return RedirectToAction("CreateRet");
					}
				}
			}
			else
			{
				if (operacion == "Cons")
				{

					//opcion consignacion
					Session["op"] = "Cons";
					Session["op1"] = "Consignación";
					int idAhorros = db.Database.SqlQuery<int>("SELECT id FROM aho.FichasAhorros WHERE numeroCuenta='" + cuenta + "' AND tipoPago='Caja'").FirstOrDefault();
					Session["IdAhorro"] = idAhorros;

					FichasAhorros fichasAhorros = db.FichasAhorros.Find(Session["IdAhorro"]);
					if (fichasAhorros == null)
					{
						int idAportes = db.Database.SqlQuery<int>("SELECT id FROM apo.FichasAportes WHERE NumeroCuenta='" + cuenta + "' AND tipoPago='Caja'").FirstOrDefault();
						Session["IdAportes"] = idAportes;
						FichasAportes fichasAportes = db.FichasAportes.Find(Session["IdAportes"]);
						if (fichasAportes == null)
						{
							ViewBag.mensaje = "No se encontro Cuenta Registrada ";
						}
						else
						{
							Session["nit_cuenta"] = fichasAportes.idPersona;

							Terceros terceros = db.Terceros.Find(Session["nit_cuenta"]); //Para Extrare el Nombre desde Terceros
							Session["cuenta"] = fichasAportes.NumeroCuenta;
							Session["Tipo_pago"] = fichasAportes.tipoPago;
							Session["saldo_cuenta"] = fichasAportes.totalAportes;
							Session["nombre_cuenta"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;
							Session["bandera"] = "aporte";
							return RedirectToAction("CreateCons");
						}
					}
					else
					{

						Session["nit_cuenta"] = fichasAhorros.idPersona;
						Terceros terceros = db.Terceros.Find(Session["nit_cuenta"]);

						Session["cuenta"] = fichasAhorros.numeroCuenta;
						Session["Tipo_pago"] = fichasAhorros.tipoPago;
						Session["saldo_cuenta"] = fichasAhorros.totalAhorros;
						Session["nombre_cuenta"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;

						Session["bandera"] = "ahorro";
						return RedirectToAction("CreateCons");
					}

				}
				else
				{
					Session["op"] = "Ret_che";
					Session["op1"] = "Retiro Cheque";
					Session["CUENTA"] = cuenta;

					int idAhorros = db.Database.SqlQuery<int>("SELECT id FROM aho.FichasAhorros WHERE numeroCuenta='" + Session["CUENTA"] + "' AND tipoPago='Caja'").FirstOrDefault();
					Session["IdAhorro"] = idAhorros;

					FichasAhorros fichasAhorros = db.FichasAhorros.Find(Session["IdAhorro"]);// encontramos la cuenta
					if (fichasAhorros == null)
					{
						ViewBag.mensaje = "No se encontro la Cuenta ";
					}
					else
					{
						Session["nit_cuenta"] = fichasAhorros.idPersona;
						Terceros terceros = db.Terceros.Find(Session["nit_cuenta"]);

						Session["cuenta"] = fichasAhorros.numeroCuenta;
						Session["Tipo_pago"] = fichasAhorros.tipoPago;
						Session["saldo_cuenta"] = fichasAhorros.totalAhorros;
						Session["valor_cuota"] = fichasAhorros.valorCuota;
						Session["nombre_cuenta"] = terceros.NOMBRE1 + " " + terceros.NOMBRE2 + " " + terceros.APELLIDO1 + " " + terceros.APELLIDO2;

						int Saldo_cuenta;
						int Valor_cuota;
						Valor_cuota = Convert.ToInt32(Session["valor_cuota"]);
						Saldo_cuenta = Convert.ToInt32(Session["saldo_cuenta"]);

						if (Saldo_cuenta < Valor_cuota)
						{
							ViewBag.mensaje = "Fondos Insuficientes para realizar retiros";
							return View();
						}
						else
						{
							return RedirectToAction("CreateRetCheque");
						}
					}
				}
			}
			return View();
		}

		public ActionResult CreateRet()
		{
			if (Session["nit"] != null)// para evitar Visualizacion de los registros de las facturas sin haberse registrado al cajero 
			{
				Session["fechaHora"] = Convert.ToString(DateTime.Now);
				Session["Seleccionada"] = null;
				TiposComprobantes tiposComprobantes = db.TiposComprobantes.Find(Session["comp_egreso"]);
				Session["consecutivo"] = tiposComprobantes.CONSECUTIVO;
				return View();
			}
			else
			{
				return RedirectToAction("Logopcaja");
			}
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult CreateRet([Bind(Include = "id,fecha,factura,operacion,codigo_caja,nit_cajero,numero_cuenta,nit_propietario_cuenta,nombre_propietario_cuenta,valor_recibido,valor_efectivo,vueltas,valor_cheque,numero_cheque,consignacion,observacion,saldo_total_cuenta,total,nit_consignacion,valor_cheque1,numero_cheque1,nit_consignacion1,valor_cheque2,numero_cheque2,nit_consignacion2,valor_cheque3,numero_cheque3,nit_consignacion3,valor_cheque4,numero_cheque4,nit_consignacion4,valor_cheque5,numero_cheque5,nit_consignacion5,total_cheques")] FactOpcaja factOpcaja)
		{

			if(factOpcaja.valor_efectivo==null)
			{
				factOpcaja.valor_efectivo = 0;
			}

			if (factOpcaja.valor_efectivo == 0)
			{
				ViewBag.mensaje = "No se puede hacer retiro de 0 (cero) $ ";
			}
			else
			{

				decimal topemaximo = Convert.ToDecimal(Session["tope_maximo"]);

				if (topemaximo < factOpcaja.total)
				{
					ViewBag.mensaje = "Tope maximo de caja alcanzado. Abastecer caja y actualizar la pagina para continuar con el retiro.";
				}
				else
				{
					int Valor_cuota;
					Valor_cuota = Convert.ToInt32(Session["valor_cuota"]);

					if (factOpcaja.saldo_total_cuenta < Valor_cuota)
					{
						ModelState.AddModelError("saldo_total_cuenta", "sin fondos en la cuenta");
						ViewBag.mensaje = "Cuenta sinfondos Para Realizar Retiro";

					}
					else
					{

						if (ModelState.IsValid)
						{
							if (Session["actual"] == Session["con_fin"])
							{
								//modificamos consecutivo actual para incrementar de uno en uno  la factura
								var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=Consecutivo_ini, Serie=serie+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
								db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
							}
							else
							{
								var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=consecutivo_actual+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
								db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
							}

							//Actualizar el cuadre y tope de caja
							var updatecuadre = "UPDATE dbo.CuadreCajaPorCajero SET retiros_efectivo=retiros_efectivo+" + factOpcaja.total + ", tope=tope-" + factOpcaja.total + "WHERE fecha='" + Session["fecha"] + "'AND codigo_caja='" + factOpcaja.codigo_caja + "' AND nit_cajero='" + factOpcaja.nit_cajero + "' AND cierre=0";
							db.Database.ExecuteSqlCommand(updatecuadre);

							var updatetopecaja = "UPDATE dbo.Caja SET TopeMaximo_caja=TopeMaximo_caja-" + factOpcaja.total + "WHERE Codigo_caja='" + factOpcaja.codigo_caja + "'";
							db.Database.ExecuteSqlCommand(updatetopecaja);

							// actualizamos tabla Fichas de ahorro
							var udateAhorro = "UPDATE aho.FichasAhorros SET totalAhorros=totalAhorros-" + factOpcaja.total + " WHERE numeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";

							string ano = Convert.ToString(DateTime.Now.Year);
							string mes = Convert.ToString(DateTime.Now.Month);
							string dia = Convert.ToString(DateTime.Now.Day);
							string fechaOp = Convert.ToString(DateTime.Now);
							string fpagoRetiro = "213005001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas


							double tope = Convert.ToDouble(Session["tope"]);

							//Generar comprobante.
							var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'RETIRO DESDE CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpagoRetiro + "',NULL," + factOpcaja.total + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
							db.Database.ExecuteSqlCommand(Comprobante);
							//MOVIMIENTOS 
							var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','AHORROS',0," + factOpcaja.total + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
							db.Database.ExecuteSqlCommand(movimieno1);
							var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','AHORROS'," + factOpcaja.total + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
							db.Database.ExecuteSqlCommand(movimieno2);
							//SaldosCCS
							var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldosCCS);
							var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldosCCS1);
							//saldoscuentas
							var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldoscuentas);
							var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldoscuentas1);
							//sadosterceros
							var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldosterceros);
							var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
							db.Database.ExecuteSqlCommand(saldosterceros1);
							//actulizamos consecutivo
							var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_egreso"] + "'";
							db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);

							db.Database.ExecuteSqlCommand(udateAhorro);
							db.FactOpcaja.Add(factOpcaja);
							db.SaveChanges();
							return RedirectToAction("DetailsRet/" + factOpcaja.id);
						}
					}
				}

			}




			return View(factOpcaja);

		}


		public ActionResult CreateRetCheque()
		{
			if (Session["nit"] != null)// para evitar Visualizacion de los registros de las facturas sin haberse registrado al cajero 
			{
				Session["fechaHora"] = Convert.ToString(DateTime.Now);
				Session["Seleccionada"] = null;
				TiposComprobantes tiposComprobantes = db.TiposComprobantes.Find(Session["comp_egreso"]);
				Session["consecutivo"] = tiposComprobantes.CONSECUTIVO;
				return View();
			}
			else
			{
				return RedirectToAction("Logopcaja");
			}
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult CreateRetCheque([Bind(Include = "id,fecha,factura,operacion,codigo_caja,nit_cajero,numero_cuenta,nit_propietario_cuenta,nombre_propietario_cuenta,valor_recibido,valor_efectivo,vueltas,valor_cheque,numero_cheque,consignacion,observacion,saldo_total_cuenta,total,nit_consignacion,valor_cheque1,numero_cheque1,nit_consignacion1,valor_cheque2,numero_cheque2,nit_consignacion2,valor_cheque3,numero_cheque3,nit_consignacion3,valor_cheque4,numero_cheque4,nit_consignacion4,valor_cheque5,numero_cheque5,nit_consignacion5,total_cheques")] FactOpcaja factOpcaja)
		{



			PlanCuentas planCuentas = db.PlanCuentas.Find(Session["cta_cheques"]);
			decimal saldo_cta_cheque = Convert.ToDecimal(planCuentas.Saldo);

			if (saldo_cta_cheque < factOpcaja.total)
			{
				ViewBag.mensaje = "No existe saldo en La cuenta Para realizar Retiros en cheque";
			}
			else
			{
				int Valor_cuota;
				Valor_cuota = Convert.ToInt32(Session["valor_cuota"]);
				if (factOpcaja.saldo_total_cuenta < Valor_cuota)
				{
					ModelState.AddModelError("saldo_total_cuenta", "sin fondos en la cuenta");
					ViewBag.mensaje = "Cuenta sinfondos Para Realizar Retiro";

				}
				else
				{

					if (ModelState.IsValid)
					{
						if (Session["actual"] == Session["con_fin"])
						{
							//modificamos consecutivo actual para incrementar de uno en uno  la factura
							var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=Consecutivo_ini, Serie=serie+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
							db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
						}
						else
						{
							var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=consecutivo_actual+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
							db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
						}

						// actualizamos tabla Fichas de ahorro
						var udateAhorro = "UPDATE aho.FichasAhorros SET totalAhorros=totalAhorros-" + factOpcaja.total + " WHERE numeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
						db.Database.ExecuteSqlCommand(udateAhorro);

						//Actualizar el cuadre 
						var updatecuadre = "UPDATE dbo.CuadreCajaPorCajero SET retiros_cheque=retiros_cheque+" + factOpcaja.total + "WHERE fecha='" + Session["fecha"] + "'AND codigo_caja='" + factOpcaja.codigo_caja + "' AND nit_cajero='" + factOpcaja.nit_cajero + "' AND cierre=0";
						db.Database.ExecuteSqlCommand(updatecuadre);

						//actualizamos plan cuentas para los retiros de cheque
						var plancuentas = "UPDATE acc.PlanCuentas SET Saldo=Saldo-" + factOpcaja.valor_cheque + "WHERE CODIGO='" + Session["cta_cheque"] + "'";
						db.Database.ExecuteSqlCommand(plancuentas);
						//***********************************************************************************

						string ano = Convert.ToString(DateTime.Now.Year);
						string mes = Convert.ToString(DateTime.Now.Month);
						string dia = Convert.ToString(DateTime.Now.Day);
						string fechaOp = Convert.ToString(DateTime.Now);
						string fpagoRetiro = "213005001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas

						//Generar comprobante.
						var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'RETIRO CHEQUE CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpagoRetiro + "',NULL," + factOpcaja.total + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
						db.Database.ExecuteSqlCommand(Comprobante);
						//MOVIMIENTOS 
						var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','AHORROS',0," + factOpcaja.total + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno1);
						var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_egreso"] + "'," + Session["consecutivo"] + ",'" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','AHORROS'," + factOpcaja.total + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno2);
						//SaldosCCS
						var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldosCCS);
						var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldosCCS1);
						//saldoscuentas
						var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas);
						var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas1);
						//sadosterceros
						var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.total + "," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldosterceros);
						var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpagoRetiro + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.total + ",0," + factOpcaja.total + ")";
						db.Database.ExecuteSqlCommand(saldosterceros1);
						//actulizamos consecutivo
						var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_egreso"] + "'";
						db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);



						db.FactOpcaja.Add(factOpcaja);
						db.SaveChanges();
						return RedirectToAction("DetailsRetCheque/" + factOpcaja.id);
					}
				}
			}
			return View(factOpcaja);

		}



		public ActionResult CreateCons()
		{
			if (Session["nit"] != null)// para evitar Visualizacion de los registros de las facturas sin haberse registrado al cajero 
			{
				Session["fechaHora"] = Convert.ToString(DateTime.Now);
				Session["Seleccionada"] = null;
				ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco");
				//TiposComprobantes tiposComprobantes = db.TiposComprobantes.Find(Session["comp_ingreso"]);
				//Session["consecutivo"] = tiposComprobantes.CONSECUTIVO;
				return View();
			}
			else
			{
				return RedirectToAction("Logopcaja");
			}


		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult CreateCons([Bind(Include = "id,fecha,factura,operacion,codigo_caja,nit_cajero,numero_cuenta,nit_propietario_cuenta,nombre_propietario_cuenta,valor_recibido,valor_efectivo,vueltas,valor_cheque,numero_cheque,consignacion,observacion,saldo_total_cuenta,total,nit_consignacion,valor_cheque1,numero_cheque1,nit_consignacion1,valor_cheque2,numero_cheque2,nit_consignacion2,valor_cheque3,numero_cheque3,nit_consignacion3,valor_cheque4,numero_cheque4,nit_consignacion4,valor_cheque5,numero_cheque5,nit_consignacion5,total_cheques")] FactOpcaja factOpcaja)
		{
			//por si la casilla en la consignacion queda en blanco se pone automatico el cero(0)
			if(factOpcaja.valor_cheque==null)
			{
				factOpcaja.valor_cheque = 0;
			}
			if (factOpcaja.valor_cheque1 == null)
			{
				factOpcaja.valor_cheque1 = 0;
			}
			if (factOpcaja.valor_cheque2 == null)
			{
				factOpcaja.valor_cheque2 = 0;
			}
			if (factOpcaja.valor_cheque3 == null)
			{
				factOpcaja.valor_cheque3 = 0;
			}
			if (factOpcaja.valor_cheque4 == null)
			{
				factOpcaja.valor_cheque4 = 0;
			}
			if (factOpcaja.valor_cheque5 == null)
			{
				factOpcaja.valor_cheque5 = 0;
			}


			string fpago = "";
			if (ModelState.IsValid)
			{
				if (factOpcaja.vueltas >= 0)
				{
					string ano = Convert.ToString(DateTime.Now.Year);
					string mes = Convert.ToString(DateTime.Now.Month);
					string dia = Convert.ToString(DateTime.Now.Day);
					string fechaOp = Convert.ToString(DateTime.Now);
					// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas


					if ((factOpcaja.valor_efectivo != 0 && factOpcaja.valor_efectivo != null) && (factOpcaja.total_cheques != 0 && factOpcaja.total_cheques != null))
					{
						//sI consecutivo actual es igual al final serie inclementa en uno
						if (Session["actual"] == Session["con_fin"])
						{
							var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=Consecutivo_ini, Serie=serie+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
							db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
						}
						else// si no es igual solo actualiza consecutivo de factura
						{
							var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=consecutivo_actual+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
							db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
						}


						String bandera = Convert.ToString(Session["bandera"]);// bandera para determina tipo de cuenta si es ahorro o aporte

						if (bandera == "ahorro")
						{
							var udateAhorro = "UPDATE aho.FichasAhorros SET totalAhorros=totalAhorros+" + factOpcaja.total + " WHERE numeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
							db.Database.ExecuteSqlCommand(udateAhorro);
							fpago = "213005001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
						}
						if (bandera == "aporte")
						{
							var updateAporte = "UPDATE apo.FichasAportes SET totalAportes=totalAportes+" + factOpcaja.total + " WHERE NumeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
							db.Database.ExecuteSqlCommand(updateAporte);
							fpago = "310505001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
						}
						//Actualizar el cuadre y tope de caja
						var updatecuadre = "UPDATE dbo.CuadreCajaPorCajero SET consignacion_efectivo=consignacion_efectivo+" + factOpcaja.valor_efectivo + ", consignacion_cheque=consignacion_cheque+" + factOpcaja.valor_cheque + ",tope=tope+" + factOpcaja.valor_efectivo + "WHERE fecha='" + Session["fecha"] + "'AND codigo_caja='" + factOpcaja.codigo_caja + "' AND nit_cajero='" + factOpcaja.nit_cajero + "' AND cierre=0";
						db.Database.ExecuteSqlCommand(updatecuadre);
						var updatetopecaja = "UPDATE dbo.Caja SET TopeMaximo_caja=TopeMaximo_caja+" + factOpcaja.valor_efectivo + "WHERE Codigo_caja='" + factOpcaja.codigo_caja + "'";
						db.Database.ExecuteSqlCommand(updatetopecaja);
						//Actualizamos plan cuentas para las consignaciones en cheque.
						var plancuentas = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.valor_cheque + "WHERE CODIGO='" + Session["cta_cheque"] + "'";
						db.Database.ExecuteSqlCommand(plancuentas);
						//****************** operaciones efectivo*****************
						//Generar comprobante.
						var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'CONSIGNACION CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpago + "',NULL," + factOpcaja.valor_efectivo + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
						db.Database.ExecuteSqlCommand(Comprobante);
						//MOVIMIENTOS 
						var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "',0," + factOpcaja.valor_efectivo + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno1);
						var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "'," + factOpcaja.valor_efectivo + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno2);
						//SaldosCCS
						var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldosCCS);
						var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldosCCS1);
						//saldoscuentas
						var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas);
						var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas1);
						//sadosterceros
						var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldosterceros);
						var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
						db.Database.ExecuteSqlCommand(saldosterceros1);
						//actulizamos consecutivo
						var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_ingreso"] + "'";
						db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);
						//********************************************************
						//****************** operaciones cheque*******************
						TiposComprobantes tiposComprobantes = db.TiposComprobantes.Find(Session["comp_ingreso"]);
						Session["consecutivo"] = tiposComprobantes.CONSECUTIVO;
						//Generar comprobante.
						var Comprobante1 = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'CONSIGNACION CHEQUE CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpago + "',NULL," + factOpcaja.valor_cheque + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
						db.Database.ExecuteSqlCommand(Comprobante1);
						//MOVIMIENTOS 
						var movimieno3 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "',0," + factOpcaja.valor_cheque + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno3);
						var movimieno4 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "'," + factOpcaja.valor_cheque + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
						db.Database.ExecuteSqlCommand(movimieno4);
						//SaldosCCS
						var saldosCCS2 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldosCCS2);
						var saldosCCS3 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldosCCS3);
						//saldoscuentas
						var saldoscuentas2 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas2);
						var saldoscuentas3 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldoscuentas3);
						//sadosterceros
						var saldosterceros2 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldosterceros2);
						var saldosterceros3 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
						db.Database.ExecuteSqlCommand(saldosterceros3);



						//********************************************************
						//actulizamos consecutivo
						var updateconsecutivoTiposComprobantes1 = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_ingreso"] + "'";
						db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes1);
						var plancuentassaldocheques = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.total + " WHERE CODIGO='" + fpago + "'";
						db.Database.ExecuteSqlCommand(plancuentassaldocheques);
						db.FactOpcaja.Add(factOpcaja);
						db.SaveChanges();
						return RedirectToAction("Details/" + factOpcaja.id);

					}
					else
					{

						if (factOpcaja.total_cheques != 0 && factOpcaja.total_cheques != null)
						{
							//sI consecutivo actual es igual al final serie inclementa en uno
							if (Session["actual"] == Session["con_fin"])
							{
								var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=Consecutivo_ini, Serie=serie+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
								db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
							}
							else// si no es igual solo actualiza consecutivo de factura
							{
								var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=consecutivo_actual+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
								db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
							}


							String bandera = Convert.ToString(Session["bandera"]);// bandera para determina tipo de cuenta si es ahorro o aporte

							if (bandera == "ahorro")
							{
								var udateAhorro = "UPDATE aho.FichasAhorros SET totalAhorros=totalAhorros+" + factOpcaja.total + " WHERE numeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
								db.Database.ExecuteSqlCommand(udateAhorro);
								fpago = "213005001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
							}
							if (bandera == "aporte")
							{
								var updateAporte = "UPDATE apo.FichasAportes SET totalAportes=totalAportes+" + factOpcaja.total + " WHERE NumeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
								db.Database.ExecuteSqlCommand(updateAporte);
								fpago = "310505001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
							}
							//Actualizar el cuadre y tope de caja
							var updatecuadre = "UPDATE dbo.CuadreCajaPorCajero SET consignacion_efectivo=consignacion_efectivo+" + factOpcaja.valor_efectivo + ", consignacion_cheque=consignacion_cheque+" + factOpcaja.valor_cheque + ",tope=tope+" + factOpcaja.valor_efectivo + "WHERE fecha='" + Session["fecha"] + "'AND codigo_caja='" + factOpcaja.codigo_caja + "' AND nit_cajero='" + factOpcaja.nit_cajero + "' AND cierre=0";
							db.Database.ExecuteSqlCommand(updatecuadre);
							var updatetopecaja = "UPDATE dbo.Caja SET TopeMaximo_caja=TopeMaximo_caja+" + factOpcaja.valor_efectivo + "WHERE Codigo_caja='" + factOpcaja.codigo_caja + "'";
							db.Database.ExecuteSqlCommand(updatetopecaja);
							//Actualizamos plan cuentas para las consignaciones en cheque.
							var plancuentas = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.valor_cheque + "WHERE CODIGO='" + Session["cta_cheque"] + "'";
							db.Database.ExecuteSqlCommand(plancuentas);

							//Generar comprobante.
							var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'CONSIGNACION CHEQUE CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpago + "',NULL," + factOpcaja.valor_cheque + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
							db.Database.ExecuteSqlCommand(Comprobante);
							//MOVIMIENTOS 
							var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "',0," + factOpcaja.valor_cheque + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
							db.Database.ExecuteSqlCommand(movimieno1);
							var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "'," + factOpcaja.valor_cheque + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
							db.Database.ExecuteSqlCommand(movimieno2);
							//SaldosCCS
							var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldosCCS);
							var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldosCCS1);
							//saldoscuentas
							var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldoscuentas);
							var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldoscuentas1);
							//sadosterceros
							var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_cheque + "," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldosterceros);
							var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_cheques"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.valor_cheque + ",0," + factOpcaja.valor_cheque + ")";
							db.Database.ExecuteSqlCommand(saldosterceros1);
							//actulizamos consecutivo
							var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_ingreso"] + "'";
							var plancuentassaldocheques = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.total + " WHERE CODIGO='" + fpago + "'";
							db.Database.ExecuteSqlCommand(plancuentassaldocheques);
							db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);
							db.FactOpcaja.Add(factOpcaja);
							db.SaveChanges();
							return RedirectToAction("Details/" + factOpcaja.id);
						}
						else
						{
							if (factOpcaja.valor_efectivo != 0 && factOpcaja.valor_efectivo != null)
							{

								//sI consecutivo actual es igual al final serie inclementa en uno
								if (Session["actual"] == Session["con_fin"])
								{
									var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=Consecutivo_ini, Serie=serie+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
									db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
								}
								else// si no es igual solo actualiza consecutivo de factura
								{
									var updatecajaConsecutivo = "UPDATE dbo.Caja SET consecutivo_actual=consecutivo_actual+1 WHERE Codigo_caja='" + Session["cod_caja"] + "'";
									db.Database.ExecuteSqlCommand(updatecajaConsecutivo);
								}


								String bandera = Convert.ToString(Session["bandera"]);// bandera para determina tipo de cuenta si es ahorro o aporte

								if (bandera == "ahorro")
								{
									var udateAhorro = "UPDATE aho.FichasAhorros SET totalAhorros=totalAhorros+" + factOpcaja.total + " WHERE numeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
									db.Database.ExecuteSqlCommand(udateAhorro);
									fpago = "213005001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
								}
								if (bandera == "aporte")
								{
									var updateAporte = "UPDATE apo.FichasAportes SET totalAportes=totalAportes+" + factOpcaja.total + " WHERE NumeroCuenta='" + factOpcaja.numero_cuenta + "' AND tipoPago='Caja'";
									db.Database.ExecuteSqlCommand(updateAporte);
									fpago = "310505001";// es la cuenta que se define para realizar los retirosesta cuentasaleporparte de plancuentas
								}
								//Actualizar el cuadre y tope de caja
								var updatecuadre = "UPDATE dbo.CuadreCajaPorCajero SET consignacion_efectivo=consignacion_efectivo+" + factOpcaja.valor_efectivo + ", consignacion_cheque=consignacion_cheque+" + factOpcaja.valor_cheque + ",tope=tope+" + factOpcaja.valor_efectivo + "WHERE fecha='" + Session["fecha"] + "'AND codigo_caja='" + factOpcaja.codigo_caja + "' AND nit_cajero='" + factOpcaja.nit_cajero + "' AND cierre=0";
								db.Database.ExecuteSqlCommand(updatecuadre);
								var updatetopecaja = "UPDATE dbo.Caja SET TopeMaximo_caja=TopeMaximo_caja+" + factOpcaja.valor_efectivo + "WHERE Codigo_caja='" + factOpcaja.codigo_caja + "'";
								db.Database.ExecuteSqlCommand(updatetopecaja);
								//Actualizamos plan cuentas para las consignaciones en cheque.
								var plancuentas = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.valor_cheque + "WHERE CODIGO='" + Session["cta_cheque"] + "'";
								db.Database.ExecuteSqlCommand(plancuentas);

								//Generar comprobante.
								var Comprobante = "INSERT INTO acc.Comprobantes (TIPO, NUMERO, ANO, MES, DIA, CCOSTO, ELIMINADO, DETALLE, TERCERO, FPAGO, CTAFPAGO, NUMEXTERNO, VRTOTAL, SUMDBCR, FECHARealiz, MODIFICA, EXPORTADO, MARCASEG, BLOQUEADO, NUMIMP, PC,USUARIO,ANULADO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + ano + "','" + mes + "','" + dia + "','" + Session["cc_transacciones"] + "',NULL,'CONSIGNACION CAJA','" + factOpcaja.nit_propietario_cuenta + "',NULL,'" + fpago + "',NULL," + factOpcaja.valor_efectivo + ",0,'" + fechaOp + "',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'False')";
								db.Database.ExecuteSqlCommand(Comprobante);
								//MOVIMIENTOS 
								var movimieno1 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "',0," + factOpcaja.valor_efectivo + ",0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
								db.Database.ExecuteSqlCommand(movimieno1);
								var movimieno2 = "INSERT INTO acc.Movimientos (TIPO, NUMERO, CUENTA, TERCERO, DETALLE, DEBITO, CREDITO, BASE, CCOSTO, FECHAMOVIMIENTO, DOCUMENTO)VALUES('" + Session["comp_ingreso"] + "'," + Session["consecutivo"] + ",'" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["bandera"] + "'," + factOpcaja.valor_efectivo + ",0,0,'" + Session["cc_transacciones"] + "','" + fechaOp + "',NULL)";
								db.Database.ExecuteSqlCommand(movimieno2);
								//SaldosCCS
								var saldosCCS = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldosCCS);
								var saldosCCS1 = "INSERT INTO acc.SaldosCCs (CUENTA, TERCERO, CCOSTO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + Session["cc_transacciones"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldosCCS1);
								//saldoscuentas
								var saldoscuentas = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldoscuentas);
								var saldoscuentas1 = "INSERT INTO acc.SaldosCuentas (CODIGO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldoscuentas1);
								//sadosterceros
								var saldosterceros = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + fpago + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "',0," + factOpcaja.valor_efectivo + "," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldosterceros);
								var saldosterceros1 = "INSERT INTO acc.SaldosTerceros (CODIGO, TERCERO, ANO, MES, MDEBITO, MCREDITO, SALDO) VALUES('" + Session["cta_efectivo"] + "','" + factOpcaja.nit_propietario_cuenta + "','" + ano + "','" + mes + "'," + factOpcaja.valor_efectivo + ",0," + factOpcaja.valor_efectivo + ")";
								db.Database.ExecuteSqlCommand(saldosterceros1);
								//actulizamos consecutivo
								var updateconsecutivoTiposComprobantes = "UPDATE acc.TiposComprobantes SET CONSECUTIVO=CONSECUTIVO+1 WHERE CODIGO='" + Session["comp_ingreso"] + "'";
								db.Database.ExecuteSqlCommand(updateconsecutivoTiposComprobantes);
								var plancuentassaldocheques = "UPDATE acc.PlanCuentas SET Saldo=Saldo+" + factOpcaja.total + " WHERE CODIGO='" + fpago + "'";
								db.Database.ExecuteSqlCommand(plancuentassaldocheques);
								db.FactOpcaja.Add(factOpcaja);
								db.SaveChanges();
								return RedirectToAction("Details/" + factOpcaja.id);
							}
							else
							{
								ModelState.AddModelError("total", "No hay transacciones realizdas");
								ViewBag.err = "No esta relizando ninguna transaccion u operacion";
							
								ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion);
								ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion1);
								ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion2);
								ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion3);
								ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion4);
								ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion5);
								return View(factOpcaja);
							}
						}

					}
				}
				else
				{
					ViewBag.err = "Confirme Transaccion compruebe valor aportes";
					ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion);
					ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion1);
					ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion2);
					ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion3);
					ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion4);
					ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion5);
					return View(factOpcaja);
				}

			}

			ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion);
			ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion1);
			ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion2);
			ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion3);
			ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion4);
			ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion5);
			return View(factOpcaja);
		}

        // GET: FactOpcajas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
            if (factOpcaja == null)
            {
                return HttpNotFound();
            }
            ViewBag.codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja", factOpcaja.codigo_caja);
            ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion);
            ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion1);
            ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion2);
            ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion3);
            ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion4);
            ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion5);
            ViewBag.nit_cajero = new SelectList(db.configCajero, "Nit_cajero", "Codigo_caja", factOpcaja.nit_cajero);
            ViewBag.nit_cajero = new SelectList(db.Terceros, "NIT", "DIGVER", factOpcaja.nit_cajero);
            return View(factOpcaja);
        }

        // POST: FactOpcajas/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,fecha,factura,operacion,codigo_caja,nit_cajero,numero_cuenta,nit_propietario_cuenta,nombre_propietario_cuenta,valor_recibido,valor_efectivo,vueltas,valor_cheque,numero_cheque,consignacion,observacion,saldo_total_cuenta,total,nit_consignacion,valor_cheque1,numero_cheque1,nit_consignacion1,valor_cheque2,numero_cheque2,nit_consignacion2,valor_cheque3,numero_cheque3,nit_consignacion3,valor_cheque4,numero_cheque4,nit_consignacion4,valor_cheque5,numero_cheque5,nit_consignacion5,total_cheques")] FactOpcaja factOpcaja)
        {
            if (ModelState.IsValid)
            {
                db.Entry(factOpcaja).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.codigo_caja = new SelectList(db.Caja, "Codigo_caja", "Nombre_caja", factOpcaja.codigo_caja);
            ViewBag.nit_consignacion = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion);
            ViewBag.nit_consignacion1 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion1);
            ViewBag.nit_consignacion2 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion2);
            ViewBag.nit_consignacion3 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion3);
            ViewBag.nit_consignacion4 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion4);
            ViewBag.nit_consignacion5 = new SelectList(db.CodigosBanco, "codig_banco", "Banco", factOpcaja.nit_consignacion5);
            ViewBag.nit_cajero = new SelectList(db.configCajero, "Nit_cajero", "Codigo_caja", factOpcaja.nit_cajero);
            ViewBag.nit_cajero = new SelectList(db.Terceros, "NIT", "DIGVER", factOpcaja.nit_cajero);
            return View(factOpcaja);
        }

        // GET: FactOpcajas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
            if (factOpcaja == null)
            {
                return HttpNotFound();
            }
            return View(factOpcaja);
        }

        // POST: FactOpcajas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            FactOpcaja factOpcaja = db.FactOpcaja.Find(id);
            db.FactOpcaja.Remove(factOpcaja);
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
