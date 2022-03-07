import {configureStore} from '@reduxjs/toolkit';

// import counter_reducer from './counter';


 import urls_slice from './urls.js';

const store = configureStore({
    reducer:{urls:urls_slice}
});



export default store;