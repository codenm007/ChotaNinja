import axios from "axios";
import { useState, useEffect } from "react";
import { InputGroup , FormControl,Button, Container,Row,Col,Card,Badge} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Particles from 'react-particles-js';
import {particle_js_config} from '../config/particle';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";



const Home = () => {

  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);
  

  const getTotalClicks = (id) =>{
    console.log(id,9878);
    const body = {
      id:id
    }
    axios({
      method: 'post',
      url: "urls/anonymous/totalClicks",
      data: body,
    }).then(response =>{
      
      dispatch(urls_actions.refresh_total_clicks({id:id,total_clicks:response.data.data.total_clicks}));

    }).catch(err =>{
        
      dispatch(urls_actions.refresh_total_clicks({id:id,total_clicks:"NA"}));
    })
  }
  //syncing total clicks 
  urls.forEach(async url =>{
   getTotalClicks(url.id);
  })
  localStorage.setItem("urls",JSON.stringify(urls));

  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date(+new Date() + 1*365*24*60*60*1000));
  const [Link, setLink] = useState("https://google.co.in");
 
  
  const shortenLink = () =>{
    console.log("hi", startDate,"44",EndDate,"55",Link);
    const body = {
      redirects_to:Link,
      will_open_at:startDate,
      will_expire_at:EndDate
    }
    axios({
      method: 'post',
      url: "urls/anonymous/shortner",
      data: body,
    }).then(response =>{
      console.log(response.data.data,888)
      // const url = response.data.redirectSite;
      // //taking user to redirected url
      // window.location.href = url;
       dispatch(urls_actions.add_url(response.data.data));
      cogoToast.success("Yaah ! Link shortened successfully !");
      // set_show_urls(false);
    }).catch(err =>{
       // console.log(err , 9911)
        cogoToast.error(err.response.data.message,{position:'top-right',hideAfter:4});
    })
  }

  const copytoClipboard = (text) =>{
    navigator.clipboard.writeText(text);
    cogoToast.success("Link copied to clipboard !");
  }
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  console.log(new Date(startDate).toISOString(),77788,new Date(EndDate).toISOString(),232323)
    return (
     <>
  <Particles params={particle_js_config} />
      {
        <Container>

        <div style = {{marginTop:"380px",
       position: "absolute",
       top: 0,
       width: "100%",
       height: "100%"
      }}>
        <div >
            <Row>
                <Col sm = {12} md = {10} >
                <InputGroup className="mb-3">
    <FormControl
      placeholder="Paste your url here like https://google.co.in!"
      aria-label="Paste your url here like https://google.co.in!!"
      aria-describedby="basic-addon2"
      onChange = {(event)=>setLink(event.target.value)}
    />
   
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeClassName={handleColor}
    />
    
    <DatePicker
      showTimeSelect
      selected={EndDate}
      onChange={(date) => setEndDate(date)}
      timeClassName={handleColor}
    />

    
  </InputGroup>
                </Col>
                <Col sm = {12} md = {2} >
                <Button onClick={() => {
                              console.log("hi")
                                shortenLink();
                              }} >
      Shorten it
  </Button>
                </Col>
            </Row>
            
        </div>
        
        <div className ="my-3">
          {urls.map(j =>{
            return(       
           <Card style={{ width: '92.3%',marginTop:"20px" }}>
            <Card.Body>
            
              <Card.Title>{j.meta.title}</Card.Title>
              <p>{j.meta.description}</p> 
              <div style = {{float:"right"}}>
                <h6>Opens on :   {`${new Date(j.opensAt)}`}</h6>
                <h6>Expires on : {`${new Date(j.expiresAt)}`}</h6>
              </div>
              <br/>
              <Card.Text>
                <h6 style ={{color:"grey"}}>{j.actualLink}</h6>
                <hr/>
                <h5 style ={{color:"red",cursor:"copy"}}><div className = {{color:"red"}} onClick = {()=>copytoClipboard(j.shortenedLink)}>{j.shortenedLink}</div></h5>
              </Card.Text>
              <Button variant="primary" className = "float-end">
            Clicks <Badge bg="secondary">{j.total_clicks}</Badge>
            <span className="visually-hidden">Clicks</span>
          </Button>
            </Card.Body>
          </Card>)
          })}
        </div>
        </div>
        
        </Container>
}
        </>
    );
  };
  
  export default Home;
  