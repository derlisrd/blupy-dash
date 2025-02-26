export class ClienteFarmaResponse{
    success: boolean;
    message: string;
    results: ClienteFarmaResults;
}

export class ClienteFarmaResults {
    
}


/**
 * 
 * {
    "success": true,
    "message": "",
    "results": {
        "farma": {
            "clieCodigo": 1008048,
            "persNombre": "RUIZ DIAZ, DERLIS FRANCISCO",
            "persCi": "4937724",
            "clerLimiteCredito": 1400000,
            "clerLimiteCreditoAdic": null,
            "clerFchFinVigencia": null,
            "limiteCreditoTotal": 1400000,
            "pendiente": 0,
            "saldoDisponible": 1400000,
            "esFuncionario": "N",
            "alianzas": [
                {
                    "clieCodigo": 1008048,
                    "alianza": "BLUPY",
                    "carnet": "1086001-1086001",
                    "vencimiento": "2025-12-31T03:00:00.000Z",
                    "codigoAdicional": 3386521,
                    "frpaCodigo": 129,
                    "formaPago": "BLUPY CREDITO 1 DIA"
                }
            ]
        },
        "micredito": {
            "AfinNom": "Mi Credito",
            "MCPagMin": "5500.00",
            "MCProxVto": "2025-03-10",
            "MTBloq": "",
            "MTDocu": "",
            "MTFEmi": "2023-11-03",
            "MTFVto": "0000-00-00",
            "MTLinea": "700000.00",
            "MTNomT": "DERLIS RUIZ DIAZ",
            "MTNume": "1",
            "MTSaldo": "439954.00",
            "MTTipo": "P",
            "MaeCtaId": "8",
            "MarcaNom": "BLUPY",
            "MotBloqNom": "",
            "SolProdNom": "L\u00ednea de Cr\u00e9dito BluPy"
        }
    }
}
 * 
 */