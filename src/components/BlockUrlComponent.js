import {Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";
import Switch from "react-switch";



const BlockUrl = ({id}) =>{
    const dispatch = useDispatch();
    const [LinkBlockStatus, SetLinkBlockedStatus] = useState(false);
   

    const BlockUrlfun = (id) => {      
      const body = {
        url_id: id
      }
      
      axios({
        method: 'post',
        url: "urls/blockUrl",
        data: body,
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      }).then(response => {
        cogoToast.success(response.data.message);

        
        
        //changing url name
        dispatch(urls_actions.block_url({ id: id, is_blocked: response.data.data.linkBlockStatus }));
        
        //closing the modal
        SetLinkBlockedStatus(response.data.data.linkBlockStatus);

        
    
      }).catch(err => {

        cogoToast.error(err.response.data.message);
        // console.log(err,999);
      })
    }

  
    return ( 
      <>
      <label>
        <span className ="px-2" style={{fontWeight:"bold"}}>Block Url</span>
        <Switch
          onChange={()=>BlockUrlfun(id)}
          checked={LinkBlockStatus}
          className="react-switch"
        />
      </label>
      </>
    );
}

export default BlockUrl;