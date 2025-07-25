export class InfoSucursalResponse {
  public success: boolean = false;
  public status: number = 0;
  public message: string = "";
  public results: InfoSucursalResults[] = [];

  constructor({ success = false, status = 0, message = "", results = [] }: Partial<InfoSucursalResponse>) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.results = InfoSucursalResults.fromJSONArray(results)
  }

}


export class InfoSucursalResults {
  public codigo: number = 0;
  public descripcion: string = "";
  public direccion: string = "";
  public contacto: string = "";
  public encargado: string = "";
  public encargadoCi: string = "";

  constructor({ codigo = 0, descripcion='', direccion='', contacto='', encargado='', encargadoCi='' }: Partial<InfoSucursalResults>) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.contacto = contacto;
    this.encargado = encargado;
    this.encargadoCi = encargadoCi;
  }

  public static fromJSON(json: any): InfoSucursalResults {
    return new InfoSucursalResults({
        ...json,
        codigo: json.estrCodigo,
        direccion: json.estrDireccion,
        contacto: json.mediValor,
        encargado: json.persNombre,
        encargadoCi: json.persCi,
        descripcion: json.estrDescripcion
    });
  }

  public static fromJSONArray(json: any[]): InfoSucursalResults[] {
    return json.map((item) => this.fromJSON(item));
  }

}