import { figure } from './classes/figure'
import { snakeFigure } from './classes/snakeFigure'

import { ACTIVATED_LOG } from './core/constants'
import { printLog, generateRandomNumber } from './core/utils'


export default snakeGame = (() => {    
  const width = 500
  const height = 300
  const unit = 10
  let canvas = null
  let context = null
  let interval = null
  let fruit = null
  let snake = null
  
  _start = () => {
    canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    context = canvas.getContext("2d")
    document.querySelector('.dashboard').appendChild(canvas)
    
    // Create figures
    snake = new snakeFigure(context, { x: generateRandomNumber(width, 0, unit), y: generateRandomNumber(height, 0, unit) }, unit, 'black')
    fruit = _createRandomFigure('red')
    
    // Init events
    // window.addEventListener('resize', _onResize, false);
    _moveStopStart()
  }
  
  _createRandomFigure = (color) => {
    let randomX = 0
    let randomY = 0

    do {
      randomX = generateRandomNumber(width, 0, unit)
      randomY = generateRandomNumber(height, 0, unit)
    } while (snake.isPosInsideSnake(randomX, randomY))

    return new figure(context, unit, unit, color, randomX, randomY)
  }

  _moveStopStart = () => {
      if (snake.isMoving()) {
          snake.pause()
          clearInterval(interval)
      } else {
          snake.speedX = unit
          snake.speedY = unit
          interval = setInterval("_updateGameArea()", Velocity.FAST);
      }
  }
  
  /*_onResize = () => {
    canvas.width = snowContainer.clientWidth;
    canvas.height = snowContainer.clientHeight;
    //context.fillStyle = '#FFF';
    //requestAnimFrame(update);
  }*/

  _nextMoveCausesCollision = (snake, fruit) => {
      let wallCollision = false;
      let fruitCollision = false;
      let snakeCollision = false;

      const snakeX = snake.body[0].x
      const snakeY = snake.body[0].y
      switch(snake.direction) {
          case Direction.UP:
              const nextUpMove = snakeY - snake.speedY
              wallCollision  = nextUpMove < 0
              fruitCollision = fruit.y === nextUpMove && fruit.x === snakeX
              snakeCollision = snake.isPosInsideSnake(snakeX, nextUpMove)
              break
          case Direction.RIGHT:
              const nextRightMove = snakeX + snake.speedX
              wallCollision = nextRightMove >= canvas.width
              fruitCollision = fruit.x === nextRightMove && fruit.y === snakeY
              snakeCollision = snake.isPosInsideSnake(nextRightMove, snakeY)
              break
          case Direction.DOWN:
              const nextDownMove = snakeY + snake.speedY
              wallCollision = nextDownMove >= canvas.height
              fruitCollision = fruit.y === nextDownMove && fruit.x === snakeX
              snakeCollision = snake.isPosInsideSnake(snakeX, nextDownMove)
              break
          case Direction.LEFT:
              const nextLeftMove = snakeX - snake.speedX
              wallCollision = nextLeftMove < 0
              fruitCollision = fruit.x === nextLeftMove && fruit.y === snakeY
              snakeCollision = snake.isPosInsideSnake(nextLeftMove, snakeY)
              break
      }
      return {
          wallCollision,
          fruitCollision,
          snakeCollision
      }
  }
  
  _updateGameArea = () => {
      // Move snake
      const collision = _nextMoveCausesCollision(snake, fruit)
      if (collision.wallCollision) {
        printLog(ACTIVATED_LOG, 'Te has chocado contra la pared')
        _moveStopStart()
      } else if (collision.snakeCollision) {
        printLog(ACTIVATED_LOG, 'Te has chocado contra el cuerpo de la serpiente')
        _moveStopStart()
      } else {
          if (collision.fruitCollision) {
            printLog(ACTIVATED_LOG, 'Te has comido la fruta!!')
            // Create new fruit
            fruit = _createRandomFigure('red')
          }
          snake.move(snake.direction, collision.fruitCollision)
    }
  }
    
  return {
    start: _start,
    moveStopStart: _moveStopStart,
    moveSnake: (direction) => {
      if (
        (snake.direction === Direction.LEFT && direction === Direction.RIGHT) ||
        (snake.direction === Direction.RIGHT && direction === Direction.LEFT) ||
        (snake.direction === Direction.UP && direction === Direction.DOWN) ||
        (snake.direction === Direction.DOWN && direction === Direction.UP)
      ) {
      } else {
        snake.direction = direction
      }
    }
  }
})()
