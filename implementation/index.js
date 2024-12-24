import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

import Placard from '../src'
import UserSettings from '../user-settings';

export default function (stage){

    const { setAngle } = Placard.Helpers.Trigonometry;

    Placard
    .init({stage, stageScale: 20 /* <=== # thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{

        if ( UserSettings.init({context}) ) {

            let canvas = context.canvas;
            
            switch (canvas.name) {

                /* === GRID === */
                case 'grid' :
                    stage.layers.grid.addViews([

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
                        stage.layers[canvas.name].addViews([
                            RightTriangle.draw({context})
                            ,
                        ])
                    }
                break;
                
                /* === WIREFRAMES === */
                case stage.layers.wireframe.name :
                    stage.layers.wireframe.addViews([
                        Wireframe.draw({context})
                        ,
                    ])
                break;

                /* === RING === */
                case stage.layers.ring.name :
                    // DEV_NOTE # The line below control grouped (i.e. Layer-level) matrix transformation:
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    
                    stage.layers.ring.addViews([
                        Ring.draw({context})
                        ,
                    ])
                break ;

            endswitch:;}

        endif:;}
        
    endon:;})

    return true;

}