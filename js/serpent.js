var scorejoueur = 0;
var ok = 0;
var match;


window.onload = function() {

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
          },timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());

  var check = window.navigator.userAgent;

  if (check.indexOf('Chrome') !== -1) {
    match = check.match(/Chrome.../);
    if (parseFloat(match[0].substr(-2))<15) {
      ok = 1;
    }
  }
  if (check.indexOf('Firefox') !== -1) {
    match = check.match(/Firefox.../);
    if (parseFloat(match[0].substr(-2))<10) {
      ok = 1;
    }
  }
  if (check.indexOf('Opera') !== -1) {
    match = check.match(/Opera...../);
    if (parseFloat(match[0].substr(-4))<12) {
      ok = 1;
    }
  }
  if (check.indexOf('MSIE') !== -1) {
    match = check.match(/IE.../);
    if (parseFloat(match[0].substr(-3))<11) {
      ok = 1;
    }
  }
  if (check.indexOf('Safari') !== -1  && check.indexOf('Chrome') == -1) {
    match = check.match(/Safari.../);
    if (parseFloat(match[0].substr(-2))<83) {
      ok = 1;
    }
  }
  if (ok === 0) {
    var oldcss = $('[href="css/moncss2.css"]');
    oldcss.replaceWith('<link rel="stylesheet" href="css/moncss.css">');

    $('#color').replaceWith('<label for="color">Votre couleur</label><br><input id="color" type="color" name="color" value="#7fff00">');
    $('#background').replaceWith('<label for="color">Votre terrain</label><br><input id="background" type="color" name="color" value="#000000">');

    $('#button').click(function() {
      $('canvas').detach();
      var taille = (function() {
        if ($('#taille').val() == 1) {
          return [600, 600]
        } else {
          if ($('#taille').val() == 2) {
            return [900, 600]
          } else {
            return [1200, 600]
          }
        }
      })();

      var couleur = $('#color').val();
      var background = $('#background').val();
      var speed = parseFloat($('#speed').val());
      snakeGame = new Game(taille[0], taille[1], speed, 30, background);
      snake = new Snake([
        [5, 2],
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 2]
      ], "right", couleur);
      apple = new Apple([10, 10]);
      snakeGame.init(snake, apple);
      window.scrollTo(0, 900);
    });

    var affichage = function() {
      setInterval(function() {
        if (scorejoueur >= 5) {
          $('#div1 .oeufs').css('display', 'block');
          if (scorejoueur >= 10) {
            $('#div2 .oeufs').css('display', 'block');
            if (scorejoueur >= 15) {
              $('#div3 .oeufs').css('display', 'block');
              if (scorejoueur >= 20) {
                $('#div4 .oeufs').css('display', 'block');
                if (scorejoueur >= 25) {
                  $('#div5 .oeufs').css('display', 'block');
                  if (scorejoueur >= 30) {
                    $('#div6 .oeufs').css('display', 'block');
                    if (scorejoueur >= 35) {
                      $('#div7 .oeufs').css('display', 'block');
                      if (scorejoueur >= 40) {
                        $('#div8 .oeufs').css('display', 'block');
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          $('#div1 .oeufs').css('display', 'none');
          $('#div2 .oeufs').css('display', 'none');
          $('#div3 .oeufs').css('display', 'none');
          $('#div4 .oeufs').css('display', 'none');
          $('#div5 .oeufs').css('display', 'none');
          $('#div6 .oeufs').css('display', 'none');
          $('#div7 .oeufs').css('display', 'none');
          $('#div8 .oeufs').css('display', 'none');
        }
      }, 500);
    }

    affichage();


    $('.defildroite').on('mouseenter', function() {
      this.src = 'sprites/serpent.png';
      this.alt = 'L\' oeuf du serpent a éclos';
      $(this).next().css('transform', 'translateX(26vw)');
    }).on('mouseout', function() {
      this.src = 'sprites/oeuf.png';
      this.alt = 'Un oeuf de serpent';
      $(this).next().css('transform', 'translateX(-26vw)');
    });

    $('.defilgauche').on('mouseenter', function() {
      this.src = 'sprites/serpent.png';
      this.alt = 'L\' oeuf du serpent a éclos';
      $(this).next().css('transform', 'translateX(-27vw)');
    }).on('mouseout', function() {
      this.src = 'sprites/oeuf.png';
      this.alt = 'Un oeuf de serpent';
      $(this).next().css('transform', 'translateX(+27vw)');
    });

  }
  if (ok === 1) {
    var div1 = document.getElementById('div1');
    var newDiv1 = document.createElement("div");
    newDiv1.id = 'div1';
    newDiv1.style.display = 'none';
    newDiv1.innerHTML = '<p style="border: 2px black solid; font-weight: bold; background-color: ghostwhite; padding:10px; left: 7.5%; top: 41%">Anglais courant</p>';
    div1.parentNode.replaceChild(newDiv1, div1);

    var div2 = document.getElementById('div2');
    var newDiv2 = document.createElement("div");
    newDiv2.id = 'div2';
    newDiv2.style.display = 'none';
    newDiv2.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding: 10px; left: 87.5%;top: 39%"><span>Formation</span><br>Sciences Biomédicales<br>King\'s College</p>';
    div2.parentNode.replaceChild(newDiv2, div2);

    var div3 = document.getElementById('div3');
    var newDiv3 = document.createElement("div");
    newDiv3.id = 'div3';
    newDiv3.style.display = 'none';
    newDiv3.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px; top: 55%; left: 6.1%"><span>Expériences</span><br>4 ans<br>en conseil et vente<br>dans divers domaines</p>';
    div3.parentNode.replaceChild(newDiv3, div3);

    var div4 = document.getElementById('div4');
    var newDiv4 = document.createElement("div");
    newDiv4.id = 'div4';
    newDiv4.style.display = 'none';
    newDiv4.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px; left: 87.5%; top: 56%"><span>Formation</span><br>Développeur Full Stack<br>IFOCOP</p>';
    div4.parentNode.replaceChild(newDiv4, div4);

    var div5 = document.getElementById('div5');
    var newDiv5 = document.createElement("div");
    newDiv5.id = 'div5';
    newDiv5.style.display = 'none';
    newDiv5.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px;left: 5.6%; top: 74%"><span>Expériences</span><br>dans le socio-médical<br>et en hôtellerie-restauration</p>';
    div5.parentNode.replaceChild(newDiv5, div5);

    var div6 = document.getElementById('div6');
    var newDiv6 = document.createElement("div");
    newDiv6.id = 'div6';
    newDiv6.style.display = 'none';
    newDiv6.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px; left: 86.5%; top: 73%"><span>Compétences</span><br>HTML/CSS Javascript JQuery<br>Bootstrap Angular</p>';
    div6.parentNode.replaceChild(newDiv6, div6);

    var div7 = document.getElementById('div7');
    var newDiv7 = document.createElement("div");
    newDiv7.id = 'div7';
    newDiv7.style.display = 'none';
    newDiv7.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px; top: 90.5%"><span>Compétences</span><br>NodeJS<br>Express AJAX Meteor</p>';
    div7.parentNode.replaceChild(newDiv7, div7);

    var div8 = document.getElementById('div8');
    var newDiv8 = document.createElement("div");
    newDiv8.id = 'div8';
    newDiv8.style.display = 'none';
    newDiv8.innerHTML = '<p style="border: 2px black solid; background-color: ghostwhite; padding:10px; left: 88.3%; top: 90%"><span>Hobbies</span><br>Arts, Voyages<br>Sports, Découverte</p>';
    div8.parentNode.replaceChild(newDiv8, div8);




    document.getElementById('button').onclick = function() {
      launch = 1;
      if (document.getElementById('canvas')) {
        var oldgame = document.getElementById('canvas');
        oldgame.parentNode.removeChild(oldgame);
      }
      var taille = (function() {
        if (document.getElementById('taille').value == 1) {
          return [600, 600]
        } else {
          if (document.getElementById('taille').value == 2) {
            return [900, 600]
          } else {
            return [1200, 600]
          }
        }
      })();

      var couleur = document.getElementById('color').value;
      var background = document.getElementById('background').value;
      var speed = parseFloat(document.getElementById('speed').value);
      snakeGame = new Game(taille[0], taille[1], speed, 30, background);
      snake = new Snake([
        [5, 2],
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 2]
      ], "right", couleur);
      apple = new Apple([10, 10]);
      snakeGame.init(snake, apple);
      window.scrollTo(0, 900);



      var affichage = (function() {
        setInterval(function() {
          if (scorejoueur >= 5) {
            newDiv1.style.display = 'block';
            if (scorejoueur >= 10) {
              newDiv2.style.display = 'block';
              if (scorejoueur >= 15) {
                newDiv3.style.display = 'block';
                if (scorejoueur >= 20) {
                  newDiv4.style.display = 'block';
                  if (scorejoueur >= 25) {
                    newDiv5.style.display = 'block';
                    if (scorejoueur >= 30) {
                      newDiv6.style.display = 'block';
                      if (scorejoueur >= 35) {
                        newDiv7.style.display = 'block';
                        if (scorejoueur >= 40) {
                          newDiv8.style.display = 'block';
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          else {
            newDiv1.style.display = 'none';
            newDiv2.style.display = 'none';
            newDiv3.style.display = 'none';
            newDiv4.style.display = 'none';
            newDiv5.style.display = 'none';
            newDiv6.style.display = 'none';
            newDiv7.style.display = 'none';
            newDiv8.style.display = 'none';
          }
        }, 500);
      })();

    };
  }
};



var Game = function(width, height, fps, blocksize, background) {

  this.canvas = document.createElement('canvas');
  this.canvas.id = 'canvas';
  this.canvas.width = width;
  this.canvas.height = height;
  this.canvas.style.border = '10px solid red';
  this.canvas.style.display = 'block';
  this.canvas.style.margin = '20px auto';
  document.body.appendChild(this.canvas);
  this.ctx = this.canvas.getContext('2d');
  this.canvas.style.backgroundColor = background;


  this.gridWidth = width / blocksize;
  this.gridHeight = height / blocksize;
  this.snake;
  this.apple;
  this.initial = fps;
  this.speed = fps;
  this.score = 0;
  this.blocksize = blocksize;
  var thisgame = this;
  var currentTime = new Date();
  var directTime;
  var timer;

  document.onkeydown = function handleKeyDown(e) {
    e.preventDefault();
    var newDirection;
    switch (e.keyCode) {
      case 37:
        var directTime = new Date();
        if ((directTime - currentTime) > (1000 / thisgame.speed)) {
          newDirection = "left";
          currentTime = new Date();
        }
        break;
      case 38:
        var directTime = new Date();
        if ((directTime - currentTime) > (1000 / thisgame.speed)) {
          newDirection = "up";
          currentTime = new Date();
        }
        break;
      case 39:
        var directTime = new Date();
        if ((directTime - currentTime) > (1000 / thisgame.speed)) {
          newDirection = "right";
          currentTime = new Date();
        }
        break;
      case 40:
        var directTime = new Date();
        if ((directTime - currentTime) > (1000 / thisgame.speed)) {
          newDirection = "down";
          currentTime = new Date();
        }
        break;
      case 32:
        var couleur = $('#color').val();
        snake = new Snake([
          [5, 2],
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 2]
        ], "right", couleur);
        apple = new Apple([10, 10]);
        snakeGame.canvas.style.backgroundColor = $('#background').val();
        snakeGame.initial = parseFloat($('#speed').val());
        snakeGame.init(snake, apple);
        return;
      default:
        return;
    };
    snakeGame.snake.setDirection(newDirection);
  };

  this.init = function(snake, apple) {
    if (timer) {
      clearTimeout(timer);
    }
    this.snake = snake;
    this.apple = apple;
    this.score = 0;
    this.speed = this.initial;
    scorejoueur = 0;
    requestAnimationFrame(refreshCanvas);
  };

  var refreshCanvas = function() {
    thisgame.snake.advance();
    if (thisgame.checkCollision()) {
      thisgame.gameOver();
    } else {
      if (thisgame.snake.isEatingApple(thisgame.apple)) {
        if (thisgame.initial == 15) {
          thisgame.score += 2;
          scorejoueur += 2;
        } else {
          if (thisgame.initial == 25) {
            thisgame.score += 3;
            scorejoueur += 3;
          } else {
            thisgame.score++;
            scorejoueur++;
          }
        }
        if (thisgame.initial !== 15 || thisgame.initial !== 25) {
          thisgame.speed += 0.2;
        }
        thisgame.snake.ateApple = true;
        do {
          thisgame.apple.setNewPosition(thisgame.gridWidth, thisgame.gridHeight);
        }
        while (thisgame.apple.isOnSnake(thisgame.snake))
      }
      thisgame.ctx.clearRect(0, 0, thisgame.canvas.width, thisgame.canvas.height);
      thisgame.drawScore();
      thisgame.snake.draw(thisgame.ctx, thisgame.blocksize);
      thisgame.apple.draw(thisgame.ctx, thisgame.blocksize);
      timer = setTimeout(function() {
        requestAnimationFrame(refreshCanvas);
      }, 1000 / thisgame.speed);
    }

  };


  this.checkCollision = function() {
    var wallCollision = false;
    var snakeCollision = false;
    var head = this.snake.body[0];
    var rest = this.snake.body.slice(1);
    var snakeX = head[0];
    var snakeY = head[1];
    var minX = 0;
    var minY = 0;
    var maxX = this.gridWidth - 1;
    var maxY = this.gridHeight - 1;
    var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
    var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

    if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
      wallCollision = true;
    }

    for (var i = 0; i < rest.length; i++) {
      if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
        snakeCollision = true;
      }
    }
    return wallCollision || snakeCollision;
  };

  this.gameOver = function() {
    this.ctx.save();
    this.ctx.font = "bold 70px sans-serif";
    this.ctx.fillStyle = "#000";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    var centreX = this.canvas.width / 2;
    var centreY = this.canvas.height / 2;
    this.ctx.strokeText("Game Over", centreX, centreY - 180);
    this.ctx.fillText("Game Over", centreX, centreY - 180);
    this.ctx.font = "bold 20px sans-serif";
    this.ctx.strokeText("Appuyez sur la touche Espace pour rejouer", centreX, centreY - 120);
    this.ctx.fillText("Appuyez sur la touche Espace pour rejouer", centreX, centreY - 120);
    this.ctx.restore();
  };

  this.drawScore = function() {
    this.ctx.save();
    this.ctx.font = "bold 20px sans-serif";
    this.ctx.fillStyle = "grey";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.strokeStyle = "Chartreuse";
    this.ctx.lineWidth = 0.4;
    var placeX = this.canvas.width - 80;
    var placeY = 18;
    this.ctx.fillText('Votre score : ' + this.score.toString(), placeX, placeY);
    this.ctx.strokeText('Votre score : ' + this.score.toString(), placeX, placeY);
    this.ctx.restore();
  };

};

function Snake(body, direction, color) {
  this.body = body;
  this.color = color;
  this.direction = direction;
  this.ateApple = false;
  this.draw = function(ctx, blocksize) {
    ctx.save();
    ctx.fillStyle = this.color;
    for (var i = 0; i < this.body.length; i++) {
      var x = this.body[i][0] * blocksize;
      var y = this.body[i][1] * blocksize;
      ctx.fillRect(x, y, blocksize, blocksize);
    }
    ctx.restore();
  };
  this.advance = function() {
    var nextPosition = this.body[0].slice();
    switch (this.direction) {
      case "left":
        nextPosition[0] -= 1;
        break;
      case "right":
        nextPosition[0] += 1;
        break;
      case "down":
        nextPosition[1] += 1;
        break;
      case "up":
        nextPosition[1] -= 1;
        break;
      default:
        throw ("Invalid Direction");
    };
    this.body.unshift(nextPosition);
    if (!this.ateApple)
      this.body.pop();
    else
      this.ateApple = false;
  };
  this.setDirection = function(newDirection) {
    var allowedDirections;
    switch (this.direction) {
      case "left":
      case "right":
        allowedDirections = ["up", "down"];
        break;
      case "down":
      case "up":
        allowedDirections = ["left", "right"];
        break;
      default:
        throw ("Invalid Direction");
    };
    if (allowedDirections.indexOf(newDirection) > -1) {
      this.direction = newDirection;
    }
  };

  this.isEatingApple = function(appleToEat) {
    var head = this.body[0];
    if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
      return true;
    else
      return false;
  };

};


function Apple(position) {
  this.position = position;
  this.draw = function(ctx, blocksize) {
    ctx.save();
    ctx.fillStyle = "ForestGreen";
    ctx.beginPath();
    var radius = blocksize / 2;
    var x = this.position[0] * blocksize + radius;
    var y = this.position[1] * blocksize + radius;
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

  };
  this.setNewPosition = function(gridWidth, gridHeight) {
    var newX = Math.round(Math.random() * (gridWidth - 1));
    var newY = Math.round(Math.random() * (gridHeight - 1));
    this.position = [newX, newY];
  };
  this.isOnSnake = function(snakeToCheck) {
    var isOnSnake = false;

    for (var i = 0; i < snakeToCheck.body.length; i++) {
      if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
        isOnSnake = true;
      }
    }
    return isOnSnake;
  };

};
