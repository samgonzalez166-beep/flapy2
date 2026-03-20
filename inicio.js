class Inicio extends Phaser.Scene{

constructor(){
super("Inicio");
}

preload(){
    this.load.image("fondo","fondo2.jpg");
    this.load.image("bird","bird2.png");
    this.load.image("pipe","pipe.png");
    this.load.image("jugar","play.jpg");
    this.load.image("reiniciar","reiniciar.jpg");
}

create(){

// ACTIVIDAD:

// Cambiar estas posiciones fijas para que se adapten al tamaño del celular

// usando this.scale.width y this.scale.height

this.add.image(this.scale.width / 2,this.scale.height / 2 ,"fondo")
.setDisplaySize(this.scale.width,this.scale.height);

this.add.text(35,200,"Kike volador",{
    fontSize:"40px",
    fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#133c62",
        strokeThickness: 6,
    backgroundColor: "rgba(134, 243, 255, 0.64)"
});
  let boton = this.add.image(
    this.scale.width / 2, 
    this.scale.height / 2 + 100, 
    "jugar"
)
.setOrigin(0.5)
.setScale(0.5);

boton.setInteractive();

boton.on("pointerdown", () => {
    this.scene.start("Juego");
});

    }
}