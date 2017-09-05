var x = 0;
var y = -5;
var boulerad = 16;
var letimeOut;
var son = 1;
var ok = 0;

var check = window.navigator.userAgent;

if (check.indexOf('Firefox') !== -1) {
  match = check.match(/Firefox.../);
  if (parseFloat(match[0].substr(-2))<20) {
    ok = 1;
  }
}

if (check.indexOf('Opera') !== -1) {
  match = check.match(/Opera...../);
  if (parseFloat(match[0].substr(-4))<12) {
    ok = 1;
  }
}

if (check.indexOf('Safari') !== -1  && check.indexOf('Chrome') == -1) {
  match = check.match(/Safari.../);
  if (parseFloat(match[0].substr(-2))<83) {
    ok = 1;
  }
}

var Game = {
  canvas: undefined,
  canvasContext: undefined,
  erase: false,
  shots: [],
  boule: {
    fired: false
  },
  balls: 3,
  score: 0,
  maps: {
    num1: {
      fire: false,
      paddle: {
        height: 10,
        width: 100,
        y: 680 - 78,
        x: 200,
        color: 'yellow'
      },
      limitLeft: 68,
      limitRight: 920,
      level: [
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1],
        [1, 0, 2, 2, 0, 0, 0, 3, 3, 0, 0, 0, 2, 2, 0, 1],
        [1, 0, 0, 2, 2, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 1],
        [1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 1, 1, 1]
      ],
      cleared: false,
      clearCanvas: function() {
        Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.canvasContext.fillStyle = 'DarkMagenta';
        Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
      }
    },
    num2: {
      fire: false,
      paddle: {
        height: 10,
        width: 100,
        y: 680 - 10,
        x: 200,
        color: 'yellow'
      },
      limitLeft: 68,
      limitRight: 920,
      level: [
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 1, 0, 0, 0, 2, 2, 0, 0, 0, 1, 3, 3, 1],
        [1, 3, 3, 1, 0, 0, 2, 2, 2, 2, 0, 0, 1, 3, 3, 1],
        [1, 0, 0, 0, 0, 2, 2, 5, 5, 2, 2, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 2, 2, 5, 5, 5, 5, 2, 2, 2, 0, 0, 1],
        [1, 0, 2, 2, 2, 14, 2, 2, 2, 2, 14, 2, 2, 2, 0, 1],
        [1, 0, 0, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      ],
      cleared: false,
      shoot: false,
      clearCanvas: function() {
        Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.canvasContext.fillStyle = 'DarkBlue';
        Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
      }
    },
    num3: {
      fire: false,
      paddle: {
        height: 10,
        width: 100,
        y: 680 - 10,
        x: 200,
        color: 'yellow'
      },
      limitLeft: 0,
      limitRight: 920,
      level: [
        [6, 7, 8, 1, 2, 2, 2, 1, 2, 2, 2, 1, 6, 7, 8, 1],
        [13, 15, 9, 1, 2, 5, 2, 1, 2, 3, 2, 1, 13, 14, 9, 1],
        [12, 11, 10, 1, 2, 2, 2, 1, 2, 2, 2, 1, 12, 11, 10, 1],
        [0, 2, 0, 1, 0, 5, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1],
        [0, 0, 0, 1, 0, 5, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      ],
      cleared: false,
      clearCanvas: function() {
        Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.canvasContext.fillStyle = 'DarkBlue';
        Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
      }
    },
    num4: {
      fire: false,
      paddle: {
        height: 10,
        width: 100,
        y: 680 - 10,
        x: 200,
        color: 'yellow'
      },
      limitLeft: 0,
      limitRight: 988,
      level: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [3, 2, 1, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 2, 2, 2, 2, 2, 2, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 2, 6, 7, 7, 8, 2, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 2, 13, 14, 14, 9, 2, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 2, 12, 11, 11, 10, 2, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 2, 2, 2, 2, 2, 2, 3, 5, 1, 2, 3],
        [3, 2, 1, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      cleared: false,
      clearCanvas: function() {
        Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.canvasContext.fillStyle = 'DarkBlue';
        Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
      }
    }
  }
};

Game.update = function() {
  if (Game.boule.fired) {
    if (boulerad + Game.boule.x >= Game.canvas.width || Game.boule.x - boulerad <= 0) {
      x = -x;
      if (ok === 0) {
        Game.bounce.pause();
        Game.bounce.currentTime = 0;
        Game.bounce.play();
      }
    }
    if ((Game.boule.y < Game.paddle.y) && (Game.boule.x >= (Game.paddle.x + (Game.paddle.width / 4))) && (Game.boule.x <= (Game.paddle.x + (3 * Game.paddle.width / 4))) && ((boulerad + Game.boule.y) >= Game.paddle.y)) {
      if (ok === 0) {
        Game.paddleBounce.play();
      }
      y = -y;
      x = 0;
    }
    if ((Game.boule.y < Game.paddle.y) && (Game.boule.x < (Game.paddle.x + (Game.paddle.width / 4))) && (Game.boule.x >= (Game.paddle.x + (Game.paddle.width / 8))) && ((boulerad + Game.boule.y) >= Game.paddle.y)) {
      if (ok === 0) {
        Game.paddleBounce.play();
      }
      y = -y;
      x = -2;
    }
    if ((Game.boule.y < Game.paddle.y) && (Game.boule.x > (Game.paddle.x + (3 * Game.paddle.width / 4))) && (Game.boule.x <= (Game.paddle.x + (7 * Game.paddle.width / 8))) && ((boulerad + Game.boule.y) >= Game.paddle.y)) {
      if (ok === 0) {
        Game.paddleBounce.play();
      }
      y = -y;
      x = 2;
    }
    if (((Game.boule.y < Game.paddle.y) && (Game.boule.x + boulerad > Game.paddle.x) && ((Game.boule.x + boulerad) < (Game.paddle.x + (Game.paddle.width / 8))) && ((boulerad + Game.boule.y) >= Game.paddle.y)) || (Game.boule.x >= Game.paddle.x) && (Game.boule.x <= (Game.paddle.x + (Game.paddle.width / 8)) && ((boulerad + Game.boule.y) >= Game.paddle.y) && (Game.boule.y - Game.paddle.y <= Game.paddle.height)) || ((Game.paddle.x <= (Game.boule.x + boulerad)) && (Game.boule.x < Game.paddle.x) && (((boulerad + Game.boule.y) >= Game.paddle.y) && (Game.boule.y - Game.paddle.y <= Game.paddle.height)))) {
      if (ok === 0) {
        Game.paddleBounce.play();
      }
      y = -y;
      x = -4;
    }
    if (((Game.boule.y < Game.paddle.y) && (Game.boule.x - boulerad < (Game.paddle.x + Game.paddle.width)) && ((Game.boule.x - boulerad) > (Game.paddle.x + (7 * Game.paddle.width / 8))) && ((boulerad + Game.boule.y) >= Game.paddle.y)) || ((Game.boule.x > (Game.paddle.x + (7 * Game.paddle.width / 8))) && (Game.boule.x <= (Game.paddle.x + Game.paddle.width) && (((boulerad + Game.boule.y) >= Game.paddle.y) && (Game.boule.y - Game.paddle.y <= Game.paddle.height)))) || ((Game.boule.x > (Game.paddle.x + Game.paddle.width)) && ((Game.boule.x - boulerad) <= (Game.paddle.x + Game.paddle.width)) && (((boulerad + Game.boule.y) >= Game.paddle.y) && (Game.boule.y - Game.paddle.y <= Game.paddle.height)))) {
      if (ok === 0) {
        Game.paddleBounce.play();
      }
      y = -y;
      x = 4;
    }

    if (boulerad + Game.boule.y >= Game.canvas.height) {
      y = 0;
      x = 0;
      if (ok === 0) {
        Game.lostball.play();
      }
      Game.erase = true;
    }
    if (Game.boule.y - boulerad <= 0) {
      if (ok === 0) {
        Game.bounce.pause();
        Game.bounce.currentTime = 0;
        Game.bounce.play();
      }
      y = -y;
    }
    Game.boule.y += y;
    Game.boule.x += x;
  }
};

Game.draw = function() {
  if (Game.boule.fired && !Game.erase) {
    Game.canvasContext.save();
    Game.canvasContext.beginPath();
    Game.canvasContext.fillStyle = 'DarkOrange';
    Game.canvasContext.arc(Game.boule.x, Game.boule.y, 16, 0, Math.PI * 2);
    Game.canvasContext.fill();
    Game.canvasContext.restore();
  }
  if (Game.boule.fired && Game.erase) {
    Game.canvasContext.save();
    Game.canvasContext.beginPath();
    Game.canvasContext.fillStyle = 'DarkOrange';
    Game.canvasContext.arc(Game.boule.x, Game.boule.y, boulerad, 0, Math.PI * 2);
    Game.canvasContext.fill();
    Game.canvasContext.restore();
    boulerad--;
    if (boulerad === 0) {
      boulerad = 16;
      Game.boule.fired = false;
      Game.erase = false;
      Game.balls--;
      y = -5;
    }
  }
  Game.canvasContext.fillStyle = Game.current.paddle.color;
  Game.canvasContext.fillRect(Game.paddle.x, Game.paddle.y, Game.paddle.width, Game.paddle.height);
};

Game.drawImage = function(sprite, position) {
  Game.canvasContext.save();
  Game.canvasContext.translate(position.x, position.y);
  Game.canvasContext.drawImage(sprite, 0, 0, 68, 68);
  Game.canvasContext.restore();
};

Game.drawScore = function() {
  Game.canvasContext.save();
  Game.canvasContext.font = "bold 25px sans-serif";
  Game.canvasContext.fillStyle = "white";
  Game.canvasContext.textAlign = "center";
  var placeX = Game.canvas.width - 120;
  var placeY = Game.canvas.height - 10;
  Game.canvasContext.fillText('Votre score : ' + Game.score.toString(), placeX, placeY);
  Game.canvasContext.restore();
  Game.canvasContext.save();
  Game.canvasContext.font = "bold 25px sans-serif";
  Game.canvasContext.fillStyle = "white";
  Game.canvasContext.textAlign = "center";
  Game.canvasContext.fillText('Boules : ' + Game.balls.toString(), 100, placeY);
  Game.canvasContext.restore();
  if (Game.score == 280 && !Game.maps.num1.cleared) {
    x = 0;
    y = 0;
    if (ok === 0) {
      Game.fin.play();
    }
    Game.maps.num1.cleared = true;
    Game.current = Object.create(Game.maps.num2);
    Game.current.level = JSON.parse(JSON.stringify(Game.maps.num2.level));
    Game.paddle = Game.current.paddle;
    Game.boule.fired = false;
    y = -5;
    document.getElementById('div1').style.display ='block';
    document.getElementById('div2').style.display ='block';
  }
  if (Game.score == 760 && !Game.maps.num2.cleared) {
    x = 0;
    y = 0;
    if (ok === 0) {
      Game.fin.play();
    }
    Game.shots = [];
    Game.maps.num2.cleared = true;
    Game.current = Object.create(Game.maps.num3);
    Game.current.level = JSON.parse(JSON.stringify(Game.maps.num3.level));
    Game.paddle = Game.current.paddle;
    Game.boule.fired = false;
    y = -5;
    document.getElementById('div3').style.display ='block';
    document.getElementById('div4').style.display ='block';
  }
  if (Game.score == 1220 && !Game.maps.num3.cleared) {
    x = 0;
    y = 0;
    if (ok === 0) {
      Game.fin.play();
    }
    Game.shots = [];
    Game.maps.num3.cleared = true;
    Game.current = Object.create(Game.maps.num4);
    Game.current.level = JSON.parse(JSON.stringify(Game.maps.num4.level));
    Game.paddle = Game.current.paddle;
    Game.boule.fired = false;
    y = -5;
    document.getElementById('div5').style.display ='block';
    document.getElementById('div6').style.display ='block';
  }
};

Game.drawMap = function(map) {
  var position = {
    x: 0,
    y: 0
  };
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] == 1) {
        Game.drawImage(Game.brique, position);
      }
      if (map[i][j] == 2) {
        Game.drawImage(Game.briquebleue, position);
      }
      if (map[i][j] == 3) {
        Game.drawImage(Game.briquerouge, position);
      }
      if (map[i][j] == 4) {
        Game.drawImage(Game.dead, position);
      }
      if (map[i][j] == 5) {
        Game.drawImage(Game.briqueverte, position);
      }
      if (map[i][j] == 6) {
        Game.drawImage(Game.coingauche, position);
      }
      if (map[i][j] == 61) {
        Game.drawImage(Game.coingauche1, position);
      }
      if (map[i][j] == 62) {
        Game.drawImage(Game.coingauche2, position);
      }
      if (map[i][j] == 7) {
        Game.drawImage(Game.haut, position);
      }
      if (map[i][j] == 71) {
        Game.drawImage(Game.haut1, position);
      }
      if (map[i][j] == 72) {
        Game.drawImage(Game.haut2, position);
      }
      if (map[i][j] == 8) {
        Game.drawImage(Game.coindroit, position);
      }
      if (map[i][j] == 81) {
        Game.drawImage(Game.coindroit1, position);
      }
      if (map[i][j] == 82) {
        Game.drawImage(Game.coindroit2, position);
      }
      if (map[i][j] == 9) {
        Game.drawImage(Game.borddroit, position);
      }
      if (map[i][j] == 91) {
        Game.drawImage(Game.borddroit1, position);
      }
      if (map[i][j] == 92) {
        Game.drawImage(Game.borddroit2, position);
      }
      if (map[i][j] == 10) {
        Game.drawImage(Game.coinbdroit, position);
      }
      if (map[i][j] == 101) {
        Game.drawImage(Game.coinbdroit1, position);
      }
      if (map[i][j] == 102) {
        Game.drawImage(Game.coinbdroit2, position);
      }
      if (map[i][j] == 11) {
        Game.drawImage(Game.bas, position);
      }
      if (map[i][j] == 111) {
        Game.drawImage(Game.bas1, position);
      }
      if (map[i][j] == 112) {
        Game.drawImage(Game.bas2, position);
      }
      if (map[i][j] == 12) {
        Game.drawImage(Game.coinbgauche, position);
      }
      if (map[i][j] == 121) {
        Game.drawImage(Game.coinbgauche1, position);
      }
      if (map[i][j] == 122) {
        Game.drawImage(Game.coinbgauche2, position);
      }
      if (map[i][j] == 13) {
        Game.drawImage(Game.bordgauche, position);
      }
      if (map[i][j] == 131) {
        Game.drawImage(Game.bordgauche1, position);
      }
      if (map[i][j] == 132) {
        Game.drawImage(Game.bordgauche2, position);
      }
      if (map[i][j] == 14) {
        Game.drawImage(Game.star, position);
      }
      if (map[i][j] == 15) {
        Game.drawImage(Game.sun, position);
      }
      position.x += 68;
    }
    position.x = 0;
    position.y += 68;
  }
};

Game.drawShots = function() {
  for (var i = 0; i < Game.shots.length; i++) {
    Game.canvasContext.fillStyle = 'DarkTurquoise';
    Game.canvasContext.fillRect(Game.shots[i].x, Game.shots[i].y, Game.shots[i].width, Game.shots[i].height)
  }
};

Game.shotsFired = function(map) {
  for (var i = 0; i < Game.shots.length; i++) {
    Game.shots[i].y -= 10;
    if (Game.shots[i].y < 0) {
      Game.shots.splice(i, 1);
    }
    if (Game.shots[i] && y > 0 && ((Game.boule.x - boulerad) <= Game.shots[i].x) && (Game.shots[i].x <= (Game.boule.x + boulerad)) && ((Game.shots[i].y - 10) <= (Game.boule.y + boulerad)) && (Game.boule.y < (Game.shots[i].y - 10))) {
      y = -y;
      Game.shots.splice(i, 1);
    }
    if (Game.shots[i] && y <= 0 && -9 <= y && ((Game.boule.x - boulerad) <= Game.shots[i].x) && (Game.shots[i].x <= (Game.boule.x + boulerad)) && ((Game.shots[i].y - 10) <= (Game.boule.y + boulerad)) && (Game.boule.y < (Game.shots[i].y - 10))) {
      y--;
      Game.shots.splice(i, 1);
    }
    var position = {
      x: 0,
      y: 0
    };
    for (var j = 0; j < map.length; j++) {
      for (var k = 0; k < map[j].length; k++) {
        if (Game.shots[i] && map[j][k] !== 0 && position.x <= Game.shots[i].x && Game.shots[i].x <= (position.x + 68) && (Game.shots[i].y - 10) <= (position.y + 68)) {

          if (map[j][k] == 2 || map[j][k] == 3 || map[j][k] == 5 || map[j][k] == 14 || map[j][k] == 62 || map[j][k] == 72 || map[j][k] == 82 || map[j][k] == 92 || map[j][k] == 102 || map[j][k] == 112 || map[j][k] == 122 || map[j][k] == 132) {
            map[j][k] = 0;
            if (ok === 0) {
              pop();
            }
            Game.score += 10;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 1 || map[j][k] == 15) {
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 61) {
            map[j][k] = 62;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 6) {
            map[j][k] = 61;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 71) {
            map[j][k] = 72;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 7) {
            map[j][k] = 71;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 81) {
            map[j][k] = 82;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 8) {
            map[j][k] = 81;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 91) {
            map[j][k] = 92;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 9) {
            map[j][k] = 91;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 101) {
            map[j][k] = 102;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 10) {
            map[j][k] = 101;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 111) {
            map[j][k] = 112;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 11) {
            map[j][k] = 111;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 121) {
            map[j][k] = 122;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 12) {
            map[j][k] = 121;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 131) {
            map[j][k] = 132;
            Game.shots.splice(i, 1);
          }
          if (map[j][k] == 13) {
            map[j][k] = 131;
            Game.shots.splice(i, 1);
          }

        }
        position.x += 68;
      }
      position.x = 0;
      position.y += 68;
    }
  }
};

Game.collision = function(map) {
  if (Game.boule.fired) {
    var changetime;
    var position = {
      x: 0,
      y: 0
    };
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        if (map[i][j] !== 0) {
          var refresh = function() {
            if (map[i][j] == 2 || map[i][j] == 3 || map[i][j] == 5 || map[i][j] == 62 || map[i][j] == 72 || map[i][j] == 82 || map[i][j] == 92 || map[i][j] == 102 || map[i][j] == 112 || map[i][j] == 122 || map[i][j] == 132) {
              map[i][j] = 0;
              if (ok === 0) {
                pop();
              }
              Game.score += 10;
            }
            if (map[i][j] == 14) {
              map[i][j] = 0;
              if (ok === 0) {
                pop();
              }
              Game.score += 10;
              Game.current.fire = true;
              Game.current.paddle.color = 'DarkTurquoise';
            }
            if (map[i][j] == 15) {
              map[i][j] = 0;
              if (ok === 0) {
                pop();
              }
              Game.score += 10;
              Game.balls++;
            }
            if (map[i][j] == 1) {
              if (ok === 0) {
                Game.bounce.pause();
                Game.bounce.currentTime = 0;
                Game.bounce.play();
              }
            }
            if (map[i][j] == 61) {
              map[i][j] = 62;
            }
            if (map[i][j] == 6) {
              map[i][j] = 61;
            }
            if (map[i][j] == 71) {
              map[i][j] = 72;
            }
            if (map[i][j] == 7) {
              map[i][j] = 71;
            }
            if (map[i][j] == 81) {
              map[i][j] = 82;
            }
            if (map[i][j] == 8) {
              map[i][j] = 81;
            }
            if (map[i][j] == 91) {
              map[i][j] = 92;
            }
            if (map[i][j] == 9) {
              map[i][j] = 91;
            }
            if (map[i][j] == 101) {
              map[i][j] = 102;
            }
            if (map[i][j] == 10) {
              map[i][j] = 101;
            }
            if (map[i][j] == 111) {
              map[i][j] = 112;
            }
            if (map[i][j] == 11) {
              map[i][j] = 111;
            }
            if (map[i][j] == 121) {
              map[i][j] = 122;
            }
            if (map[i][j] == 12) {
              map[i][j] = 121;
            }
            if (map[i][j] == 131) {
              map[i][j] = 132;
            }
            if (map[i][j] == 13) {
              map[i][j] = 131;
            }
          };
          var point = {
            x: Game.boule.x + x,
            y: Game.boule.y + y
          };
          if (Game.boule.x + x < position.x) {
            point.x = position.x;
          }
          if (Game.boule.y + y < position.y) {
            point.y = position.y;
          }
          if (Game.boule.x + x > (position.x + 68)) {
            point.x = position.x + 68;
          }
          if (Game.boule.y + y > (position.y + 68)) {
            point.y = position.y + 68;
          }
          var distX = Game.boule.x - point.x;
          var distX1 = (Game.boule.x + x) - point.x;
          var distY = Game.boule.y - point.y;
          var distY1 = (Game.boule.y + y) - point.y;
          var distance = Math.sqrt((distX1 * distX1) + (distY * distY));
          var distance1 = Math.sqrt((distX * distX) + (distY1 * distY1));
          if (distance < boulerad) {
            var uncollide = boulerad - Math.abs(distX1);
            if (map[i][j] == 4) {
              y = 0;
              x = 0;
              if (ok === 0) {
                Game.lostball.play();
              }
              Game.erase = true;
            }
            if (!changetime) {
              changetime = new Date();
              if (distX1 < 0) {
                Game.boule.x -= uncollide;
              }
              if (distX1 > 0) {
                Game.boule.x += uncollide;
              }
              x = -x;
              if (x == 0) {
                y = -y;
              }
              refresh();
            }
            if (changetime) {
              var newtime = new Date();
              if (newtime - changetime > 17) {
                if (distX1 < 0) {
                  Game.boule.x -= uncollide;
                }
                if (distX1 > 0) {
                  Game.boule.x += uncollide;
                }
                x = -x;
                if (x == 0) {
                  y = -y;
                }
                changetime = new Date();
                refresh();
              }
            }

          }
          if (distance1 < boulerad) {
            var uncollide = boulerad - Math.abs(distY1);
            if (map[i][j] == 4) {
              y = 0;
              x = 0;
              if (ok === 0) {
                Game.lostball.play();
              }
              Game.erase = true;
            }
            if (!changetime) {
              changetime = new Date();
              if (distY1 < 0) {
                Game.boule.y -= uncollide;
              }
              if (distY1 > 0) {
                Game.boule.y += uncollide;
              }
              y = -y;
              refresh();
            }
            if (changetime) {
              var newtime = new Date();
              if (newtime - changetime > 17) {
                if (distY1 < 0) {
                  Game.boule.y -= uncollide;
                }
                if (distY1 > 0) {
                  Game.boule.y += uncollide;
                }
                y = -y;
                changetime = new Date();
                refresh();
              }
            }

          }

        }
        position.x += 68;
      }
      position.x = 0;
      position.y += 68;
    }
  }
};

Game.over = function() {
  if (Game.balls === 0 && !Game.boule.fired) {
    Game.canvasContext.save();
    Game.canvasContext.font = "bold 70px sans-serif";
    Game.canvasContext.fillStyle = "white";
    Game.canvasContext.textAlign = "center";
    Game.canvasContext.textBaseline = "middle";
    Game.canvasContext.lineWidth = 5;
    var centreX = Game.canvas.width / 2;
    Game.canvasContext.fillText("Perdu", centreX, 500);
    Game.canvasContext.font = "bold 20px sans-serif";
    Game.canvasContext.fillText("Merci d'avoir joué ! Appuyez sur la touche Espace pour rejouer", centreX, 560);
    Game.canvasContext.restore();
  }
  if (Game.score == 2200) {
    Game.canvasContext.save();
    Game.canvasContext.font = "bold 70px sans-serif";
    Game.canvasContext.fillStyle = "white";
    Game.canvasContext.textAlign = "center";
    Game.canvasContext.textBaseline = "middle";
    Game.canvasContext.lineWidth = 5;
    var centreX = Game.canvas.width / 2;
    Game.canvasContext.fillText("Fin", centreX, 500);
    Game.canvasContext.font = "bold 20px sans-serif";
    Game.canvasContext.fillText("Merci d'avoir joué ! Appuyez sur la touche Espace pour rejouer", centreX, 560);
    Game.canvasContext.restore();
    document.getElementById('div7').style.display ='block';
    document.getElementById('div8').style.display ='block';
  }
};

Game.mainLoop = function() {
  Game.current.clearCanvas();
  Game.update();
  Game.collision(Game.current.level);
  if (Game.shots.length) {
    Game.drawShots();
    Game.shotsFired(Game.current.level);
  }
  Game.drawMap(Game.current.level);
  Game.drawScore();
  Game.draw();
  Game.over();
  letimeOut = setTimeout(function() {
    requestAnimationFrame(Game.mainLoop);
  }, 1000 / 60);
};

Game.start = function() {
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());
  Game.canvas = document.getElementById('lecanvas');
  Game.canvasContext = Game.canvas.getContext('2d');
  Game.current = Object.create(Game.maps.num1);
  Game.current.level = JSON.parse(JSON.stringify(Game.maps.num1.level));
  Game.paddle = Game.current.paddle;
  document.onmousemove = function(evt) {
    if (Game.current && (evt.pageX <= (Game.canvas.offsetLeft + Game.current.limitLeft + (Game.paddle.width / 2)))) {
      Game.paddle.x = Game.current.limitLeft;
    } else {
      if (Game.current && (evt.pageX >= (Game.canvas.offsetLeft + Game.current.limitRight + (Game.paddle.width / 2)))) {
        Game.paddle.x = Game.current.limitRight;
      } else {
        Game.paddle.x = (evt.pageX - Game.canvas.offsetLeft) - Game.paddle.width / 2;
      }
    }
  };
  window.scrollTo(0, 900);
  Game.mainLoop();
};

window.onload = Game.start;

document.onkeydown = function handleKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 32:
      document.getElementById('div1').style.display ='none';
      document.getElementById('div2').style.display ='none';
      document.getElementById('div3').style.display ='none';
      document.getElementById('div4').style.display ='none';
      document.getElementById('div5').style.display ='none';
      document.getElementById('div6').style.display ='none';
      document.getElementById('div7').style.display ='none';
      document.getElementById('div8').style.display ='none';
      clearTimeout(letimeOut);
      Game.score = 0;
      Game.balls = 3;
      Game.maps.num1.cleared = false;
      Game.maps.num2.cleared = false;
      Game.maps.num3.cleared = false;
      Game.boule.fired = false;
      Game.start();
      break;
    default:
      return;
  }
};

var reference;
document.onclick = function() {
  if (!Game.boule.fired && Game.balls > 0 && Game.score < 2200) {
    Game.boule.fired = true;
    if (ok === 0) {
      Game.launch.play();
    }
    y = -5;
    x = 0;
    Game.boule.x = Game.paddle.x + Game.paddle.width / 2;
    Game.boule.y = Game.paddle.y - boulerad - 4;
  }
  if (Game.boule.fired & Game.current.fire) {
    if (!reference) {
      reference = new Date();
      var shot = {
        x: Game.paddle.x + Game.paddle.width / 2,
        y: Game.paddle.y,
        height: 20,
        width: 5
      };
      if (ok === 0) {
        Game.laser.play();
      }
      Game.shots.push(shot);
    } else {
      var newtime = new Date();
      if (newtime - reference >= 100) {
        var shot = {
          x: Game.paddle.x + Game.paddle.width / 2,
          y: Game.paddle.y,
          height: 20,
          width: 5
        };
        if (ok === 0) {
          Game.laser.pause();
          Game.laser.currentTime = 0;
          Game.laser.play();
        }
        Game.shots.push(shot);
        reference = new Date();
      }
    }
  }
};

Game.brique = new Image();
Game.brique.src = 'sprites/brique.png';
Game.briquebleue = new Image();
Game.briquebleue.src = 'sprites/briquebleue.png';
Game.briquerouge = new Image();
Game.briquerouge.src = 'sprites/briquerouge.png';
Game.briqueverte = new Image();
Game.briqueverte.src = 'sprites/briqueverte.png';
Game.dead = new Image();
Game.dead.src = 'sprites/dead1.png';
Game.coingauche = new Image();
Game.coingauche.src = 'sprites/coingauche.png';
Game.coingauche1 = new Image();
Game.coingauche1.src = 'sprites/coingauche1.png';
Game.coingauche2 = new Image();
Game.coingauche2.src = 'sprites/coingauche2.png';
Game.haut = new Image();
Game.haut.src = 'sprites/haut.png';
Game.haut1 = new Image();
Game.haut1.src = 'sprites/haut1.png';
Game.haut2 = new Image();
Game.haut2.src = 'sprites/haut2.png';
Game.coindroit = new Image();
Game.coindroit.src = 'sprites/coindroit.png';
Game.coindroit1 = new Image();
Game.coindroit1.src = 'sprites/coindroit1.png';
Game.coindroit2 = new Image();
Game.coindroit2.src = 'sprites/coindroit2.png';
Game.bordgauche = new Image();
Game.bordgauche.src = 'sprites/bordgauche.png';
Game.bordgauche1 = new Image();
Game.bordgauche1.src = 'sprites/bordgauche1.png';
Game.bordgauche2 = new Image();
Game.bordgauche2.src = 'sprites/bordgauche2.png';
Game.coinbgauche = new Image();
Game.coinbgauche.src = 'sprites/coinbgauche.png';
Game.coinbgauche1 = new Image();
Game.coinbgauche1.src = 'sprites/coinbgauche1.png';
Game.coinbgauche2 = new Image();
Game.coinbgauche2.src = 'sprites/coinbgauche2.png';
Game.bas = new Image();
Game.bas.src = 'sprites/bas.png';
Game.bas1 = new Image();
Game.bas1.src = 'sprites/bas1.png';
Game.bas2 = new Image();
Game.bas2.src = 'sprites/bas2.png';
Game.coinbdroit = new Image();
Game.coinbdroit.src = 'sprites/coinbdroit.png';
Game.coinbdroit1 = new Image();
Game.coinbdroit1.src = 'sprites/coinbdroit1.png';
Game.coinbdroit2 = new Image();
Game.coinbdroit2.src = 'sprites/coinbdroit2.png';
Game.borddroit = new Image();
Game.borddroit.src = 'sprites/borddroit.png';
Game.borddroit1 = new Image();
Game.borddroit1.src = 'sprites/borddroit1.png';
Game.borddroit2 = new Image();
Game.borddroit2.src = 'sprites/borddroit2.png';
Game.star = new Image();
Game.star.src = 'sprites/star.png';
Game.sun = new Image();
Game.sun.src = 'sprites/sun.png';
if (ok === 0) {
  Game.bounce = new Audio();
  Game.bounce.src = "sounds/bounce.mp3";
  Game.fin = new Audio();
  Game.fin.src = "sounds/fin.mp3";
  Game.laser = new Audio();
  Game.laser.src = "sounds/laser.mp3";
  Game.launch = new Audio();
  Game.launch.src = "sounds/launch.mp3";
  Game.lostball = new Audio();
  Game.lostball.src = "sounds/lostball.mp3";
  Game.paddleBounce = new Audio();
  Game.paddleBounce.src = "sounds/paddleBounce.mp3";
  Game.pop1 = new Audio();
  Game.pop1.src = "sounds/pop1.mp3";
  Game.pop2 = new Audio();
  Game.pop2.src = "sounds/pop2.mp3";
  Game.bonus = new Audio();
  Game.bonus.src = "sounds/bonus.mp3";
}

var pop = function() {
  if (son === 1) {
    Game.pop1.play();
    son = 0;
  } else {
    if (son === 0) {
      Game.pop2.play();
      son = 1;
    }
  }
};
