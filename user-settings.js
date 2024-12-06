import Placard from './src/index';

/** 
 * **EXPLAINER** : Herein you define your global user's (developer's) settings
 */
export default function (context) {

    Object.assign(context, {
        global: {
            options: {
                responsiveValue: Placard.getResponsiveRatio({context}),
                ejectXY: false, /* # if ejected (i.e. `ejectXY = true || !false`), it shift origin to user-agent's (browser's) defaults, usually it's a top-left corner of browser's viewport, rather than opinionated middle of the viewport */
                lineWidth: 12,
                strokeStyle: 'grey',
            }
        },
    })

    return true;

}
