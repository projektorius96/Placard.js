import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

export default function ({stage, Placard, UserSettings}){

    Placard
    .init({stage, stageScale: 20 /* <=== DEV_NOTE # the thumb of rule is between 15-20 (in relative units) */})
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
                    ]);

                break;
                
                /* === WIREFRAMES === */
                case stage.layers.wireframe?.name :

                    stage.layers.wireframe.add([
                        Wireframe.draw({context})
                        ,
                    ]);

                break;

                /* === RING === */
                case stage.layers.ring?.name :

                    // DEV_NOTE # The line below controls grouped (i.e. Layer-level) matrix transformation:
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    
                    stage.layers.ring.add([
                        Ring.draw({context})
                        ,
                    ]);

                break ;

                /* === RIGHT-TRIANGLE === */
                case 'right-triangle' :

                    /* context.setTransform(...setAngle(-45), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE); */
                    // DEV_NOTE # alternatively we can call `context.transformLayer()` by asking to read `transform` from `ViewGroup.Layer({ transform: numbers[] })` itself:
                    if ( context.transformLayer() ){
                        stage.layers[canvas.name].add([
                            RightTriangle.draw({context})
                            ,
                        ]);
                    }

                break;

            endswitch:;}

        endif:;}
        
    endon:;})
    
    return true;

}