import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

export function Notifier(prop, oldProp, newProp) {

    switch (prop) {
        case 'angle' : 
            oldProp = newProp;
        break;
    }

}

export default function setView({stage, Placard, UserSettings}){

    const 
        CONDITIONS = {
            isMobile : screen.orientation.type.includes('portrait')
        }
        ,
        { setAngle, degToRad } = Placard.Helpers.Trigonometry
        ;

    Placard
    .init({stage})
    .on((context)=>{
        
        if ( UserSettings.init({context}) ) {

            // DEV_NOTE # scale twice as big, if mobile device is detected :
            CONDITIONS.isMobile ? context.global.options.scalingValue *= 2 : screen.orientation.type.includes('portrait') * 1 ;

            let canvas = context.canvas;
            
            switch (canvas.name) {

                /* === RIGHT-TRIANGLE === */
                case 'right-triangle' :
                
                    context.setTransform(...setAngle(-45), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.rotate( degToRad( Number( document.querySelector('slider-input').angle ) ) )

                    stage.layers[canvas.name].add([
                        RightTriangle.draw({context})
                        ,
                        void function(){
                            context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                            context.rotate( degToRad( Number( document.querySelector('slider-input').angle ) ) )

                            context.beginPath();
                            context.arc(
                                /* x */ 0, 
                                /* y */ 0, 
                                /* radius */ (context.global.options.scalingValue * stage.grid.GRIDCELL_DIM), 
                                /* startAngle */ 0, 
                                /* endAngle */   degToRad(180 / Math.PI),
                                /* anticlockwise */ true
                            );
                            context.lineWidth = context.global.options.lineWidth;
                            context.strokeStyle = 'black';
                            context.stroke();
                        }()
                    ]);
                
                break;

                /* === UNIT-OF-CIRCLE === */
                case 'unit-of-circle' :

                context.clearRect(0, 0, canvas.width, canvas.height)
                context.resetTransform()

                    stage.layers.grid.add([
                        void function () {
                            context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                            context.rotate( degToRad( Number( document.querySelector('slider-input').angle ) ) )

                            context.beginPath();
                            context.arc(
                                /* x */ 0, 
                                /* y */ 0, 
                                /* radius */ (context.global.options.scalingValue * stage.grid.GRIDCELL_DIM), 
                                /* startAngle */ 0, 
                                /* endAngle */   2 * Math.PI,
                                /* anticlockwise */ true
                            );
                            context.lineWidth = context.global.options.lineWidth;
                            context.strokeStyle = 'blue';
                            context.stroke();
                        }()
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

            endswitch:;}

        endif:;}
        
    endon:;})
    
    return true;

}