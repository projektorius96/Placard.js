import Placard from './src/index';

/** 
 * **EXPLAINER** : Herein you define your global user's (developer's) settings
 */
export default class {

    static init({context}){

        Object.assign(context, {
            global: {
                options: {
                    responsiveValue: Placard.getResponsiveRatio({context}),
                    scalingValue: 3,
                    lineWidth: 4,
                    strokeStyle: 'grey',
                }
            },
        })
    
        return true;

    }

}
