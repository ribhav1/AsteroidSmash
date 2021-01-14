function bounceOff(object1, object2){
    if((object1.x - object2.x < object1.width/2 + object2.width/2) && (objec2.x - object1.x < object2.width/2 + object1.width/2)){
        object1.shapeColor  = "red";
        object2.shapeColor  = "red";
        object1.velocityX = object1.velocityX * -1;
        object2.velocityX = object2.velocityX * -1;
    } 
    if((object1.y - object2.y < object1.height/2 + object2.height/2) && (object2.y - object1.y < object2.height/2 + object1.height/2)){
        object1.shapeColor  = "green";
        object2.shapeColor  = "green";
        object1.velocityY = object1.velocityY * -1;
        object2.velocityY = object2.velocityY * -1;
    } 
}
function isTouching(object1, object2){
    if((object1 !== undefined) && (object2 !== undefined)){
        if((object1.collider.center.x - object2.collider.center.x < object1.width/2 + object2.width/2) 
        && (object2.collider.center.x - object1.collider.center.x < object2.width/2 + object1.width/2) 
        && (object1.collider.center.y - object2.collider.center.y < object1.height/2 + object2.height/2)
        && (object2.collider.center.y - object1.collider.center.y < object2.height/2 + object1.height/2)){
            return true;
        }else{
            return false;
        }
    }
}