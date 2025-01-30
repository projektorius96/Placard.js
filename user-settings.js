import Placard from './src/index';
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
                    scalingValue: 3,
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
        GUI = new HUD({container: document.body, draggable: true, hidden: !true})
            
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
        
        if ( !screen.orientation.type.includes('portrait') ){

            GUI.addEventListener('dblclick', async function(e){

                if (e.ctrlKey){

                    const pipWindow = await documentPictureInPicture.requestWindow({
                        disallowReturnToOpener: true,
                        preferInitialWindowPlacement: !true,
                        width: this.getBoundingClientRect()['width'],
                        height: this.getBoundingClientRect()['height'],
                    });
    
                    const { justifySelf, position } = getComputedStyle(this);
                        this.style.position = 'static';
                        this.style.justifySelf = 'stretch';
                    pipWindow.document.body.appendChild(GUI);
                    pipWindow.document.body.style.overflow = 'hidden';
                    pipWindow.addEventListener("pagehide", (event) => {
                        
                        this.style.position = position; 
                        this.style.justifySelf = justifySelf; 
                        document.body.appendChild(GUI);
    
                    });

                }
                                
            })

        }

    export {
        GUI
    }
    
/* === wc-pane === */
