import Placard from './src/index';
import setViews, { Notifier as isObserved } from './implementation/index';
import Observer from './src/observer';
import UserSettings, { GUI } from './user-settings';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE (1.1, see@1.2) # web.dev highly suggests to use this line only in non-PWA case

document.addEventListener('DOMContentLoaded', ()=>{

    ///* # (@1.2) */
    document.title = package_json.name;

    let observerNamespace = 'slider-input';
    document.body.appendChild(
        Observer(
            observerNamespace
            ,
            new Map([
                ['angle', 0],
            ])
            ,
            {
                isObserved
            }
        )
    )

    const 
        origin = [0, 0]
        ,
        { setAngle } = Placard.Helpers.Trigonometry;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});
        if (stage) {
            // DEV_NOTE # herein we add "Layer(s)" to the current "Stage", accessible via `stage.layers` alias:
            stage.add([
                new Placard.ViewGroup.Layer({ name: 'grid', opacity: 0.25, hidden: !true })
                ,
                new Placard.ViewGroup.Layer({
                name: 'right-triangle', transform: [
                ...setAngle( 0 /* current.angle */ ), ...origin
                ]
                })
                ,
                new Placard.ViewGroup.Layer({name: 'wireframe', hidden: true})
                ,
                /* new Placard.ViewGroup.Layer({name: 'ring', hidden: true})
                , *//* <=== DEV_NOTE (!) # if this is instantiated, session-level (tab) `console.log` may halt the CPU, due to anti-aliasing part in `setRange(0, 0.1 , 720, false)` call, thus commented out */
                new Placard.ViewGroup.Layer({ name: 'unit-of-circle' })
                ,
            ]);
        }

    /* === GUI === */

        const slider = GUI.getInput({name: 'slider'});
            if (slider){

                slider
                .on('input', (e)=>{
        
                    const [ANTI_CLOCKWISE, CLOCKWISE] = [-1, 1];
                    const current = {angle: /* ANTI_ */CLOCKWISE * Math.floor(e.target.value)};

                    document.querySelector(`${observerNamespace}`).angle = current.angle;
        
                    // DEV_NOTE (!) # Placard.js reponsive web experience internally based on window.onresize, so we MUST dispatch the following: 
                    window.dispatchEvent(new Event('resize'));
        
                });
                
                // DEV_NOTE (!) # the following dispatch setups initial stage through means of GUI
                slider.dispatchEvent(new Event('input'));

            }

    /* === GUI === */
    
    if ( setViews({stage, Placard, UserSettings}) ) window.addEventListener('resize', setViews.bind(null, {stage, Placard, UserSettings})) ;

});