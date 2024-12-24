import Placard from './src/index';
import setViews from './implementation/index';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE (1.1, see@1.2) # web.dev highly suggests to use this line only in non-PWA case

document.addEventListener('DOMContentLoaded', ()=>{

    ///* # (@1.2) */
    document.title = package_json.name;

    const
        origin = [0, 0]
        ,
        { setAngle } = Placard.Helpers.Trigonometry
        ;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});
        if (stage){

            // EXAMPLE # Here is where you instantiate Canvas "layer(s)" dynamically, rather than declaratively as writing <canvas> within index.html
            stage.add([
                new Placard.ViewGroup.Layer({name: 'grid', opacity: 0.25, hidden: !true})
                ,
                new Placard.ViewGroup.Layer({name: 'right-triangle', transform: [
                    ...setAngle(-45), ...origin
                ]})
                ,
                new Placard.ViewGroup.Layer({name: 'wireframe', hidden: true})
                ,
                /* new Placard.ViewGroup.Layer({name: 'ring', hidden: true})
                , *//* <=== DEV_NOTE (!) # if this is instantiated, session-level (tab) console.log may halt the CPU, due to anti-aliasing part in `setRange(0, 0.1 , 720, false)`, thus commenting it out for now... */
            ]);
        
            if ( setViews(stage) ) {
                window.addEventListener( 'resize', setViews.bind(null, stage) )
            }

        }

});