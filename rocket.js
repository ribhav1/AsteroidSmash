class rocket{
    constructor(){
    this.pos = pos;
    this.fDirection = fDirection;
    this.pVel = pVel;
    this.force = force;
    this.fireColor = fireColor;
    this.touch = touch;
    this.playerColor = playerColor;
    this.playerColor = color(80, 80, 220);
    }

    display(){
      push();
      fill(this.playerColor);
      noStroke();
      angleMode(DEGREES);
      translate(p.x , p.y);
      angle = Math.atan2(mouseY-p.y, mouseX-p.x);
      rotate(degrees(angle));
      beginShape();
      vertex(-pos + 1, -pos + 1);
      vertex(pos + 1, -pos + 1);
      vertex(pos*2, 0);
      vertex(pos + 1, pos + 1);
      vertex(-pos + 1, pos + 1);
      endShape();
      pop();
    }
    movePlayer(){
        fireColor = color(0);
          
        forcePush = force.mult(0.3);  
    
        if( keyIsDown(LEFT_ARROW)){
        fDirection -= 6;
        }
        if( keyIsDown(RIGHT_ARROW)){
        fDirection+= 6;
        }
        if( keyIsDown(87)){
        force=p5.Vector.fromAngle(angle);
        pVel.add(forcePush);
          fireColor = color(0, 255, 255);
        }

        if(p.x > windowW){
            p.x = 0;
          }
          if(p.x < 0){
            p.x = windowW;
          }
          if(p.y < 0){
            p.y = windowH
          }
          if(p.y > windowH){
            p.y = 0
        }

        pVel.mult(0.978);
        p.add(pVel);
    } 
}