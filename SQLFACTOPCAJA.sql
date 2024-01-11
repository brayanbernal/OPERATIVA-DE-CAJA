USE [FNSOFT]
GO

/****** Object:  Table [dbo].[Caja]    Script Date: 01/07/2019 9:11:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Caja](
	[Codigo_caja] [varchar](10) NOT NULL,
	[Nombre_caja] [varchar](100) NOT NULL,
	[Consecutivo_ini] [int] NOT NULL,
	[consecutivo_fin] [int] NOT NULL,
	[TopeMaximo_caja] [float] NOT NULL,
	[consecutivo_actual] [int] NULL,
	[Serie] [int] NULL,
	[agencia] [int] NULL,
	[cta_abastecimiento] [nvarchar](255) NULL,
 CONSTRAINT [PK_Caja] PRIMARY KEY CLUSTERED 
(
	[Codigo_caja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Caja]  WITH CHECK ADD  CONSTRAINT [FK_Caja_agencias] FOREIGN KEY([agencia])
REFERENCES [dbo].[agencias] ([codigoagencia])
GO

ALTER TABLE [dbo].[Caja] CHECK CONSTRAINT [FK_Caja_agencias]
GO

ALTER TABLE [dbo].[Caja]  WITH CHECK ADD  CONSTRAINT [FK_Caja_PlanCuentas] FOREIGN KEY([cta_abastecimiento])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[Caja] CHECK CONSTRAINT [FK_Caja_PlanCuentas]
GO


/****** Object:  Table [dbo].[CodigosBanco]    Script Date: 01/07/2019 9:12:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CodigosBanco](
	[codig_banco] [nvarchar](5) NOT NULL,
	[Banco] [nvarchar](200) NULL,
 CONSTRAINT [PK_CodigosBanco] PRIMARY KEY CLUSTERED 
(
	[codig_banco] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO




SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[configCajero](
	[Codigo_caja] [varchar](10) NOT NULL,
	[Nit_cajero] [nvarchar](20) NOT NULL,
	[Compr_ingreso] [nvarchar](255) NOT NULL,
	[Compr_egreso] [nvarchar](255) NOT NULL,
	[Contr_banco] [nvarchar](255) NOT NULL,
	[Contr_otro] [nvarchar](255) NOT NULL,
	[Cta_efectivo] [nvarchar](255) NOT NULL,
	[Cta_cheque] [nvarchar](255) NOT NULL,
	[centrocosto] [nvarchar](128) NULL,
	[CentroCostoCaja] [nvarchar](128) NULL,
	[Tipocomprobante_caja] [nvarchar](255) NULL,
 CONSTRAINT [PK_configCajero_1] PRIMARY KEY CLUSTERED 
(
	[Nit_cajero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_Caja] FOREIGN KEY([Codigo_caja])
REFERENCES [dbo].[Caja] ([Codigo_caja])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_Caja]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_CentrosCostos] FOREIGN KEY([centrocosto])
REFERENCES [acc].[CentrosCostos] ([Codigo])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_CentrosCostos]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_CentrosCostos1] FOREIGN KEY([CentroCostoCaja])
REFERENCES [acc].[CentrosCostos] ([Codigo])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_CentrosCostos1]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_PlanCuentas] FOREIGN KEY([Contr_banco])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_PlanCuentas]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_PlanCuentas1] FOREIGN KEY([Contr_otro])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_PlanCuentas1]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_PlanCuentas2] FOREIGN KEY([Cta_efectivo])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_PlanCuentas2]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_PlanCuentas3] FOREIGN KEY([Cta_cheque])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_PlanCuentas3]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_Terceros] FOREIGN KEY([Nit_cajero])
REFERENCES [ter].[Terceros] ([NIT])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_Terceros]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_TiposComprobantes] FOREIGN KEY([Compr_ingreso])
REFERENCES [acc].[TiposComprobantes] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_TiposComprobantes]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_TiposComprobantes1] FOREIGN KEY([Compr_egreso])
REFERENCES [acc].[TiposComprobantes] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_TiposComprobantes1]
GO

ALTER TABLE [dbo].[configCajero]  WITH CHECK ADD  CONSTRAINT [FK_configCajero_TiposComprobantes2] FOREIGN KEY([Tipocomprobante_caja])
REFERENCES [acc].[TiposComprobantes] ([CODIGO])
GO

ALTER TABLE [dbo].[configCajero] CHECK CONSTRAINT [FK_configCajero_TiposComprobantes2]
GO



/****** Object:  Table [dbo].[convenio]    Script Date: 01/07/2019 9:13:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[convenio](
	[codigo] [nvarchar](50) NOT NULL,
	[nombre_convenio] [nvarchar](255) NOT NULL,
	[cuenta] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_convenio] PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[convenio]  WITH CHECK ADD  CONSTRAINT [FK_convenio_PlanCuentas] FOREIGN KEY([cuenta])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[convenio] CHECK CONSTRAINT [FK_convenio_PlanCuentas]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CuadreCajaPorCajero](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NULL,
	[codigo_caja] [varchar](10) NULL,
	[nit_cajero] [nvarchar](20) NULL,
	[retiros_efectivo] [decimal](18, 2) NULL,
	[retiros_cheque] [decimal](18, 2) NULL,
	[consignacion_efectivo] [decimal](18, 2) NULL,
	[consignacion_cheque] [decimal](18, 2) NULL,
	[cierre] [int] NULL,
	[horacierre] [datetime] NULL,
	[tope] [decimal](18, 2) NULL,
 CONSTRAINT [PK_CuadreCajaPorCajero] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero]  WITH CHECK ADD  CONSTRAINT [FK_CuadreCajaPorCajero_Caja] FOREIGN KEY([codigo_caja])
REFERENCES [dbo].[Caja] ([Codigo_caja])
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero] CHECK CONSTRAINT [FK_CuadreCajaPorCajero_Caja]
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero]  WITH CHECK ADD  CONSTRAINT [FK_CuadreCajaPorCajero_configCajero] FOREIGN KEY([nit_cajero])
REFERENCES [dbo].[configCajero] ([Nit_cajero])
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero] CHECK CONSTRAINT [FK_CuadreCajaPorCajero_configCajero]
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero]  WITH CHECK ADD  CONSTRAINT [FK_CuadreCajaPorCajero_Terceros] FOREIGN KEY([nit_cajero])
REFERENCES [ter].[Terceros] ([NIT])
GO

ALTER TABLE [dbo].[CuadreCajaPorCajero] CHECK CONSTRAINT [FK_CuadreCajaPorCajero_Terceros]
GO



/****** Object:  Table [dbo].[FactOpcaja]    Script Date: 01/07/2019 9:15:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FactOpcaja](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NULL,
	[factura] [nvarchar](20) NULL,
	[operacion] [nvarchar](20) NULL,
	[codigo_caja] [varchar](10) NULL,
	[nit_cajero] [nvarchar](20) NULL,
	[numero_cuenta] [nvarchar](20) NULL,
	[nit_propietario_cuenta] [nvarchar](20) NULL,
	[nombre_propietario_cuenta] [nvarchar](200) NULL,
	[valor_recibido] [decimal](18, 0) NULL,
	[valor_efectivo] [decimal](18, 0) NULL,
	[vueltas] [decimal](18, 0) NULL,
	[valor_cheque] [decimal](18, 0) NULL,
	[numero_cheque] [nvarchar](20) NULL,
	[consignacion] [decimal](18, 0) NULL,
	[observacion] [nvarchar](300) NULL,
	[saldo_total_cuenta] [decimal](18, 0) NULL,
	[total] [decimal](18, 0) NULL,
	[nit_consignacion] [nvarchar](5) NULL,
	[valor_cheque1] [decimal](18, 0) NULL,
	[numero_cheque1] [nvarchar](20) NULL,
	[nit_consignacion1] [nvarchar](5) NULL,
	[valor_cheque2] [decimal](18, 0) NULL,
	[numero_cheque2] [nvarchar](20) NULL,
	[nit_consignacion2] [nvarchar](5) NULL,
	[valor_cheque3] [decimal](18, 0) NULL,
	[numero_cheque3] [nvarchar](20) NULL,
	[nit_consignacion3] [nvarchar](5) NULL,
	[valor_cheque4] [decimal](18, 0) NULL,
	[numero_cheque4] [nvarchar](20) NULL,
	[nit_consignacion4] [nvarchar](5) NULL,
	[valor_cheque5] [decimal](18, 0) NULL,
	[numero_cheque5] [nvarchar](20) NULL,
	[nit_consignacion5] [nvarchar](5) NULL,
	[total_cheques] [decimal](18, 2) NULL,
 CONSTRAINT [PK_FactOpcaja] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_Caja] FOREIGN KEY([codigo_caja])
REFERENCES [dbo].[Caja] ([Codigo_caja])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_Caja]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco] FOREIGN KEY([nit_consignacion])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco1] FOREIGN KEY([nit_consignacion1])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco1]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco2] FOREIGN KEY([nit_consignacion2])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco2]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco3] FOREIGN KEY([nit_consignacion3])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco3]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco4] FOREIGN KEY([nit_consignacion4])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco4]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_CodigosBanco5] FOREIGN KEY([nit_consignacion5])
REFERENCES [dbo].[CodigosBanco] ([codig_banco])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_CodigosBanco5]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_configCajero] FOREIGN KEY([nit_cajero])
REFERENCES [dbo].[configCajero] ([Nit_cajero])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_configCajero]
GO

ALTER TABLE [dbo].[FactOpcaja]  WITH CHECK ADD  CONSTRAINT [FK_FactOpcaja_Terceros] FOREIGN KEY([nit_cajero])
REFERENCES [ter].[Terceros] ([NIT])
GO

ALTER TABLE [dbo].[FactOpcaja] CHECK CONSTRAINT [FK_FactOpcaja_Terceros]
GO



/****** Object:  Table [dbo].[RegistroAbastecimientos]    Script Date: 01/07/2019 9:15:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RegistroAbastecimientos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NULL,
	[cod_caja] [varchar](10) NULL,
	[cta_abastecimiento] [nvarchar](255) NULL,
	[abastecimiento] [decimal](18, 2) NULL,
	[agencia] [int] NULL,
 CONSTRAINT [PK_RegistroAbastecimientos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RegistroAbastecimientos]  WITH CHECK ADD  CONSTRAINT [FK_RegistroAbastecimientos_agencias] FOREIGN KEY([agencia])
REFERENCES [dbo].[agencias] ([codigoagencia])
GO

ALTER TABLE [dbo].[RegistroAbastecimientos] CHECK CONSTRAINT [FK_RegistroAbastecimientos_agencias]
GO

ALTER TABLE [dbo].[RegistroAbastecimientos]  WITH CHECK ADD  CONSTRAINT [FK_RegistroAbastecimientos_Caja] FOREIGN KEY([cod_caja])
REFERENCES [dbo].[Caja] ([Codigo_caja])
GO

ALTER TABLE [dbo].[RegistroAbastecimientos] CHECK CONSTRAINT [FK_RegistroAbastecimientos_Caja]
GO

ALTER TABLE [dbo].[RegistroAbastecimientos]  WITH CHECK ADD  CONSTRAINT [FK_RegistroAbastecimientos_PlanCuentas] FOREIGN KEY([cta_abastecimiento])
REFERENCES [acc].[PlanCuentas] ([CODIGO])
GO

ALTER TABLE [dbo].[RegistroAbastecimientos] CHECK CONSTRAINT [FK_RegistroAbastecimientos_PlanCuentas]
GO


























