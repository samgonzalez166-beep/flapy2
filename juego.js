class Juego extends Phaser.Scene {

constructor(){
    super("Juego");
}


preload(){
    this.load.spritesheet("bird2", "bird2.png", {
        frameWidth: 95,  // ancho de cada sprite
        frameHeight: 120,// alto de cada sprite
           spacing: 2,   // espacio ENTRE sprites
    margin: 2 
    });
}

create(){
   
    
    // ---------------- PANTALLA ----------------
    this.ancho = this.scale.width;
    this.alto = this.scale.height;

    
 
    

    // ---------------- FONDO ----------------
   this.fondo = this.add.tileSprite(
    this.ancho/2, 
    this.alto/2, 
    this.ancho, 
    this.alto, 
    "fondo"
);

let graphics = this.add.graphics();
graphics.fillStyle(0xffffff, 1);
graphics.fillCircle(16, 16, 16); // círculo pequeño
graphics.generateTexture("particula", 20, 20);
graphics.destroy();

this.particulas = this.add.particles(0, 0, "particula", {
    speed: { min: 50, max: 120 },
    scale: { start: 0.4, end: 0 },
    lifespan: 400,
    quantity: 3,
    tint: [0x00ccff, 0x0000ff, 0xffffff],
     emitting: false 
});

this.particulas.setDepth(2);


    // ---------------- PAJARO ----------------

     this.anims.create({
    key: "volar",
    frames: this.anims.generateFrameNumbers("bird2", {
        start: 0,
        end: 5   // depende de cuántos frames tengas
    }),
    frameRate:10, // velocidad de animación
    repeat: -1     // infinito
});
    this.bird = this.physics.add.sprite(70, this.alto/2, "bird2")
    .setScale(0.7);

this.bird.play("volar");
    this.bird.body.gravity.y = 900;

    this.bird.setDepth(3);

   

    // hitbox del pajaro
    this.bird.body.setSize(this.bird.width * 0.6, this.bird.height * 0.6);

    // ---------------- GRUPO DE TUBOS ----------------
    this.pipes = this.physics.add.group();

    // ---------------- PUNTOS ----------------
    this.puntos = 0;
    this.textoPuntos = this.add.text(20,20,"0",{
        fontSize:"40px",
        fill:"#ffffff",
        fontStyle: "bold",
        stroke: "#084586",
        strokeThickness: 6
    });

    // ---------------- CONTROLES ----------------
    this.input.on("pointerdown", this.saltar, this);
    this.input.keyboard.on("keydown-SPACE", this.saltar, this);

    // ---------------- GENERADOR DE TUBOS ----------------
    this.time.addEvent({
        delay: 2500, //Temporizador que Aumenta o Disminulle el tiempo en el que se generan los tubos
        callback:this.crearTubos,
        callbackScope:this,
        loop:true
    });

    // ---------------- COLISION ----------------
    this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this);

    // ---------------- DEBUG HITBOX ----------------
    //this.debugGraphics = this.add.graphics();
    //this.physics.world.createDebugGraphic();

}

update(){

    this.verificarCaida();
    this.verificarPuntos();


     this.fondo.tilePositionX += 1; //para que se mueva un poco


}

// ---------------- SALTO ----------------
saltar(){
    this.bird.setVelocityY(-350);

    this.particulas.emitParticleAt(this.bird.x - 20, this.bird.y);
}

// ---------------- VERIFICAR CAIDA ----------------
verificarCaida(){

    if(this.bird.y > this.alto){
        this.gameOver();
    }

}


// ---------------- CONTAR PUNTOS ----------------
verificarPuntos(){

    this.pipes.getChildren().forEach(pipe=>{

        if(pipe.getData("tipo") == "arriba"){

            if(pipe.x < this.bird.x && !pipe.getData("pasado")){

                pipe.setData("pasado",true);
                this.puntos++;
                this.textoPuntos.setText(this.puntos);
            }
        }
    });
    //this.debugGraphics.clear();
    //this.physics.world.drawDebug = true;
}

// ---------------- CREAR TUBOS ----------------
crearTubos(){

    let espacio = 200; //Aumenta o disminuye el espacio entre los tubos
    let posicion = Phaser.Math.Between(this.alto * 0.3, this.alto * 0.7);

    // tubo arriba
    let arriba = this.pipes.create(this.ancho, posicion-espacio,"pipe");

    arriba.setOrigin(0,1);
    arriba.body.allowGravity = false;
    arriba.setVelocityX(-200);

    arriba.setData("tipo","arriba");
    arriba.setData("pasado",false);


    // Ajusta el tamaño de la colision tubo arriba
    arriba.body.setSize(arriba.width * 0.7, arriba.height);
    arriba.body.setOffset(arriba.width * 0.10, 0);

    // tubo abajo
    let abajo = this.pipes.create(this.ancho,posicion,"pipe");

    abajo.setOrigin(0,0);
    abajo.body.allowGravity = false;
    abajo.setVelocityX(-200);

    abajo.setData("tipo","abajo");

    
    // Ajusta el tamaño de la colision tubo abajo
    abajo.body.setSize(abajo.width * 0.7, abajo.height);
    abajo.body.setOffset(abajo.width * 0.10, 0);

    this.pipes.getChildren().forEach(pipe=>{
        if(pipe.x < -100){
            pipe.destroy();
        }
    });
}

// ---------------- GAME OVER ----------------
gameOver(){
        this.scene.start("GameOver",{puntos:this.puntos});
    }
}