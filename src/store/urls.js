import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
let prev_urls = JSON.parse(localStorage.getItem("urls"));

let initial_data = [];

let start_event = [];

if(prev_urls){ //cookie present so loading data from it 
    start_event = prev_urls;
}
if(!prev_urls){ // app loads for first time or cookie cleared
    start_event = initial_data;
}


const compareDescending  = (a,b) =>{
    if(new Date(b.createdAt) > new Date(a.createdAt)){
      return +1
    }else if (new Date(b.createdAt) < new Date(a.createdAt)){
      return -1
    }else{
      return 0;
    }
  }

const urls_slice = createSlice({
    name:'Url',
    initialState:start_event,
    reducers:{
        add_url(state,{payload}){
            let urlIndex = state.findIndex((arrow) => arrow.id === payload.id);
           
            if(urlIndex === -1){
                state.push(payload);
            }

            state.sort(compareDescending);

        },
        clear_local(state){
            state = [];
        },
        refresh_total_clicks(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].total_clicks = index.total_clicks;
        },
        change_url_name(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].shortenedLink = index.shortenedLink;
        },
        url_sync_success(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].is_synced = true;
        },
        block_url(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].is_blocked = index.is_blocked;
        },
        delete_url(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state.splice(urlIndex,1);
        },
        passworded(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].is_passworded = !state[urlIndex].is_passworded;
        },
        remove_url(state,{payload:index}){
            state.splice(index, 1);
        }
    }
});

export default urls_slice.reducer;
export const urls_actions = urls_slice.actions;
