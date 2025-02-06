export default class {

    static draw({context, Placard}){

        const 
            { COLORS } = Placard.Views.Line.ENUMS
            ,
            { degToRad } = Placard.Helpers.Trigonometry
            ;

        let { canvas } = context;

        return([
            ...[
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'line',
                        strokeStyle: COLORS.red.value,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) 
                                , 
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ]
                            .map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-90),
                                scale: {
                                    x: -1,
                                    y: -1
                                }
                            }
                        }
                    }
                })
                ,
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'vector',
                        strokeStyle: COLORS.red.value,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) 
                                , 
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ]
                            .map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-90)
                            }
                        }
                    }
                })
            ]
            ,
            ...[
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'line', /* DEV_NOTE # can be used with `arrowTip`  */
                        /* arrowTip : {baseLength : 20, capLength : 0, width : 20}, */// 1^[PASSING]
                        strokeStyle: COLORS.green.value,
                        lineWidth: context.global.options.lineWidth,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ].map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-45),
                                scale: {
                                    x: -1,
                                    y: -1
                                }
                            }
                        }
                    }
                })
                ,
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'vector', /* DEV_NOTE # can be used with `arrowTip`  */
                        /* arrowTip : {baseLength : 20, capLength : 0, width : 20}, */// 1^[PASSING]
                        strokeStyle: COLORS.green.value,
                        lineWidth: context.global.options.lineWidth,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ].map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-45)
                            }
                        }
                    }
                })
            ]
            ,
            ...[
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'line', /* DEV_NOTE # can be used with `arrowTip`  */
                        /* arrowTip : {baseLength : 20, capLength : 0, width : 20}, */// 1^[PASSING]
                        strokeStyle: 'purple',
                        lineWidth: context.global.options.lineWidth,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ].map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-45),
                                scale: {
                                    x: -1,
                                    y: 1
                                }
                            },
                        }
                    }
                })
                ,
                Placard.Views.Line.draw({
                    canvas,
                    options: {
                        kind: 'vector', /* DEV_NOTE # can be used with `arrowTip`  */
                        /* arrowTip : {baseLength : 20, capLength : 0, width : 20}, */// 1^[PASSING]
                        strokeStyle: 'purple',
                        lineWidth: context.global.options.lineWidth,
                        points: [ 
                            [
                                ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM ) , ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM )
                            ].map((each)=>each *= context.snapToGrid),
                        ]
                        ,
                        overrides: {
                            transform: {
                                angle: degToRad(-135)
                            }
                        }
                    }
                })
                ,
            ]
        ])

    }

}