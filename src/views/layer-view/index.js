import setStyling from './index.css.js';

/**
 * > **NOTE** : `layer-view` is direct child of conceptual top-level ViewGroup.Stage web-component
*/

export const layer_view = (new URL(import.meta.url)).pathname.split('/').at(-2);
customElements.define(layer_view, class extends HTMLCanvasElement {
    
    constructor({name, opacity, hidden}){

        if ( setStyling.call( super(), {opacity, hidden} ) ) {

            this.name = name;
            this.id = this.name;

        }

    }

    connectedCallback(){

        Object.assign(this.getContext('2d'), {

            fillStroke() {
                this.fill();
                this.stroke();

                return true;
            }

        });   

    }

}, {extends: 'canvas'})