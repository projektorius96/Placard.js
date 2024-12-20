import Placard from '../src/index';

export default class {

    static draw({context}){

        const 
            { COLORS } = Placard.Views.Line.ENUMS
            ,
            { ident, reversed_ident } = Placard.Views.Wireframe.ENUMS.TYPE
            ;

        let { canvas } = context;
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
        ]);

    }

}