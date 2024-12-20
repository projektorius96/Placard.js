import Placard from '../src/index';

export default class {

    static draw({context, degToRad, COLORS}){

        let { canvas } = context;

        return([
            Placard.Views.Line.draw({
                canvas,
                options: {
                    strokeStyle: COLORS.red.value,
                    points: [ 
                        [( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM/*  * Placard.Views.Line.DEFAULT_SIN_ANGLE */ )],
                    ]
                }
            })
            ,
            Placard.Views.Line.draw({
                canvas,
                options: {
                    strokeStyle: COLORS.green.value,
                    points: [ 
                        [( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE )],
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
                        [( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )] 
                    ]
                    ,
                    overrides: {
                        transform: {
                            translation: {
                                x: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM,
                                y: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM,
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
        ])

    }

}