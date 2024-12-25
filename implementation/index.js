import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

import Placard from '../src'
import UserSettings from '../user-settings';

export default function (stage){

    const 
        origin = [0, 0]
        ,
        { setAngle } = Placard.Helpers.Trigonometry;

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

    Placard
    .init({stage, stageScale: 20 /* <=== # thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{

        if ( UserSettings.init({context}) ) {

            let canvas = context.canvas;
            
            switch (canvas.name) {

                /* === GRID === */
                case 'grid' :
                    stage.layers.grid.add([
                        Placard.Views.Grid.draw({
                            canvas: stage.layers.grid, 
                            options: {
                                lineWidth: 2,
                            }}
                        )
                        ,
                    ])
                break;

                /* === RIGHT-TRIANGLE === */
                case 'right-triangle' :
                    // DEV_NOTE # The line below controls grouped (i.e. Layer-level) matrix transformation:
                    /* context.setTransform(...setAngle(-45), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE); */// # alternatively we can call `context.transformLayer()` by asking to read transform given during instantiation of ViewGroup.Layer
                    if ( context.transformLayer() ){
                        stage.layers[canvas.name].add([
                            RightTriangle.draw({context})
                            ,
                        ])
                    }
                break;
                
                /* === WIREFRAMES === */
                case stage.layers.wireframe.name :
                    stage.layers.wireframe.add([
                        Wireframe.draw({context})
                        ,
                    ])
                break;

                /* === RING === */
                case stage.layers.ring.name :
                    // DEV_NOTE # The line below control grouped (i.e. Layer-level) matrix transformation:
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    
                    stage.layers.ring.add([
                        Ring.draw({context})
                        ,
                    ])
                break ;

            endswitch:;}

        endif:;}
        
    endon:;})

    return true;

}