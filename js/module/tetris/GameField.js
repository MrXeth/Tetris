import Tetrominos from "./Tetrominos.js";
import Block from "./Block.js";

/**
 * the game field
 * 
 * @author MrXeth
 */
export default class GameField 
{

    /**
     * constructor
     */
    constructor() 
    {
        /**
         * the game field
         */
        this.field = new Array(21);
        for (let i = 0; i < this.height; i++) 
        {
            this.field[i] = new Array(10);
            this.field[i].fill(Tetrominos.none.color);
        }
        /**
         * the current block
         */
        this.block = new Block();
        /**
         * The next block
         */
        this.nextBlock = new Block();
        /**
         * the ghost y position
         */
        this.ghostYPos = 0;
        this._calcGhostPosition();
        /**
         * the current score
         */
        this._score = 0;
        /**
         * the current removed lines
         */
        this._lines = 0;
    }

    /**
     * the number of removed lines
     */
    get lines()
    {
        return this._lines;
    }

    set lines(val)
    {
        document.getElementById("level").innerHTML = `level: ${this.level}`;
        this._lines = val;
    }

    /**
     * the current score
     */
    get score()
    {
        return this._score;
    }

    set score(val)
    {
        document.getElementById("score").innerHTML = `score: ${val}`;
        this._score = val;
    }

    /**
     * the width of the gamefield
     */
    get width() 
    {
        return this.field[0].length;
    }

    /**
     * the height of the gamefield
     */
    get height() 
    {
        return this.field.length;
    }

    /**
     * the current level
     */
    get level() 
    {
        return (this._lines / 10).toFixed(0);
    }

    /**
     * drops the block
     */
    drop() 
    {
        this.score = this.score +  this.ghostYPos - this.block.y;
        this.block.y = this.ghostYPos;
        this.place();
    }
    /**
     * places the block at it's position and adds a new block to the game
     */
    place() 
    {
        let xC = this.block.x;
        let yC = this.block.y;
        this.field[yC][xC] = this.block.block.color;
        for (let i = 0; i < 6; i++)
        {
            yC = this.block.y + this.block.offset(i);
            xC = this.block.x + this.block.offset(++i);
            this.field[yC][xC] = this.block.block.color;
        }
        this.removeFullRows();
        this.block = this.nextBlock;
        this.nextBlock = new Block();
        this._calcGhostPosition();
    }

    /**
     * checks wether the block can be moved by a desired offset
     * 
     * @param {number} x x offset
     * @param {number} y y offset
     * 
     * @returns {boolean} if the object can move by the desired offset
     */
    _checkMove(x, y) 
    {
        if (this.block.x + x >= 0 && this.block.x + x < this.width && this.block.y + y >= 0 && this.block.y + y < this.height && this.field[this.block.y + y][this.block.x + x] == Tetrominos.none.color) 
        {
            for (let i = 0; i < 6; i++)
            {
                let yC = this.block.y + y + this.block.offset(i);
                let xC = this.block.x + x + this.block.offset(++i);
                if (xC < 0 || xC >= this.width || yC < 0 || yC >= this.height || this.field[yC][xC] != Tetrominos.none.color)
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * moves the block
     * 
     * @param {number} x x offset
     * @param {number} y y offset
     * 
     * @returns {boolean} wether the move worked
     */
    move(x, y)
    {
        if (this._checkMove(x, y))
        {
            this.block.x += x;
            this.block.y += y;
            this._calcGhostPosition();
            return true;
        }
        return false;
    }

    /**
     * tries to rotate the block by <code>rotation * 90°</code>
     * 
     * @param {number} rotation rotation
     * 
     * @returns {boolean} if the rotation worked
     */
    rotate(rotation) 
    {
        this.block.rotate(rotation);
        if (this._checkMove(0, 0)) 
        {
            this._calcGhostPosition();
            return true;
        }
        else
        {
            this.block.rotate(-rotation);
            return false;
        }
    }

    /**
     * removes the full rows
     */
    removeFullRows() 
    {
        //#region calc possible rows
        let upperBound = 0;
        let lowerBound = 0;
        for(let i = 0; i < 6; i += 2) // just y vals needed
        {
            let yO = this.block.offset(i);
            if(yO > upperBound)
            {
                upperBound = yO;
            }
            else if(yO < lowerBound)
            {
                lowerBound = yO;
            }
        }
        upperBound += this.block.y;
        lowerBound += this.block.y;
        //#endregion

        //#region search full rows
        let removeRows = [];
        for(let i = lowerBound; i <= upperBound; i++)
        {
            // detect row
            let deleteRow = true;
            for(let j = 0; j < this.width; j++)
            {
                if(this.field[i][j] == Tetrominos.none.color)
                {
                    deleteRow = false;
                    break;
                }
            }
            if(deleteRow)
            {
                removeRows.unshift(i);
            }
        }
        //#endregion

        //#region remove rows
        if(removeRows.length > 0)
        {
            let rows = [];
            rows.push(this.field[removeRows[0]]);
            for(let i = removeRows[0] - 1, shift = 1; i >= 0; i--)
            {
                if(shift < removeRows.length && i == removeRows[shift])
                {
                    rows.push(this.field[i]);
                    shift++;
                }
                else
                {
                    this.field[i + shift] = this.field[i];
                }
            }
            for(let i = 0; i < removeRows.length; i++)
            {
                this.field[i] = rows.shift().fill(Tetrominos.none.color);
            }
            this.lines += removeRows.length;
            this._calcScore(removeRows.length);
        }
        //#endregion
    }

    _calcScore(rows) {
        switch(rows)
        {
            case 1:
                this.score += 40 * (this.level + 1);
                break;
            case 2:
                this.score += 100 * (this.level + 1);
                break;
            case 3:
                this.score += 1200 * (this.level + 1);
                break;
        }
    }

    /**
     * resets the game field
     */
    reset()
    {
        this.field.forEach(e => e.fill(Tetrominos.none.color));  
    }


    /**
     * calculates the ghost block position
     */
    _calcGhostPosition()
    {
        let upperBound = 0;
        let lowerBound = 0;
        for(let i = 1; i < 6; i += 2)
        {
            let xO = this.block.offset(i);
            if(xO > upperBound)
            {
                upperBound = xO;
            }
            else if(xO < lowerBound)
            {
                lowerBound = xO;
            }
        }
        lowerBound += this.block.x;
        upperBound += this.block.x;
        let ghostYPos = this.height - 1;
        for(let i = lowerBound; i <= upperBound; i++)
        {
            let maxYO = i == this.block.x ? 0 : -1; // because block.x is not in offset
            for(let j = 0; j < 6; j++)
            {
                let yO = this.block.offset(j);
                let xO = this.block.offset(++j);
                if(i - this.block.x == xO && yO > maxYO)
                {
                    maxYO = yO;
                }
            }
            let maxY = this.block.y;
            while(maxY + maxYO + 1 < this.height && this.field[maxY + maxYO + 1][i] == Tetrominos.none.color)
            {
                maxY++;
            }
            if(ghostYPos > maxY)
            {
                ghostYPos = maxY;
            }
        }
        this.ghostYPos = ghostYPos;
    }
}