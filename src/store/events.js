import {createSlice} from '@reduxjs/toolkit';

let prev_todos = JSON.parse(localStorage.getItem("todos"));

console.log(prev_todos,"prev_todos")

let initial_data = [{
    id:"asda88dsdsa",
    created_at:new Date().toISOString(),
    description:'Demo_Task 1',
    is_completed:false
},
{
    id:"asdasssdsdsa",
    created_at:new Date().toISOString(),
    description:'Demo_Task 2',
    is_completed:false
},
{
    id:"asdasssdsd333sa",
    created_at:"2021-05-12T14:03:53.495Z",
    description:'Demo_Task previous scheduled 2',
    is_completed:false
}];

let start_event = [];

if(prev_todos){ //cookie present so loading data from it 
    start_event = prev_todos;
}
if(!prev_todos){ // app loads for first time or cookie cleared
    start_event = initial_data;
}




const events_slice = createSlice({
    name:'day',
    initialState:start_event,
    reducers:{
        add_event(state,{payload}){
            state.push(payload);
        },
        mark_as_done(state,{payload:index}){
            state[index].is_completed = !state[index].is_completed;
        },
        remove_event(state,{payload:index}){
            state.splice(index, 1);
        }
    }
});

export default events_slice.reducer;
export const event_actions = events_slice.actions;
