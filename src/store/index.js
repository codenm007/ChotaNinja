import {configureStore} from '@reduxjs/toolkit';

// import counter_reducer from './counter';

 import day_slice from './calendar.js';
 import events_slice from './events.js';

const store = configureStore({
    reducer:{day:day_slice,events:events_slice}
});



export default store;