/**
 * class to store all blocks and their possible offsets
 * 
 * @author MrXeth
 */
export default class Tetrominos 
{

    //#region all blocks

    static none = {
        color: 0x0
    }

    static ghost = {
        color: 0x808B96 
    }

    static i = {
        color: 0x85C1E9, 
        coords: 0x7042
    }

    static j = {
        color: 0x0016FC,
        coords: 0x7E41
    }

    static l = {
        color: 0xBA4A00,
        coords: 0x7049
    }

    static o = {
        color: 0xF1C40F,
        coords: 0x3F1F8
    }

    static s = {
        color: 0x00FC25 ,
        coords: 0x8E41
    }

    static t = {
        color: 0x6C3483,
        coords: 0x7E08
    }

    static z = {
        color: 0xFC0000,
        coords: 0x38049
    }

    //#endregion

    //#region get method

    /**
     * 
     * returns the specific block to an id
     * 
     * @param {number} id id of the block 
     * 
     * @returns {*} the block
     */
    static block(id) 
    {
        switch (id) 
        {
            case 0: return this.none;
            case 1: return this.ghost;
            case 2: return this.i;
            case 3: return this.j;
            case 4: return this.l;
            case 5: return this.o;
            case 6: return this.s;
            case 7: return this.t;
            case 8: return this.z;
        }
    }
    //#endregion
}