import { getIterable, responsify } from "./utils";
import { degToRad, setAngle, setRange } from "./trigonometry";
import { stage_view } from './views/stage-view';
import { layer_view } from './views/layer-view';
import Grid from "./views/grid";

/**
 * @typedef {Array} Iterable
 * 
 * @param {HTMLDivElement} stage - the reference to the current instance of `stage` (a.k.a. "top-level `view-group`")
 * @returns {Iterable} `Iterable` : if such iterable is iterated, each value of iterable's is a "`view-group`"; top-level `view-group` conventionally is called **"`stage`"**, otherwise it's a **"`layer`"**
 */
export default class {

    static getResponsiveRatio({context}){
        
        let
            canvas = context?.canvas
            ,
            aspectRatioWidth = ( Number( stage?.getAttribute('readonly:width') ) / Number(canvas.width) )**-1
            ,
            aspectRatioHeight = ( Number( stage?.getAttribute('readonly:height') ) / Number(canvas.height) )**-1
            ,
            responsiveValue = Math.min(aspectRatioWidth, aspectRatioHeight)
            ;

        return responsiveValue;
    }

    static init({stage, stageScale}) {

        if ( responsify({ stage, stageScale }) ) {
            return (
                getIterable(stage.layers).map( canvas => canvas = canvas.getContext('2d') )
            );
        }

    }

    static ViewGroup = {
        Stage : customElements.get(stage_view),
        Layer : customElements.get(layer_view),
    }
    
    static Views = {
        Grid,
    }

    static Helpers = {
        Misc: {
            setRange,
        }
        ,
        Trigonometry: {
            setAngle
            ,
            degToRad
            ,
        }
        ,
    }

}
