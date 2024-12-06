export default class grid {

    /** 
     * The `default.draw` static method takes single `Object` as its input whose properties are as follows:
     * @param {HTMLCanvasElement} canvas - a reference to the `canvas` instance
     * @param {Object} options - options you have passed to shape current `context` of the `canvas`
     * @returns {Object} The `options`
    */
    static draw({canvas, options}){

        let 
            gridcellDim = stage.grid.GRIDCELL_DIM
            ,
            gridcellMatrix = setInterval(0, gridcellDim, canvas.width)
            ;

        const context = canvas.getContext('2d');
            context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        
        /** {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations} */
        function drawGrid(x, y, xLen = gridcellDim, yLen = gridcellDim) {

            context.beginPath();
            context.rect(x, y, xLen, yLen);
            context.kind = options.kind || 'grid';
            context.lineWidth = options.lineWidth || context.global.options.lineWidth;
            context.strokeStyle = options.strokeStyle || context.global.options.strokeStyle;
            context.stroke();

        }

        const divisorY = Math.ceil( ( context.canvas.clientHeight / gridcellDim ) );
        ;[...new Array(divisorY)].map((v, row)=>{

            return v = 1+row;

        }).forEach((row)=>{

            gridcellMatrix.forEach((_, col)=>{

                if(row === 1/* if it's very 1st row, see cont'd... */){

                    drawGrid(gridcellDim * col, 0); /* [cont'd] ...fill the row */

                }

                drawGrid(gridcellDim * col, gridcellDim*row);
            
            })
        

        });

        return options;
    
    }

}

/**
 * @param {Number} start              - range lower bound
 * @param {Number} step               - range step
 * @param {Number} end                - range upper bound
 * @param {Boolean} [isIncluded=true] - `isIncluded === true ? [start:end] : [start:end)`, where `[]` denotes "closed", and `()` "open" interval a.k.a. range
 * @param {Array} [skip=Array]        - let's say you need dashed polygon
 * @returns {Array}                     one-dimensional array (range)
 */
function setInterval(start, step, end, isIncluded=true, skip = []){
    
    const range = [];
    
    loop1: for (start; start < end + isIncluded; start += step) {

        loop2: for (let items of skip) {

            if (items == start) {

                continue loop1;

            }

        }

        range.push(start)

    }

    return range;

}