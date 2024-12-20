import Placard from './src';
import UserSettings from './user-settings';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE # web.dev suggest to use this line onLY in non-PWA case

import { 
    Ring
    , 
    Wireframe
    , 
    RightTriangle 
} from './implementation';

const { setAngle } = Placard.Helpers.Trigonometry;
document.addEventListener('DOMContentLoaded', ()=>{

    document.title = package_json.name;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});
        if (stage){

            // EXAMPLE # Here is where you instantiate Canvas "layer(s)" dynamically, rather than declaratively as writing <canvas> within index.html
            stage.add([
                new Placard.ViewGroup.Layer({name: 'grid', opacity: 0.25, hidden: !true})
                ,
                new Placard.ViewGroup.Layer({name: 'wireframe', hidden: true})
                ,
                new Placard.ViewGroup.Layer({name: 'right_triangle', hidden: !true})
                ,
                new Placard.ViewGroup.Layer({name: 'ring', hidden: true})
                ,
            ]);
        
            if ( setViews(stage) ) {
                window.addEventListener('resize', setViews.bind(null, stage))
            }

        }

});

function setViews(stage){

    Placard
    .init({stage, stageScale: 25 /* <=== # thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{

        if ( UserSettings.init({context})  ) {

            let canvas = context.canvas;
            
            switch (canvas.name) {

                /* === GRID === */
                case 'grid' :
                    Placard.Views.Grid.draw({
                        canvas: stage.layers.grid, 
                        options: {
                            lineWidth: 2,
                        }}
                    );
                break;

                /* === RIGHT-TRIANGLE === */
                case stage.layers.right_triangle.name :
                    // DEV_NOTE # The line below control grouped (i.e. Layer-level) matrix transformation:
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                    RightTriangle.draw({context});
                break;
                
                /* === WIREFRAMES === */
                case stage.layers.wireframe.name :
                    Wireframe.draw({context});
                break;

                /* === RING === */
                case stage.layers.ring.name :
                    // DEV_NOTE # The line below control grouped (i.e. Layer-level) matrix transformation:
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    
                    Ring.draw({context});
                break ;

            endswitch:;}

        endif:;}
        
    endon:;})

    return true;

}