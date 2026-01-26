/* eslint-disable @typescript-eslint/no-explicit-any */

export class DevicesResponse{
    success: boolean = false;
    message: string = '';
    results: DevicesResults[] = [];

    constructor({ success, message, results }: DevicesResponse){
        this.success = success ?? this.success;
        this.message = message ?? this.message;
        this.results = results ?? this.results;
    }

    static fromJson(data: any){
        return new DevicesResponse({
            success: data.success ?? false,
            message: data.message ?? '',
            results: data.results ?? [],
        })
    }

}

export class DevicesResults {
  id: number;
  user_id: number;
  aprobado: boolean;
  build_version: string;
  cedula_dorso_url: string;
  cedula_frente_url: string;
  cedula_selfie_url: string;
  celular: string;
  cedula: string;
  name: string;
  created_at: string;
  desktop: number;
  device: string | null;
  device_id_app: string;
  devicetoken: string;
  email: string | null;
  ip: string;
  location: string | null;
  model: string;
  os: string;
  time: string;
  updated_at: string;
  version: string | null;
  web: boolean;

  constructor({
    id = 0,
    user_id = 0,
    aprobado = false,
    build_version = "",
    cedula_dorso_url = "",
    cedula_frente_url = "",
    cedula_selfie_url = "",
    celular = "",
    cedula = "",
    name = "",
    created_at = "",
    desktop = 0,
    device = null,
    device_id_app = "",
    devicetoken = "",
    email = null,
    ip = "",
    location = null,
    model = "",
    os = "",
    time = "",
    updated_at = "",
    version = null,
    web = false
  }: Partial<DevicesResults>) {
    this.id = id;
    this.user_id = user_id;
    this.aprobado = aprobado;
    this.build_version = build_version;
    this.cedula_dorso_url = cedula_dorso_url;
    this.cedula_frente_url = cedula_frente_url;
    this.cedula_selfie_url = cedula_selfie_url;
    this.celular = celular;
    this.cedula = cedula;
    this.name = name;
    this.created_at = created_at;
    this.desktop = desktop;
    this.device = device;
    this.device_id_app = device_id_app;
    this.devicetoken = devicetoken;
    this.email = email;
    this.ip = ip;
    this.location = location;
    this.model = model;
    this.os = os;
    this.time = time;
    this.updated_at = updated_at;
    this.version = version;
    this.web = web;
  }

  static fromJSON(json: any): DevicesResults {
    return new DevicesResults({
      id: json.id || 0,
      user_id: json.user_id || 0,
      aprobado: json.aprobado || false,
      build_version: json.build_version || "",
      cedula_dorso_url: json.cedula_dorso_url || "",
      cedula_frente_url: json.cedula_frente_url || "",
      cedula_selfie_url: json.cedula_selfie_url || "",
      celular: json.celular || "",
      created_at: json.created_at || "",
      desktop: json.desktop || 0,
      device: json.device || null,
      device_id_app: json.device_id_app || "",
      devicetoken: json.devicetoken || "",
      email: json.email || null,
      ip: json.ip || "",
      location: json.location || null,
      model: json.model || "",
      os: json.os || "",
      time: json.time || "",
      updated_at: json.updated_at || "",
      version: json.version || null,
      web: typeof json.web === "boolean" ? json.web : false
    });
  }

  static map(json : any) {
    return json.map((item: any) => DevicesResults.fromJSON(item));
  }

}
