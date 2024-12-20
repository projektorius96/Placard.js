import Placard from '../src/index';

export default class {

    static draw({context, COLORS}){

        let { canvas } = context;
        const { ident, reversed_ident } = Placard.Views.Wireframe.ENUMS.TYPE

        return ([
            Placard.Views.Wireframe.draw({
                canvas,
                options: {
                    type: ident.value
                }
            })
            ,
            Placard.Views.Wireframe.draw({
                canvas,
                options: {
                    type: reversed_ident.value,
                    strokeStyle: COLORS.red.value
                }
            })
            ,
        ])

    }

}