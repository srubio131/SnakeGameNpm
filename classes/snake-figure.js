import { ACTIVATED_LOG } from './core/constants'

export class snakeFigure {
    constructor(ctx, initialPos, unit, color) {
        this.ctx = ctx
        this.body = [{ x: initialPos.x || 0, y: initialPos.y || 0 }]
        this.width = unit
        this.height = unit
        this.color = color
        this.speedX = 0
        this.speedY = 0
        this.direction = Direction.RIGHT
        this.update()
    }
  
    update = () => {
      this.ctx.fillStyle = this.color
      /*for(let pos of this.body) {
        this.ctx.fillRect(pos.x, pos.y, this.width, this.height)
      }*/
      // Added head is enough
      this.ctx.fillRect(this.body[0].x, this.body[0].y, this.width, this.height)
    }
  
    move = (direction, isSnakeGrow) => {
        const latestX = this.body[0].x
        const latestY = this.body[0].y
        let newPos = {}
        
        this.clear()
        switch(direction) {
            case Direction.UP:
                newPos = { x: latestX, y: (latestY - this.speedY) }
                break
            case Direction.RIGHT:
                newPos = { x: (latestX + this.speedX), y: latestY }
                break
            case Direction.DOWN:
                newPos = { x: latestX, y: (latestY + this.speedY) }
                break
            case Direction.LEFT:
                newPos = { x: (latestX - this.speedX), y: latestY }
                break
        }
      
        if (!isSnakeGrow) {
          // Remove tail
          this.body.pop()
        }
        this.body.unshift(newPos)
      
        printLog(ACTIVATED_LOG, 'Me muevo: x('+this.body[0].x+'), y('+this.body[0].y+')')
        this.update()
    }
  
    pause = () => {
        this.speedX = 0
        this.speedY = 0
    }
    
    clear = () => {
      /*for(let pos of this.body) {
        this.ctx.clearRect(pos.x, pos.y, this.width, this.height)
      }*/
      // Delete tail is enough
      this.ctx.clearRect(this.body[this.body.length-1].x, this.body[this.body.length-1].y, this.width, this.height)
    }
  
    isMoving = () => {
        return !!(this.speedX || this.speedY)
    }
  
    isPosInsideSnake = (x, y) => {
      let isInside = false
      for(let pos of this.body) {
        if (pos.x === x && pos.y === y) {
          isInside = true
          break
        }
      }
      return isInside
    }
  
  }