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

                // /* === RIGHT-TRIANGLE === */
                // /* # [FAILING]@{'Does not snap to initial `stage.grid.GRIDCELL_DIM` during `onresize` event'} */
                // case 'right-triangle' :
                //
                //     // DEV_NOTE # alternatively we can call `context.transformLayer()` by asking to read `transform` from `ViewGroup.Layer({ transform: numbers[] })`:
                //     if ( context.transformLayer() ){
                //         context.clearRect(-stage.grid.X_IN_MIDDLE, -stage.grid.Y_IN_MIDDLE, canvas.width, canvas.height);
                //         context.rotate( degToRad( Number( document.querySelector('slider-input').angle ) ) )
                //         stage.layers[canvas.name].add([
                //             RightTriangle.draw({context})
                //             ,
                //         ]);
                //     }
                //
                // break;

                case 'right-triangle-v2' :
                
                const 
                    RIGHTANGLE_SLOPE = (1 / Math.sin(Math.PI / 4))
                    ,
                    GRIDCELL_DIM = stage.grid.GRIDCELL_DIM * devicePixelRatio
                    ;
                
                const bulkTransform = ({context}) => {
                        context.resetTransform();
                        context.translate(stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                        context.rotate( degToRad( Number( document.querySelector('slider-input').angle ) ) );

                        return true;
                }
                stage.layers[canvas.name].add([
                        void function red_vector(){
                            if( bulkTransform({context}) ) {
                                context.beginPath();
                                    context.moveTo(0, 0);
                                    context.lineTo(
                                        context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.cos(0) * devicePixelRatio
                                        , 
                                        context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.sin(0) * devicePixelRatio
                                    );
                                    context.lineWidth = context.global.options.lineWidth
                                    context.strokeStyle = 'red';
                                context.stroke();
                            }
                        }()
                        ,
                        void function blue_vector(){
                            if ( bulkTransform({context}) ) {
                                context.translate(context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * devicePixelRatio, 0)
                                context.beginPath();
                                    context.moveTo(0, 0);
                                    context.lineTo(
                                        context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.cos(Math.PI/2) * devicePixelRatio
                                        , 
                                        context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.sin(Math.PI/2) * devicePixelRatio
                                    );
                                    context.lineWidth = context.global.options.lineWidth;
                                    context.strokeStyle = 'blue';
                                context.stroke();
                            }
                        }()
                        ,
                        void function green_vector(){
                            if ( bulkTransform({context}) ) {
                                context.beginPath();
                                    context.moveTo(0, 0);
                                    context.lineTo(
                                        context.global.options.scalingValue * GRIDCELL_DIM * RIGHTANGLE_SLOPE * Math.cos(Math.PI/4)
                                        , 
                                        context.global.options.scalingValue * GRIDCELL_DIM * RIGHTANGLE_SLOPE * Math.sin(Math.PI/4)
                                    );
                                    context.lineWidth = context.global.options.lineWidth;
                                    context.strokeStyle = 'green';
                                context.stroke();
                            }
                            
                        }()
                        , 
                    ]);
                
                break;

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

                // /* === UNIT-OF-CIRCLE === */
                // case 'unit-of-circle' :

                // context.clearRect(0, 0, canvas.width, canvas.height)
                // context.resetTransform()

                //     stage.layers.grid.add([
                //         void function () {
                //             context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                //             context.beginPath();
                //             context.arc(
                //                 /* x */ 0, 
                //                 /* y */ 0, 
                //                 /* radius */ (context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE)/*  * context.snapToGrid * context.global.options.responsiveValue */, 
                //                 /* startAngle */ 0, 
                //                 /* endAngle */ 2 * Math.PI,
                //                 /* anticlockwise */ true
                //             );
                //             context.lineWidth = context.global.options.lineWidth;
                //             context.stroke();
                //         }()
                //         ,
                //     ]);

                // break;
                
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

            endswitch:;}

        endif:;}
        
    endon:;})
    
    return true;

}