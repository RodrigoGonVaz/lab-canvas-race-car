window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
      update()
    }
  
  const $canvas = document.querySelector("canvas");
  const ctx = $canvas.getContext("2d");
  
  let frames = 0;
  const wall = [];
  //---------------------------------------
  // CLASSES
  //---------------------------------------
  
  class Road {
    constructor(){
      this.x = 0;
      this.y = 0;
      this.width = $canvas.width;
      this.height = $canvas.height;
      this.image = new Image();
      this.image.src = "../images/road.png"
    }
    draw(){
      this.y -= 100;
      if (this.y < -this.height) this.y = 0;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // -----------------------(una nueva imagen se crea detras de la primera ya que)
      ctx.drawImage(this.image, this.x, this.y + this.height, this.width, this.height);
    }
  }
  
  
  class Car {
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 60;
      this.height = 100;
      this.move = 15;
      this.image = new Image();
      this.image.src = "../images/car.png" 
      
    }
    draw(){
      this.y ++;
      // para que no se salga del canvas
      if (this.y > $canvas.height - this.height){
        this.y = $canvas.height - this.height;
      } 
      if (this.x > $canvas.width - this.width){
        this.x = $canvas.width - this.width;
      }
      if (this.x < 0){
        this.x = 0;
      }
      
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
    }
    moveLeft(){
      this.x -= this.move
      
    }
    moveRight(){
      this.x += this.move
    }
    isTouching(obj){
      return (this.x < obj.x + obj.width 
              && this.x + this.width > obj.x
              && this.y < obj.y + obj.height 
              && this.y + this.height > obj.y
              );
    }
  }

  class Obstacles {
    constructor(x,y, width){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = 30;
      this.image = new Image();
      this.image.src = "../images/obs.png" 
      
    }
    draw(){
      this.y += 10;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
  }}

  //---------------------------------------
  // INSTANCIAS
  //---------------------------------------
const car = new Car(220,600);
const road = new Road();

  //---------------------------------------
  // ANIMACION
  //---------------------------------------
function update() {
  // calcular o recalcular el estado
	frames ++;
  checkKey();
  obstacleGen();
  checkChoque();
	// Limpiar 
	ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	//  Dibujar 
	road.draw();
  car.draw();
  drawWall();
	
	requestAnimationFrame(update);
}
  //---------------------------------------
  // FUNCIONES DE APOYO
  //---------------------------------------

function obstacleGen() {
    if (frames % 200 === 0) {
      const x = Math.floor(Math.random()* 380)
      const width = Math.floor(Math.random()* 380)
      if (width < 20) {
        return width += 20         
      }
      const obstaclePosicion = new Obstacles(x,0,width);

      wall.push(obstaclePosicion)
    }  
}
function drawWall() {
    wall.forEach((obstacle) => obstacle.draw());
}

function checkChoque() {
  wall.forEach((obstacle) =>{
    if (car.isTouching(obstacle)) {
      alert('Bye Bye');
    }
  });
}

//Revisa si toco las teclas arrow del teclado
function checkKey() {
  document.onkeydown = (event) => {
    // esto significa que el prevent default cuando las teclas se usen 
    //la pantalla no va a reacionar a otra cosa mas que a los comandos
    event.preventDefault(event);
    // --> https://keycode.info/ 
    switch (event.key) {
      case "ArrowLeft":
        car.moveLeft();
        break;
      case "ArrowRight":
        car.moveRight();
        break;
        default:
          break;
    }
  }
  }
}
