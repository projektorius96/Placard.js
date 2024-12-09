import Placard from './src/index';
import setUserSettings from './user-settings';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE # web.dev suggest to use this line onLY in non-PWA case

const { COLORS } = Placard.Views.Line.ENUMS;
const { degToRad, setAngle } = Placard.Helpers.Trigonometry;

document.addEventListener('DOMContentLoaded', ()=>{

    document.title = package_json.name;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});
        if (stage){

            // EXAMPLE # Here is where you instantiate Canvas "layer(s)" dynamically, rather than declaratively as writing <canvas> within index.html
            stage.add([
                new Placard.ViewGroup.Layer({name: 'grid', opacity: 0.25, hidden: !true})
                ,
                new Placard.ViewGroup.Layer({name: 'diagonals', hidden: true})
                ,
                new Placard.ViewGroup.Layer({name: 'polygon'})
                ,
            ]);
        
            if ( setViews(stage) ) window.addEventListener('resize', setViews.bind(null, stage)) ;

        }

});

function setViews(stage) {

    Placard
    .init({stage, stageScale: 25 /* <=== # thumb of rule is between 15-20 (in relative units) */})
    .on((context)=>{

        if ( setUserSettings(context)  ) {

            let canvas = context.canvas;
            switch (canvas.name) {

                case 'grid':
                    Placard.Views.Grid.draw({
                        canvas: stage.layers.grid, 
                        options: {
                            lineWidth: 2,
                        }}
                    );
                break;

                case 'polygon':
                    // DEV_NOTE # The line below control grouped (Layer-level) matrix transformation...
                    context.setTransform(...setAngle(0), stage.grid.X_IN_MIDDLE, stage.grid.Y_IN_MIDDLE);

                    canvas.stack = [
                        Placard.Views.Line.draw({
                            canvas,
                            options: {
                                strokeStyle: COLORS.red.value,
                                points: [ 
                                    [( 3 * stage.grid.GRIDCELL_DIM ) , ( 3 * stage.grid.GRIDCELL_DIM/*  * Placard.Views.Line.DEFAULT_SIN_ANGLE */ )],
                                ]
                            }
                        })
                        ,
                        Placard.Views.Line.draw({
                            canvas,
                            options: {
                                strokeStyle: COLORS.green.value,
                                points: [ 
                                    [( 3 * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE ) , ( 3 * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE )],
                                ]
                                ,
                                overrides: {
                                    transform: {
                                        angle: degToRad(45)
                                    }
                                }
                            }
                        })
                        ,
                        Placard.Views.Line.draw({
                            canvas,
                            options: {
                                strokeStyle: COLORS.blue.value,
                                points: [ 
                                    [( 3 * stage.grid.GRIDCELL_DIM ) , ( 3 * stage.grid.GRIDCELL_DIM/*  * Placard.Views.Line.DEFAULT_SIN_ANGLE */ )] 
                                ]
                                ,
                                overrides: {
                                    transform: {
                                        translation: {
                                            x: 3 * stage.grid.GRIDCELL_DIM,
                                            y: 3 * stage.grid.GRIDCELL_DIM,
                                        }
                                        ,
                                        angle: degToRad(0)
                                        ,
                                        scale: {
                                            x: -1,
                                            y: 1
                                        }
                                    }
                                }
                            }
                        })
                        ,
                    ]
                break;

                case 'diagonals':
                    // DEV_NOTE # we can write an idiomatic `canvas.stack` and assign an Array with items, whereas each item (if any), is a voided function with it's anonymous implementation:..
                    canvas.stack = [
                        void function () {

                            // PREREQUISITE # The `context.{translate|rotate|scale}` if any, goes before any paths...
                            // ...
            
                            context.beginPath();
                                context.moveTo(
                                    0
                                    , 
                                    0
                                );
                                context.lineTo(
                                    window.innerWidth * devicePixelRatio
                                    , 
                                    window.innerHeight * devicePixelRatio
                                );
                            context.closePath();
    
                            context.lineWidth = context.global.options.lineWidth;
                            context.strokeStyle = 'red';
                            context.fillStroke();
    
                        }()
                        ,
                        void function () {
    
                            // PREREQUISITE # The `context.{translate|rotate|scale}` if any, goes before any paths...
                            // ...
    
                            context.beginPath();
                                context.moveTo(
                                    window.innerWidth * devicePixelRatio
                                    , 
                                    0
                                );
                                context.lineTo(
                                    0
                                    , 
                                    window.innerHeight * devicePixelRatio
                                );
                            context.closePath();
                            
                            context.lineWidth = context.global.options.lineWidth;
                            context.strokeStyle = 'green';
                            context.fillStroke();
                        }()
                        ,
                    ];
                break;

            endswitch:;}

        endif:;}
        
    endon:;});

    return true;
    
}