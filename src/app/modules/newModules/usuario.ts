import { Event } from 'src/app/core/models/evento';

export class Usuario {
  public idUsuario: string;
  public eventosPropios: Array<string>;
  public eventosAjenos: Array<string>;
  public perfil: Perfil;
  public chats: Array<Chat> = [];
  constructor(idUsuario: string, perfil?: Perfil) {
    this.idUsuario = idUsuario;
    this.eventosPropios = [];
    this.eventosAjenos = [];
    this.perfil = perfil || new Perfil();
    console.log(this.perfil.nombre);
  }
}
export class Perfil {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  imagen: string;
  constructor() {
    this.nombre = '';
    this.apellidos = '';
    this.fechaNacimiento = '';
    this.imagen = '';
  }
}
export interface Chat {
  nombre: string;
  chat: string;
}
