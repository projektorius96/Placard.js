import Placard from './src/index';

/** 
 * **EXPLAINER** : Herein you define your global user's (developer's) settings
 */
export default function (context) {

    Object.assign(context, {
        global: {
            options: {
                responsiveValue: Placard.getResponsiveRatio({context}),
                lineWidth: 4,
                strokeStyle: 'grey',
            }
        },
    })

    return true;

}
