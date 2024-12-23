export default class {

    static RIGHTANGLE_SLOPE = (1 / Math.sin(Math.PI / 4));

    static ENUMS = {
        COLORS: {
            red(){},
            green(){},
            blue(){},
        }
        ,
        KIND: {
            line(){},
            vector(){},
            ring(){},
        }
    }

    static {

        Object.freeze(this.ENUMS.COLORS);
        Object.freeze(this.ENUMS.KIND);

    }

    /**
     * The `default.draw` static method takes single `Object` as its input whose properties are as follows:
     * @param {HTMLCanvasElement} canvas - a reference to `canvas` (a.k.a. Layer) instance, whose context in turn is being modified;
     * @param {Object} options - options you have passed to shape current `context` of the `canvas`
     * @returns {Object} The `options`
     */
    static draw({canvas, options}) {

        const context = canvas.getContext('2d');

        context.save()

        // DEV_NOTE # local (per-View) matrix transformation(s); this MUST go after per-Layer (shared) matrix transformation, if any !
        if (options.overrides?.transform){
            if (options.overrides.transform?.translation){
                let { x, y } = options.overrides.transform.translation;
                context.translate(x * context.global.options.responsiveValue, y * context.global.options.responsiveValue)
            }
            if (options.overrides.transform?.angle){
                context.rotate(options.overrides.transform.angle)
                context.currentAngle = options.overrides.transform.angle;
            }
            if (options.overrides.transform?.scale){
                let { x, y } = options.overrides.transform.scale;
                context.scale(x, y);
            }
        }

        context.beginPath();

            options.points
            .forEach((point, i)=>{

                if (i === 0){

                    switch (options.kind) {
                        case 'ring':
                            context.moveTo(
                                ( context.global.options.responsiveValue * ( point[0] ) ) - (options.lineWidth ||  context.global.options.lineWidth)
                                , 
                                ( context.global.options.responsiveValue * ( point[1] ) ) - (options.lineWidth ||  context.global.options.lineWidth)
                            );
                            break;
                        default /* === ('circle' || 'line') */ :
                            context.moveTo(
                                0
                                , 
                                0
                            );
                            break;
                    }

                }
                context.lineTo(
                    (context.global.options.responsiveValue * (point[0]))
                    , 
                    (context.global.options.responsiveValue * (point[1]))
                );
                
            });
                    
        context.closePath();

        context.lineWidth = options.lineWidth || context.global.options.lineWidth;
        context.strokeStyle = options.strokeStyle || context.global.options.strokeStyle;
        context.fillStyle = options.fillStyle || context.global.options.fillStyle;
        context.fillStroke();

        context.restore();

        if (options.kind === this.ENUMS.KIND.vector.value) {

            options.points.forEach((point)=>{
                this.#addArrowTip({
                    context,
                    options,
                    x1: 0,
                    y1: 0,
                    x2: (point[0]) * context.global.options.responsiveValue,
                    y2: (point[1]) * context.global.options.responsiveValue,
                });
            });

        }

        return true;

    }

    /**
     * > DEV_NOTE # Kudos to ChatGPT for this algorithm !
     * 
     * ---
     * 
     * Draws a line with an arrowhead at the end.
     * @param {number} x1 - Starting x-coordinate of the line
     * @param {number} y1 - Starting y-coordinate of the line
     * @param {number} x2 - Ending x-coordinate of the line
     * @param {number} y2 - Ending y-coordinate of the line
     * @param {number} arrowLength - Length of the arrowhead
     * @param {number} arrowWidth - Width of the arrowhead (distance between its two wings)
     */
    static #addArrowTip({context, options, x1, y1, x2, y2, arrowLength = 20, arrowWidth = 20, h = 0}){

        context.save();

            let { x: offsetX, y: offsetY } = options.overrides?.transform?.translation || {x: 0, y: 0};
            context.translate(offsetX * context.global.options.responsiveValue, offsetY * context.global.options.responsiveValue)
            context.rotate((options.overrides?.transform?.angle || 0))

            // Calculate the angle of the line
            const angle = Math.atan2(y2 - y1, x2 - x1);
        
            // Arrowhead points
            const arrowAngle1 = angle + Math.atan(arrowWidth / (2 * arrowLength)); // First wing
            const arrowAngle2 = angle - Math.atan(arrowWidth / (2 * arrowLength)); // Second wing
        
            const arrowX1 = x2 - arrowLength * Math.cos(arrowAngle1);
            const arrowY1 = y2 - arrowLength * Math.sin(arrowAngle1);
            const arrowX2 = x2 - arrowLength * Math.cos(arrowAngle2);
            const arrowY2 = y2 - arrowLength * Math.sin(arrowAngle2);
            
            // Draw the arrowhead
            context.beginPath();
            context.moveTo(x2+h, y2+h);
            context.lineTo(arrowX1, arrowY1);
            context.lineTo(arrowX2, arrowY2);
            context.closePath();

            context.strokeStyle = options.strokeStyle;
            context.fillStyle = options.fillStyle || context.strokeStyle;
            context.fillStroke();

        context.restore();

        return true;

    }

}