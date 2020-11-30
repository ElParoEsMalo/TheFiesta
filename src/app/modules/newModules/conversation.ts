export class Conversation {
    public miembros:Array<string>=[];
    public mensajes:Array<Mensaje>=[];

}
export interface Mensaje {
    idUser: string;
    mensaje: string;
}
