import {createSlice} from '@reduxjs/toolkit';


const initial_day = {
    start_date:new Date().toISOString()
}

//console.log(initial_day);


const day_slice = createSlice({
    name:'day',
    initialState:initial_day,
    reducers:{
        update_date(state,action){
            state.start_date = action.payload;
        },
        prev_week(state){
            const today = new Date(state.start_date);
            state.start_date=new Date(today.getFullYear(), today.getMonth(), today.getDate()-7).toISOString();
            //console.log('inside reducer',state.start_date , 'today' , today);
        },
        next_week(state){
            const today =new Date(state.start_date);
            state.start_date=new Date(today.getFullYear(), today.getMonth(), today.getDate()+7).toISOString();
            //console.log('inside reducer',state.start_date , 'today' , today);
        }
    }
});

export default day_slice.reducer;
export const day_actions = day_slice.actions;
