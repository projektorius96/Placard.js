import Placard from '../src/index';
export default class {

    static draw({context, kind = 'ring' /* kind =: {'ring'|'circle'} */}){

        const 
            { COLORS } = Placard.Views.Line.ENUMS
            ,
            { setRange } = Placard.Helpers.Misc
            ;
        
        return ([
            setRange(0, 0.1 /* <=== cheap 'anti-aliasing' */, 720, false)
            .forEach((point)=>{
                    let scalar = ( context.global.options.scalingValue * stage.grid.GRIDCELL_DIM );
                    Placard.Views.Line.draw({
                        canvas: context.canvas,
                        options: {
                            kind,
                            strokeStyle: COLORS.green.value,
                            points: [ 
                                [scalar * Math.cos(point) , scalar * Math.sin(point)],
                            ],
                            overrides: {
                                transform: {
                                    // DEV_NOTE # without this, the 'ring' would look more like an oval, rather a circle, thus we have to rotate it 45 degrees
                                    angle: (point >= 360 ? 45 : 0)
                                }
                            }
                        }
                    })
            })
            ,
        ])
    }

}