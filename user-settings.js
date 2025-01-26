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
                    /* 
                        EXAMPLE : Conventionally we define Placard-specific properties, where each property's key is in "['key'] : value" form, otherwise it's Canvas API reflective key(s) e.g. "strokeStyle: 3"
                    */
                    ['ejectXY']: false,
                    ['startAtQ1']: true,
                    ['responsiveValue']: Placard.getResponsiveRatio({context}),
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
        const slider = globalThis.slider = GUI.find( GUI.addGroup({ open: true, label: false, name: 'slider', nodes: GUI.addSection({sectionCount: 1, accessor: 'slot', flex_direction: 'row'}) }) ); 
                slider
                .children
                .slot1.append(...[
                    new Label('rotation')
                    ,
                    new Input({
                        name: slider.name, 
                        attrs: {
                            value: DEFAULT_ANGLE, min: 0, max: 360, step: 1
                        }
                    })
                ]);

        if ( !screen.orientation.type.includes('portrait') ){

            GUI.addEventListener('dblclick', async function(){
                
                
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

            })

        }

    export {
        GUI
    }
    
/* === wc-pane === */
