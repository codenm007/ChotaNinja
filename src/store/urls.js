import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
let prev_urls = JSON.parse(localStorage.getItem("urls"));

let initial_data = [
    {
        "id": "618a11602ae526adc32ff4bc",
        "shortenedLink": "http://chotaninja.herokuapp.com/a887b37",
        "actualLink": "https://www.google.co.in/",
        "total_clicks": 0,
        "meta": {
            "title": "Google",
            "description": "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for."
        },
        "opensAt": "2021-11-09T12:30:52.777Z",
        "expiresAt": "2021-11-23T12:40:52.777Z"
    }];

let start_event = [];

if(prev_urls){ //cookie present so loading data from it 
    start_event = prev_urls;
}
if(!prev_urls){ // app loads for first time or cookie cleared
    start_event = initial_data;
}




const urls_slice = createSlice({
    name:'Url',
    initialState:start_event,
    reducers:{
        add_url(state,{payload}){
            state.push(payload);
        },
        refresh_total_clicks(state,{payload:index}){
            let urlIndex = state.findIndex((arrow) => arrow.id === index.id)
            state[urlIndex].total_clicks = index.total_clicks;
        },
        remove_url(state,{payload:index}){
            state.splice(index, 1);
        }
    }
});

export default urls_slice.reducer;
export const urls_actions = urls_slice.actions;
