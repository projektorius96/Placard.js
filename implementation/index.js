import Ring from './ring';
import Wireframe from './wireframe';
import RightTriangle from './right-triangle';

export function Notifier(prop, oldProp, newProp) {

    switch (prop) {
        case 'angle' : 
            oldProp = newProp;
        break;
        case 'sense' : 
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

                /* === SECTOR === */
                case 'sector' :
                
                    const
                        [
                            sector$angle
                            , 
                            arc$angle
                        ] = [
                            45
                            , 
                            0
                        ]
                        ;

                    
                    let sense = 180;
                    switch ( Number( document.querySelector('slider-input')?.sense ) ) {
                        case -1 :
                            sense = 180;/* in angle degrees */
                            break;
                        case 1 :
                            sense = 0;/* in angle degrees */
                            break;
                    }

                    context.setTransform(...setAngle(-1 * sector$angle), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.rotate( degToRad( Number( document.querySelector('slider-input')?.angle ) ) );

                    stage.layers[canvas.name].add([
                        RightTriangle.draw({context})
                        ,
                        void function(){

                            /* context.save() */

                                context.rotate(degToRad(sector$angle + arc$angle)) /* rotate arc itself along the edge of the circle */
                                context.beginPath();
                                context.arc(
                                    /* x */ 0, 
                                    /* y */ 0, 
                                    /* radius */ (context.global.options.scalingValue * stage.grid.GRIDCELL_DIM), 
                                    /* startAngle */ 0, 
                                    /* endAngle */  degToRad(180 / Math.PI),
                                    /* anticlockwise */ true
                                );
                                context.lineWidth = context.global.options.lineWidth;
                                context.strokeStyle = 'black';
                                /* context.globalCompositeOperation = 'source-over'; */// @DEFAULT
                                context.stroke();

                            /* context.restore() */

                        }()
                        ,
                        void function(){

                            /* context.save() */// # context is preserved, meaning above context.rotate will rotate arc and its arrow tip as one unit

                                context.rotate(degToRad(-1 * (sense / Math.PI) ) )
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
                                context.globalCompositeOperation = 'destination-over';
                                context.stroke();

                            /* context.restore() */

                            context.globalCompositeOperation = 'source-over';
                            Placard.Views.Line.addArrowTip({
                                context,
                                x2: 1 * Math.cos(degToRad(90 + sense)),
                                y2: 1 * Math.sin(degToRad(90 + sense)),
                                options: {
                                    overrides: {
                                        transform: {
                                            /* DEV_NOTE (!) # then {x2, y2} is set to 0s, the `overrides.transform.angle` allows us rotating arrow tip along itself rather than to its relative origin (tail) */
                                            angle: degToRad( (180 / Math.PI) ),
                                            translation: {
                                                x: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.cos(degToRad( ( (180  / Math.PI) ) )),
                                                y: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Math.sin(degToRad( ( (180  / Math.PI) ) )),
                                            },
                                        }
                                    }
                                },
                                arrowTip: {
                                    baseLength : context.global.options.lineWidth * 4, capLength : 0, width : context.global.options.lineWidth * 4
                                }
                            });

                        }()
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