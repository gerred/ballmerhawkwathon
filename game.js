/*jshint asi:true, laxcomma: true*/

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60)
  }
})()

function Paddle(x,y,actor) {
  this.x = x
  this.y = y
  this.speed = 10
  this.actor = actor
  var _this = this


  this.actor.on('up', function() {
    _this.y = _this.y - _this.speed
  })

  this.actor.on('down', function() {
    _this.y = _this.y + _this.speed
  })
}

Paddle.prototype.draw = function(ctx) {
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.fillRect(this.x, this.y, this.x+10, this.y+85)
  ctx.restore()
}

function Ball(x,y) {
  this.x = x
  this.y = y
}

Ball.prototype.update = function() {
}

Ball.prototype.draw = function(ctx) {
  ctx.save()
  ctx.arc(this.x, this.y, 10, 0, Math.PI*2, false)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.restore()

}

function Game() {
  this.objects = []
}

Game.prototype.update = function() {
}

Game.prototype.draw = function(ctx) {
  ctx.save()
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.restore()
  this.objects.forEach(function(obj) { return obj.draw(ctx) })
}

function Player(keys) {
  this.setupEvents(keys)
}

Player.prototype.setupEvents = function(keys) {
  var _this = this
  keypress.combo(keys.up, function() {
    _this.trigger('up')
  })

  keypress.combo(keys.down, function() {
    _this.trigger('down')
  })
}

Player.inherit(EventEmitter)

$(function() {
  var canvas = document.querySelector("#canvas")
  var ctx = canvas.getContext('2d')
  var game = new Game()
  var player = new Player({up: "w", down: "s"})
  var player2 = new Player({up: "i", down: "k"})
  var paddle = new Paddle(10, 50, player)
  var paddle2 = new Paddle(canvas.width-50, 50, player2)
  game.objects.push(paddle, paddle2, new Ball(canvas.width/2, canvas.height/2))

  var run = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    game.draw(ctx)
    requestAnimFrame(run)
  }
  run()

  $('.js-search-background').on('blur', function(e) {
    $('.search-term').html($(this).val())
  })
})
