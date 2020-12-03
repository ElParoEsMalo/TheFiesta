export class Conversation {
    public miembros:Array<string>=[];
    public mensajes:Array<Mensaje>=[];
    public idChat:string='';

}
export interface Mensaje {
    idUser: string;
    mensaje: string;
}
