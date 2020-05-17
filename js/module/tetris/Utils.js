/**
 * collection of helper functions
 * 
 * @author MrXeth
 */
export default class Utils 
{
    /**
     * calculates the game field dimensions
     * 
     * @param {number} width width of game field
     * @param {number} height height of game field
     * 
     * @returns {*} dimension object including <code>height</code> and <code>width</code>
     */
    static calcGameFieldDimensions(width, height) 
    {
        let canvas = document.getElementById("gamefield").parentElement;
        let portionalHeight = canvas.offsetHeight * width / height;
        // hight normalized to height and width parameters
        if (portionalHeight > canvas.offsetWidth) 
        {
            let dim =
            {
                width: canvas.offsetWidth,
                height: canvas.offsetWidth * height / width
            }
            return dim;
        }
        else
        {
            let dim =
            {
                width: portionalHeight,
                height: canvas.offsetHeight
            }
            return dim;
        }
    }

    /**
     * converts a number to a hexadecimal color string
     * 
     * @param {number} num number to convert
     * 
     * @returns {string} hex color string
     */
    static convertToHexColorString(num)
    {
        let str = num.toString(16).toUpperCase();
        while (str.length != 6)
        {
            str = "0" + str;
        }
        return "#" + str;
    }

    
    /**
     * inverts the signs of the coordinates of one dimension (x or y ) in the bit storage format
     * 
     * The coords to invert have to be at the 1st three digits of each coord section
     * Example: <code>000111 000111 000111</code> => <code>000001 000001 000001</code>
     * 
     * @param {number} coords the coords
     * 
     * @returns {number} coords with inverted signs
     */
    static _invertCoords(coords)
    {
        for(let i = 0x7; i < 0x40000; i <<= 6)
        {
            let shift = Math.log2(i) - 2;
            let val = (coords & i) >> shift;
            val = (((~val & 0b111) + 1) & 0b111) << shift;
            coords = ~i & coords | val;
        }
        return coords;
    }
}