const layers = 'layers';
Object.defineProperties(HTMLElement.prototype, {
    [layers] : {
        get(){
            return this.children
        }
    }
    ,
    add: {
        value: function(children) {
            this.append(...children)
        }
    }
    ,
});

Object.defineProperties(Array.prototype, {
    'on' : {
        value: Array.prototype.forEach
    }
    ,
});

Object.defineProperties(Function.prototype, {
    'value' : {
        get() {
            return this.name;
        }
    }
    ,
});

/**
 * @param {HTMLDivElement} stage - canvas wrapping element (**"view-group"**), if such "`view-group`" is a top-level `view-group`, by convention we will call it the **"`stage`"**
 * @returns makes a **"view-group"** responsive (most likely it's "top-level `view-group`" a.k.a. "`stage`")
 */
export function responsify({stage, stageScale}){

    let
        GRIDCELL_DIM = ( stage.clientWidth / evenNumber( stageScale ) )
        ,
        divisorX = Math.ceil( stage?.clientWidth / GRIDCELL_DIM )
        ,
        divisorY = Math.ceil( stage?.clientHeight / GRIDCELL_DIM )
        ,
        X_IN_MIDDLE = ( ( ( divisorX * GRIDCELL_DIM ) ) / 2 )
        ,  
        Y_IN_MIDDLE = ( ( ( divisorY * GRIDCELL_DIM )  ) / 2 )
    ;

    stage.grid = {
        GRIDCELL_DIM,
        X_IN_MIDDLE: X_IN_MIDDLE * window.devicePixelRatio, 
        Y_IN_MIDDLE: Y_IN_MIDDLE * window.devicePixelRatio,
    }
    
    const muttable = {
        stageWidth: stage?.clientWidth * window.devicePixelRatio,
        stageHeight: stage?.clientHeight * window.devicePixelRatio,
    }

    if (stage[layers].length > 0){
        Array.from( stage[layers] ).forEach((layer)=>{ 
            layer.width = muttable.stageWidth;
            layer.height = muttable.stageHeight;
        });
    }

    return true;

}

export function getIterable(nonIterable) {
    if (!Array.isArray(nonIterable)){
        return Array.from(nonIterable)
    }
}

// /* DEV_NOTE # this is JSDocs-documented, but should be excluded from the generated template, so commenting this out */
// /**
//  * > This function is a guard against end-users (_e.g. library consumption case_), who know very little about canonical `Canvas API`
//  * @param {Number} num - odd number that is made even, or even number that is left out as is, i.e. even
//  * @returns makes sure the `GRIDCELL_DIM_RATIO` is always even, this makes sure shapes (views) are well centred in grid-first coordinate system
//  */
function evenNumber(num = 0) {
    
    const rounded = Math.ceil(num);

    return (
        rounded % 2 === 1 ? rounded + 1 : rounded
    );
}
