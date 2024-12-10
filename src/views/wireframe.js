export default class {

    static ENUMS = {
        TYPE: {
            ident(){},
            reversed_ident(){},
        }
    }

    static {
        Object.freeze(this.ENUMS.TYPE)
    }

    static draw({canvas, options}){

        const context = canvas.getContext('2d');
        switch (options.type) {
            // DEV_NOTE (!) # .value is an alias for .name (@see ./src/utils.js)
            case this.ENUMS.TYPE.ident.value:
                this.#identDiagonal({context, options});
                break;
            case this.ENUMS.TYPE.reversed_ident.value:
                this.#reversedDiagonal({context, options});
                break;
        }

        return true;

    }

    static #identDiagonal({context, options}){
        context.beginPath();
            context.moveTo(
                0
                , 
                0
            );
            context.lineTo(
                window.innerWidth * window.devicePixelRatio
                , 
                window.innerHeight * window.devicePixelRatio
            );
        context.closePath();

        context.lineWidth = options?.lineWidth || context.global.options.lineWidth;
        context.strokeStyle = options?.strokeStyle || context.global.options.strokeStyle;
        context.fillStroke();
    }

    static #reversedDiagonal({context, options}){
        context.beginPath();
            context.moveTo(
                window.innerWidth * window.devicePixelRatio
                , 
                0
            );
            context.lineTo(
                0
                , 
                window.innerHeight * window.devicePixelRatio
            );
        context.closePath();

        context.lineWidth = options?.lineWidth || context.global.options.lineWidth;
        context.strokeStyle = options?.strokeStyle || context.global.options.strokeStyle;
        context.fillStroke();
    }

}