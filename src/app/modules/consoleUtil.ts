export class consoleUtil {
    private static mostrar: boolean = true;
    public static mostrarPorConsola(...mensaje: any){
        if(this.mostrar){
            mensaje.forEach(element => {
                console.log(element);
            });
        }
    };
}