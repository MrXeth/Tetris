import GameField from "./GameField.js";
import Utils from "./Utils.js";
import Tetrominos from "./Tetrominos.js";

/**
 * main class
 * 
 * @author MrXeth
 */
class Main {

    /**
     * constructor
     */
    constructor()
    {
        /**
         * the gamefield
         */
        this._gameField = new GameField();
        /**
         * the canvas
         */
        this._canvas = document.getElementById("gamefield");
        let none = Utils.convertToHexColorString(Tetrominos.none.color);
        this._canvas.style.backgroundColor = none;

        this._nextBlock = document.getElementById("next_block")
        this._nextBlock.style.backgroundColor = none;

        this._resizeListener();
        this._register();
        this._repaint();
        this._run();
    }

    /**
     * gets the frames per gridcell
     * 
     * @param {number} level current level
     * 
     * @returns {number} frames per gridcell
     */
    _getFramesPerGridcell(level)
    {
        if(level == 0)
        {
            return 48;
        }
        else if(level == 1)
        {
            return 43;
        }
        else if(level == 2)
        {
            return 38;
        }
        else if(level == 3)
        {
            return 33;
        }
        else if(level == 4)
        {
            return 28;
        }
        else if(level == 5)
        {
            return 23;
        }
        else if(level == 6)
        {
            return 18;
        }
        else if(level == 7)
        {
            return 13;
        }
        else if(level == 8)
        {
            return 8;
        }
        else if(level == 9)
        {
            return 6;
        }
        else if(level >= 10 && level <= 12)
        {
            return 5;
        }
        else if(level >= 13 && level <= 15)
        {
            return 4;
        }
        else if(level >= 16 && level <= 18)
        {
            return 3;
        }
        else if(level >= 19 && level <= 28)
        {
            return 2;
        }
        else
        {
            return 1;
        }
    }

    /**
     * function to run the game
     */
    async _run() 
    {
        while(this._gameField._checkMove(0,0))
        {
            if(!this._gameField.move(0,1))
            {
                this._gameField.place();
            }
            this._repaint();
            await new Promise(resolve => setTimeout(resolve, 50/3 * this._getFramesPerGridcell(this._gameField.level)));
        }
        document.getElementById("score_form").value = this._gameField.score;
        document.getElementById("score_input").style.display = "block";
        window.removeEventListener("keydown", this);
    }

    /**
     * implements the event handler
     * 
     * @param {Event} evt fired event to handle
     */
    handleEvent(evt) 
    {
        // if event was cancelled before
        if(evt.defaultPrevented)
        {
            return;
        }
        switch(evt.type) 
        {
            case "resize":
                this._resizeListener();
                break;
            case "keydown":
                this._keyListener(evt);
                break;
        }
    }

    /**
     * registers the needed events
     */
    _register() 
    {
        window.addEventListener("keydown", this);
        window.addEventListener("resize", this);
    }


    /**
     * listens for a resize event and updates the canvas size
     */
    _resizeListener() {
        let dim = Utils.calcGameFieldDimensions(this._gameField.width, this._gameField.height - 1);
        this._canvas.width = dim.width;
        this._canvas.height = dim.height;
        this._nextBlock.height = dim.width * 3 / this._gameField.width;
        this._nextBlock.width = dim.height * 3 / (this._gameField.height - 1);
        this._repaint();
    }

    /**
     * listens to the keys needed by the game
     * 
     * @param {Event} evt event
     */
    _keyListener(evt) 
    {
        if(!this._gameField._checkMove(0,0))
        {
            return;
        }
        switch(evt.key) 
        {
            case "ArrowLeft":
                if(this._gameField.move(-1, 0))
                {
                    this._repaint();
                }
                break;
            case "ArrowRight":
                if(this._gameField.move(1,0))
                {
                    this._repaint();
                }
                break;
            case "ArrowDown":
                if(this._gameField.move(0,1))
                {
                    this._gameField.score += 1;
                }
                else
                {
                    this._gameField.place();
                }
                this._repaint();
                break;
            case " ":
                this._gameField.drop();
                this._repaint();
                break;
            case "x":
            case "X":
                if(this._gameField.rotate(1)) 
                {
                    this._repaint();
                }
                break;
            case "z":
            case "Z":
                if(this._gameField.rotate(-1)) 
                {
                    this._repaint();
                }
                break;
        }
        evt.preventDefault(); // disable scrolling
    }

    /**
     * paints the game field to the canvas
     * */
    _repaint()
    {
        //#region paint field
        let context = this._canvas.getContext("2d");
        context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        let width = Math.round(this._canvas.width / this._gameField.width);
        for (let i = 0; i < this._gameField.width; i++)
        {
            for (let j = 1; j < this._gameField.height; j++)
            {
                if (this._gameField.field[j][i] != Tetrominos.none.color)
                {
                    context.fillStyle = Utils.convertToHexColorString(this._gameField.field[j][i]);
                    context.fillRect(i * width, (j-1) * width, width, width);
                }
            }
        }
        //#endregion

        //#region paint current block and ghost block
        let blockColor = Utils.convertToHexColorString(this._gameField.block.block.color);
        let ghostColor = Utils.convertToHexColorString(Tetrominos.ghost.color);
        if(this._gameField.block.y != 0)
        {
            context.fillStyle = blockColor;
            context.fillRect(this._gameField.block.x * width, (this._gameField.block.y - 1) * width, width, width);
        }
        if(this._gameField.ghostYPos != 0 && !this._ghostIntersects(this._gameField.block.x, this._gameField.ghostYPos))
        {
            context.fillStyle = ghostColor;
            context.fillRect(this._gameField.block.x * width, (this._gameField.ghostYPos - 1) * width, width, width);
        }
        for(let i = 0; i < 6; i++)
        {
            let y = this._gameField.block.offset(i++) + this._gameField.block.y;
            let x = this._gameField.block.offset(i) + this._gameField.block.x;
            if(y != -1)
            {
                context.fillStyle = blockColor;
                context.fillRect(x * width, (y-1) * width, width, width);
            }
            let gY = y - this._gameField.block.y + this._gameField.ghostYPos;
            if(gY != -1 && !this._ghostIntersects(x, gY))
            {
                context.fillStyle = ghostColor;
                context.fillRect(x * width, (gY-1) * width, width, width);
            }
        }
        //#endregion

        context = this._nextBlock.getContext("2d");
        context.clearRect(0, 0, this._nextBlock.height, this._nextBlock.width);
        context.fillStyle = Utils.convertToHexColorString(this._gameField.nextBlock.block.color);
        context.fillRect(width, width, width, width);
        for(let i = 0; i < 6; i++)
        {
            let y = this._gameField.nextBlock.offset(i++) + 1;
            let x = this._gameField.nextBlock.offset(i) + 1;
            context.fillRect(x * width, y * width, width, width);
        }
    }

    /**
     * tests wether the ghost block intersects with a real block
     * 
     * @param {number} x ghost x 
     * @param {number} y ghost y
     * 
     * @return {boolean} if the ghost block instersects with a real block
     */
    _ghostIntersects(x, y) 
    {
        if(this._gameField.block.y == y)
        {
            return true;
        }
        for(let i = 0; i < 6; i++)
        {
            let bY = this._gameField.block.offset(i++) + this._gameField.block.y;
            let bX = this._gameField.block.offset(i) + this._gameField.block.x;
            if(bY == y && bX == x)
            {
                return true;
            }
        }
        return false;
    }
}
// start tetris
window.addEventListener("resize", new Main());