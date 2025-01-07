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

    console.log(arguments);

    const 
        CONDITIONS = {
            isMobile : screen.orientation.type.includes('portrait')
        }
        ,
        { setAngle, degToRad } = Placard.Helpers.Trigonometry
        ;

    Placard
    .init({stage, stageScale: 20 /* <=== DEV_NOTE # the thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{
        
        if ( UserSettings.init({context}) ) {

            // DEV_NOTE # scale twice as big, if mobile device is detected :
            CONDITIONS.isMobile ? context.global.options.scalingValue *= 2 : screen.orientation.type.includes('portrait') * 1 ;

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

                /* === UNIT-OF-CIRCLE === */
                case 'unit-of-circle' :

                context.clearRect(0, 0, canvas.width, canvas.height)

                    stage.layers.grid.add([
                        void function () {
                            
                            context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                            context.beginPath();
                            context.arc(0, 0, context.global.options.scalingValue * stage.grid.GRIDCELL_DIM/*  * Placard.Views.Line.RIGHTANGLE_SLOPE */, 0, 2 * Math.PI);
                            context.lineWidth = context.global.options.lineWidth;
                            context.stroke();
                            
                        }()
                        // ,
                        // void function () {
                            
                        //     context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                        //     context.beginPath();
                        //     context.arc(0, 0, context.global.options.scalingValue * stage.grid.GRIDCELL_DIM/*  * Placard.Views.Line.RIGHTANGLE_SLOPE */, 0, 2 * Math.PI);
                        //     context.lineWidth = context.global.options.lineWidth;
                        //     context.stroke();
                            
                        // }()
                        // ,
                        // void function () {
                            
                        //     context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                        //     context.beginPath();
                        //     context.arc(0, 0, context.global.options.scalingValue * stage.grid.GRIDCELL_DIM / Placard.Views.Line.RIGHTANGLE_SLOPE, 0, 2 * Math.PI);
                        //     context.lineWidth = context.global.options.lineWidth;
                        //     context.stroke();
                            
                        // }()
                        // ,
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

                    context.clearRect(-stage.grid.X_IN_MIDDLE, -stage.grid.Y_IN_MIDDLE, canvas.width, canvas.height);
                    context.resetTransform();
                    
                    // DEV_NOTE # alternatively we can call `context.transformLayer()` by asking to read `transform` from `ViewGroup.Layer({ transform: numbers[] })` itself:
                    if ( context.transformLayer() ){
                        context.rotate( degToRad( Number( document.querySelector('slider-input').angle) ) )
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