import Placard from '../src/index';

export default class {

    static draw({context}) {

        const 
            { COLORS } = Placard.Views.Line.ENUMS
            ,
            { degToRad } = Placard.Helpers.Trigonometry
            ;

        let { canvas } = context;
        return([
            Placard.Views.Line.draw({
                canvas,
                options: {
                    strokeStyle: COLORS.red.value,
                    points: [ 
                        [
                            ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid )
                        ],
                    ]
                }
            })
            ,
            Placard.Views.Line.draw({
                canvas,
                options: {
                    strokeStyle: COLORS.green.value,
                    points: [ 
                        [
                            ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * Placard.Views.Line.RIGHTANGLE_SLOPE )
                        ].map((each)=>each  *= context.snapToGrid),
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
                        [
                            ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid )
                        ] 
                    ]
                    ,
                    overrides: {
                        transform: {
                            translation: {
                                x: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid,
                                y: context.global.options.scalingValue * stage.grid.GRIDCELL_DIM * context.snapToGrid,
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