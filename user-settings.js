import { HUD, Input, Label } from '@wc-pane/index.js';

/** 
 * **EXPLAINER** : Herein you define your global user's (developer's) settings
 */
export default class {

    static #snapToGrid = Math.sin(Math.PI/4);

    static init({context}){

        context.snapToGrid = this.#snapToGrid;

        Object.assign(context, {
            global: {
                options: {
                    scalingValue: 4,
                    lineWidth: 4,
                    strokeStyle: 'grey',
                }
            },
        })
    
        return true;

    }

}

/* === wc-pane === */
    const 
        DEFAULT_ANGLE = 0
        ,
        GUI = new HUD({container: document.body, draggable: true, hidden: /* ! */true})
            
            const rotator = GUI.find( 

                GUI.addGroup({ open: true, label: !false, name: 'rotation', nodes: GUI.addSection({sectionCount: 2, accessor: 'slot', flex_direction: 'row'}) })
                
            ); 
            rotator
            .children
            .slot1.append(...[
                new Label('rotator')
                ,
                new Input({
                    name: rotator.name, 
                    attrs: {
                        value: DEFAULT_ANGLE, min: 0, max: 360, step: 1
                    }
                })
            ]);
                
                // EXAMPLE # showing how to add <details> foldable element via addGroup call and nested under direct parent given 


            const rotatorSense = GUI.find(

                GUI.addGroup({ 
                    nestedUnder: rotator.children.slot2
                    , 
                    open: true, label: !false, name: `sense`, nodes: GUI.addSection({sectionCount: 1, accessor: 'slot', flex_direction: 'row'}) 
                })

                );
                rotatorSense.children.slot1.append(...[
                    new Label('sensor')
                    ,
                    new Input({
                        name: rotatorSense.name,
                        type: 'checkbox',
                        attrs: {cboxScaling: 1.0}
                    })
                ]);

    export {
        GUI
    }
    
/* === wc-pane === */
