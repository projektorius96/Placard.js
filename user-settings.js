import Placard from './src/index';

/** 
 * **EXPLAINER** : Herein you define your global user's (developer's) settings
 */
export default class {

    static #snapToGrid = Math.sin(Math.PI/4);

    static init({context}){

        context.snapToGrid = this.#snapToGrid;

        Object.assign(context, {
            global: {
                options: {
                    /* 
                        EXAMPLE : Conventionally we define Placard-specific properties, where each property's key is in "['key'] : value" form, otherwise it's Canvas API reflective key(s) e.g. "strokeStyle: 3"
                    */
                    ['ejectXY']: false,
                    ['startAtQ1']: true,
                    ['responsiveValue']: Placard.getResponsiveRatio({context}),
                    scalingValue: 3,
                    lineWidth: 4,
                    strokeStyle: 'grey',
                }
            },
        })
    
        return true;

    }

}
