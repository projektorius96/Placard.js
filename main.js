import Placard from './src/index';
import setViews from './implementation/index';
import UserSettings, { GUI } from './user-settings';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE (1.1, see@1.2) # web.dev highly suggests to use this line only in non-PWA case

document.addEventListener('DOMContentLoaded', ()=>{

    ///* # (@1.2) */
    document.title = package_json.name;

    const 
        origin = [0, 0]
        ,
        { setAngle } = Placard.Helpers.Trigonometry;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});

    /* === GUI === */

        const slider = GUI.find({name: 'slider', index: 1/* <=== DEV_NOTE (!) # always index :=1, if your target is input element */});
            if (slider){

                slider
                .on('input', (e)=>{
        
                    const [ANTI_CLOCKWISE, CLOCKWISE] = [-1, 1];
                    const current = {angle: ANTI_CLOCKWISE * Math.floor(e.target.value)};
        
                    if ( !Boolean( stage.replaceChildren() ) ) {
        
                        // DEV_NOTE # herein we add "Layer(s)" to the current "Stage", accessible via `stage.layers` alias:
                        stage.add([
                            new Placard.ViewGroup.Layer({ name: 'grid', opacity: 0.25, hidden: !true })
                            ,
                            new Placard.ViewGroup.Layer({
                                name: 'right-triangle', transform: [
                                    ...setAngle(current.angle), ...origin
                                ]
                            })
                            ,
                            new Placard.ViewGroup.Layer({name: 'wireframe', hidden: true})
                            ,
                            /* new Placard.ViewGroup.Layer({name: 'ring', hidden: true})
                            , *//* <=== DEV_NOTE (!) # if this is instantiated, session-level (tab) `console.log` may halt the CPU, due to anti-aliasing part in `setRange(0, 0.1 , 720, false)` call, thus commented out */
                        ]);
        
                    }
        
                    // DEV_NOTE (!) # Placard.js reponsive web experience internally based on window.onresize, so we MUST dispatch the following: 
                    window.dispatchEvent(new Event('resize'));
        
                });
                
                // DEV_NOTE (!) # the following dispatch setups initial stage through means of GUI
                slider.dispatchEvent(new Event('input'));

            }

    /* === GUI === */
    
    if ( setViews({stage, Placard, UserSettings}) ) window.addEventListener('resize', setViews.bind(null, {stage, Placard, UserSettings})) ;

});