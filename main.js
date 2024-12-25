import Placard from './src/index';
import setViews from './implementation/index';
import package_json from './package.json' with {type: 'json'}; // DEV_NOTE (1.1, see@1.2) # web.dev highly suggests to use this line only in non-PWA case

document.addEventListener('DOMContentLoaded', ()=>{

    ///* # (@1.2) */
    document.title = package_json.name;

    const stage = new Placard.ViewGroup.Stage({/* container: document.body */});
        if ( stage && setViews(stage) ) window.addEventListener('resize', setViews.bind(null, stage)) ;

});