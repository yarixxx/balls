function initBricks() {
  var container = document.getElementById("container");
  for (var i = 0; i < 42; i++) {
    var brick = document.createElement("div");
    brick.className = "brick";
    container.appendChild(brick);
  }
}

function initBall() {
  var container = document.getElementById("container");
  var ball = document.createElement("div");
  ball.id = "wrapper";
  var ballInner = document.createElement("div");
  ballInner.id = "ball";
  ball.appendChild(ballInner);
  container.appendChild(ball);
}


function getTransform(el) {
  var css = window.getComputedStyle(document.getElementById(el),null);
  var value = css.getPropertyCSSValue("-webkit-transform").cssText;
  var results = value.match(/matrix\((\d+), (\d+), (\d+), (\d+), (\d+.\d+), (\d+)\)/);

  if(!results) return [0, 0, 0];
  if(results[1] == '3d') return results.slice(2,5);

  results.push(0);
  return results.slice(5, 8);
}

function moveY (fromY, toY, speed, counter) {
  if (toY > 300) {
    var positionX = (getTransform("wrapper")[0] * 1) + 20;
    var lineNumber = Math.round( positionX/40 );
    var item = (5 * 7) + lineNumber;

    var element = document.querySelector(".brick:nth-child("+item+")");
    element.className += " hidden";
  }
  var styleSheets = document.styleSheets[0];
  styleSheets.insertRule("@-webkit-keyframes moveY"+counter+" { 0% { -webkit-transform: translate3d(0,"+fromY+"px,0); } 100% { -webkit-transform: translate3d(0," + toY + "px,0); } }", counter + 1);
  styleSheets.insertRule("#ball { -webkit-animation: moveY"+counter+" "+speed+"s linear 1; }", counter);
  counter += 5;
  if (counter < 300) {
    setTimeout(function(e){
      moveY(toY, fromY, speed, counter);
    }, speed * 1000);
  }
}

function moveX (fromX, toX, speed, counter) {
  var styleSheets = document.styleSheets[0];
  styleSheets.insertRule("@-webkit-keyframes moveX"+counter+" { 0% { -webkit-transform: translate3d("+fromX+"px, 0,0); } 100% { -webkit-transform: translate3d(" + toX + "px, 0,0); } }", counter + 1);
  styleSheets.insertRule("#wrapper { -webkit-animation: moveX"+counter+" "+speed+"s linear 1; }", counter);

  counter += 3;
  if (counter < 300) {
    setTimeout(function(){
      moveX(toX, fromX, speed, counter);
    }, speed * 1000);
  }
}

initBricks();
initBall();

moveX(280, 0, 1.9, 0);
moveY(485, 70, 2.9, 0);


