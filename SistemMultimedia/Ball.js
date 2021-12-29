class Ball {
 constructor(xx, yy, xxdir, yydir, rr) {
	 this.x = xx;
   this.y = yy;
   this.xdir = xxdir;
   this.ydir = yydir;
   this.r = rr;
   
   this.stopped = false;
   this.color = color(random(0,255), random(0, 255), random(0, 255));
 }
  
  move() {
    if (!this.stopped) {
      this.x = this.x + this.xdir;
      this.y = this.y + this.ydir;
    }
    
  	//this.display();
    
    if (this.x <= 0 || this.x >= width) {
   		this.bounceX();
    }
    
    if (this.y <=0 || this.y >= height) {
      this.bounceY();
    }
    
  }
  
  bounceX() {
    this.xdir = this.xdir * -1;   
  }
  
  bounceY() {
	  this.ydir = this.ydir * -1;  
  }
  
  display() {
    fill(this.color);
   ellipse(this.x, this.y, this.r, this.r); 
  }
  
  stop() {
    this.stopped = true;    
  }
  
  start() {
    this.stopped = false;
  }
  
  hover() { 
   	if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
     	return true;
    } else {
      return false;
    }
  }
}