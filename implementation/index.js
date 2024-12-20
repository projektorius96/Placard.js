import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

import Placard from '../src'
import UserSettings from '../user-settings';

export default function (stage){

    const { setAngle } = Placard.Helpers.Trigonometry;

    Placard
    .init({stage, stageScale: 25 /* <=== # thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{

        if ( UserSettings.init({context}) ) {

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