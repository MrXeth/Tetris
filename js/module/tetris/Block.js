import Tetrominos from "./Tetrominos.js";
import Utils from "./Utils.js"

/**
 * class representing a block
 * 
 * @author MrXeth
 */
export default class Block 
{
    //#region constructor

    /**
     * 
     * constructor of the block class
     * 
     * @param {number} x x coord 
     * @param {number} y y coord 
     * @param {number} block block id 
     */
    constructor(x = 5, y = 1, block = Math.floor(Math.random()*7) + 2) 
    {
        /**
         * x coord
         */
        this.x = x;
        /**
         * y coord
         */
        this.y = y;
        /**
         * the current block
         */
        this.block = Tetrominos.block(block);
        /**
         * offset of the block
         */
        this._coords = this.block.coords;
    }

    //#endregion

    //#region transformations

    /**
     * rotates the block
     * 
     * @param {number} rotation 
     */
    rotate(rotation)
    {
        if(this.block == Tetrominos.o)
        {
            return;
        }
        else if(this.block == Tetrominos.i)
        {
            if(rotation % 2 == 0)
            {
                return;
            }
            if((this._coords & 0b111) == 2)
            {
                this._coords = Utils._invertCoords((this._coords & 0x38E38) >> 3) | ((this._coords & 0x71C7) << 3);
            }
            else
            {
                this._coords = (this._coords & 0x38E38) >> 3 | (Utils._invertCoords(this._coords & 0x71C7) << 3);
            }
        }
        else
        {
            rotation = rotation < 0 ? 4 + rotation % 4 : rotation % 4;
            if(rotation == 1)
            {
                // rotate by 1: -y/x
                this._coords = Utils._invertCoords((this._coords & 0x38E38) >> 3) | ((this._coords & 0x71C7) << 3);
            }
            else if(rotation == 2)
            {
                // rotate by 2: -x/-y
                this._coords = Utils._invertCoords((this._coords & 0x38E38) >> 3) << 3 | Utils._invertCoords(this._coords & 0x71C7);
            }
            else if(rotation == 3)
            {
                // rotate by 3: y/-x 
                this._coords = (this._coords & 0x38E38) >> 3 | (Utils._invertCoords(this._coords & 0x71C7) << 3);
            }
        }
    }
    //#endregion


    //#region calculations

    /**
     * 
     * gets an offset of a block    
     * <bold>Do not use this method for the placeholder block \"none\"!</bold>
     * 
     * @param {number} num which coordinate to get. Use straight numbers for x values and odd values for y values. There are three possible x and y coordinates to get.
     * 
     * @returns {number} the specific offset
     */
    offset(num) 
    {
        let coord = this._coords >> 3 * num & 0b111; 
        return coord > 0b11 ? -((~coord & 0b11) + 1) : coord;
    }

    //#endregion
}