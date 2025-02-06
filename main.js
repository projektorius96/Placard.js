import Placard from './src/index?global=1&local=2';
import setViews, { Notifier as isObserved } from './implementation/index';
import Observer from './src/observer';
import UserSettings, { GUI } from './user-settings';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE (1.1, see@1.2) # web.dev highly suggests to use this line only in non-PWA case

document.addEventListener('DOMContentLoaded', ()=>{

    ///* # (@1.2) */
    document.title = package_json.name;

    const sliderInput = Observer(
        'slider-input'
        ,
        new Map([
            ['angle',  0],
            ['sense', -1],
        ])
        ,
        {
            isObserved
        }
    );
    if (sliderInput){
        document.body.appendChild(
            sliderInput
        )
    }

    const 
        { Stage, Layer } = Placard.ViewGroup
        ;

    const stage = new Stage({scale: 20});
    
        if ( stage ) {
            stage.add([
                new Layer({ name: 'grid', opacity: 0.25/* , isSkewed: {sign: -1} */ })
                ,
                new Layer({ name: 'cartesian', hidden: !false })
                ,
                new Layer({ name: 'sector', hidden: !true })
                ,
            ]);
        }

    /* === GUI === */

        const slider = GUI.getInput({name: 'rotation'});
            if (slider){

                GUI.getInput({name: 'sense'}).on('change', function (e) {

                    const 
                        [ANTI_CLOCKWISE, CLOCKWISE] = [-1, 1]
                        ,
                        senseMapper = new Map([
                            [false, ANTI_CLOCKWISE],
                            [true, CLOCKWISE],
                        ])
                        ;
                    
                    sliderInput.sense = senseMapper.get(e.target.checked)

                    // DEV_NOTE # we have to dispatch the following, if we want to see non-linear vector tip's sense (direction) to be synchronized with `sliderInput.sense` value being set;
                    slider.dispatchEvent(new Event('input'));
                    
                })

                slider
                .on('input', (e)=>{

                    const current = { angle: sliderInput.sense * Number( Math.floor( e.target.value ) ) };
                        sliderInput.angle = current.angle;
                        
                    // DEV_NOTE (!) # Placard.js reponsive web experience internally based on window.onresize, so we MUST dispatch the following: 
                    window.dispatchEvent(new Event('resize'));
        
                });
                
                // DEV_NOTE (!) # the following dispatch setups initial stage through means of GUI
                slider.dispatchEvent(new Event('input'));

            }

    /* === GUI === */
    
    // DEV_NOTE (!) # crucial line that registers "onresize" Event - without this, window resize would not be detected
    if ( setViews({stage, Placard, UserSettings}) ) window.addEventListener('resize', setViews.bind(null, {stage, Placard, UserSettings})) ;

});