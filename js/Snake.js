var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src = 'images/snake2.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
  // create initial number of snake sections (snake length)
  var startX = maxX/2;
  var startY = maxY/2;

  this.setX(startX);
  this.setY(startY);
  
  for(var i = 1 ; i <= NUM_INITIAL_SECTIONS; i++){
      var tail = startY + i;
      this.sections.unshift(new SnakeSection(startX, tail));
  }
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  for(var i = 0; i < this.sections.length; i++)
  {
    if(this.isSameLocation(this.sections[i]))
      {
          return true;
      }
  }
 
  if(this.getX() >= maxX || this.getY() >= maxY || this.getX() < 0 || this.getY()< 0)
  {
      return true;
  }
  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here
  var x = this.getX();
  var y = this.getY();

  if(this.direction === LEFT){
     this.setX(x-1);
  }
   else if(this.direction === RIGHT){
     this.setX(x+1);
   }
   else if(this.direction === UP){
     this.setY(y-1);
   }
   else if(this.direction === DOWN){
     this.setY(y+1);
   }
   this.sections.push(new SnakeSection(x, y));
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake
  for(let i = 0; i < this.sections.length; i++){
      this.sections[i].draw(context, spacing);
  }
  DrawUtil.drawImage(
      context,
      this.img,
      spacing * this.getX(),
      spacing * this.getY(),
      spacing,
      spacing
  );
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var s = this;
  document.addEventListener('keydown', function(e){
    // Set snake's nextDirection based on keypress.
    var key_press = e.keyCode;
    if(key_press === LEFT_KEY_CODE && s.direction !== RIGHT){
       s.nextDirection = LEFT;
    }
    else if(key_press === RIGHT_KEY_CODE && s.direction !== LEFT){
        s.nextDirection = RIGHT;
    }
    else if(key_press === UP_KEY_CODE && s.direction !== DOWN){
        s.nextDirection = UP;
    }
    else if(key_press === DOWN_KEY_CODE && s.direction !== UP){
        s.nextDirection = DOWN;
    }
    else {
        return;
    }
    e.preventDefault();
  });
};