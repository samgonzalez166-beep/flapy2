class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

create(data){

let ancho = this.scale.width;
let alto = this.scale.height;

this.add.image(ancho / 2, alto / 2,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);
this.add.image("reiniciar");

this.add.text(ancho / 2, alto * 0.35,"Puedes o no?",{
    fontSize:"40px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#153a6a",
        strokeThickness: 6,
    backgroundColor: "rgba(0, 217, 255, 0.5)"
}).setOrigin(0.5);

this.add.text(ancho / 2, alto * 0.50,"Puntos: " + data.puntos,{ 
    fontSize:"30px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#173056",
        strokeThickness: 6,
    backgroundColor: "rgba(64, 215, 242, 0.5)"
}).setOrigin(0.5);


let boton = this.add.image(
    this.scale.width / 2, 
    this.scale.height / 2 + 100, 
    "reiniciar"
)
.setOrigin(0.5)
.setScale(0.5);

boton.setInteractive();

boton.on("pointerdown", () => {
    this.scene.start("Juego");
});

    }
}