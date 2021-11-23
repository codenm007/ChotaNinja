import axios from "axios";
import { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Particles from 'react-particles-js';
import { particle_js_config } from '../config/particle';
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { urls_actions } from "../store/urls";
import Typist from 'react-typist';
import ninjapic from "../ninja.png";
import isLoggedIn from "../functions/isLoggedIn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import {Link } from 'react-router-dom';

//importing components
import RenameUrl from "./renameurlComponent";
import GetTrackingInfo from "./GetTrackingInfo";
import BlockUrl from "./BlockUrlComponent";
import PassWordedLinks from "./PasswordedLinks";

const Home = () => {

  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);
  

  const getTotalClicks = (id) => {
    console.log(id, 9878);
    const body = {
      id: id
    }
    axios({
      method: 'post',
      url: "urls/anonymous/totalClicks",
      data: body,
    }).then(response => {

      dispatch(urls_actions.refresh_total_clicks({ id: id, total_clicks: response.data.data.total_clicks }));

    }).catch(err => {

      dispatch(urls_actions.refresh_total_clicks({ id: id, total_clicks: "NA" }));
    })
  }

  const syncLocalUrls = (id) =>{
    const body = {
      url_id: id
    }
    axios({
      method: 'post',
      url: "urls/syncUserurls",
      data: body,
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    }).then(() => {
      dispatch(urls_actions.url_sync_success({ id: id}));

    }).catch(err => {
      console.log(err , 99);
      cogoToast.error("Syncing of urls failed");
    })
  }

 const getSyncedUrls = (urls) =>{
   console.log(12488)
   
  axios({
    method: 'get',
    url: "urls/mylinks",
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
  }).then((data) => {
    

    let accountUrls = data.data.data;
    
    //this case will only happen when this two are not synced
    
   

    
    if(JSON.stringify(accountUrls) != JSON.stringify(urls)){

      console.log("NILANJAN21211212121212221121212")

      accountUrls.map(accUrl =>{
        console.log(accUrl , "acclUrl");
        if(urls.length == 0){
          dispatch(urls_actions.add_url(accUrl));
          
          
        }else{
          urls.map(localUrl =>{
          //  console.log(localUrl , 92933029);
            if(localUrl.id != accUrl.id){
              console.log("unmatched urls from cloud" , accUrl.id, localUrl.id);
              dispatch(urls_actions.add_url(accUrl));
              
            }
          })
        }

      })

      localStorage.setItem("syncStore",true);

    }
  
    // dispatch(urls_actions.clear_local());
    // if(urls.length == 0){
    //   accountUrls.map(accUrl =>{
    //     console.log(accUrl,878787)
    //     dispatch(urls_actions.add_url(accUrl));
    //   });
    // }
    


  }).catch(err => {
    console.log(err , 9976);
    cogoToast.error("getting cloud urls failed");
  })
 }


   useEffect(()=>{

    if(isLoggedIn()){
      const SyncStore = localStorage.getItem("syncStore");
      console.log(SyncStore,"sync store")
      if(SyncStore == null){
        getSyncedUrls(urls); //getting your account urls
      }
    }
  },[urls])


    urls.forEach(async url => {
      getTotalClicks(url.id);
      if(isLoggedIn()){ //if logged in then starting cloud processes
        
        console.log(!url.is_synced,88)
        if(!url.is_synced){ // syning urls if user urls are not synced 
          cogoToast.success("Syncing Urls with your account !");
          syncLocalUrls(url.id); 
        }
      }  
    })
     localStorage.setItem("urls", JSON.stringify(urls));  
 
      //syncing and updating things

   
    




  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date(+new Date() + 1 * 365 * 24 * 60 * 60 * 1000));
  const [Link, setLink] = useState("");
  const [count, setCount] = useState(1);


  useEffect(() => {
    // document.title = `You clicked ${count} times`;
    setCount(1);
  }, [count]);

  const shortenLink = () => {
    if(Link.length == 0){
      return cogoToast.error("Please paste your link !"); 
    }
    const body = {
      redirects_to: Link,
      will_open_at: startDate,
      will_expire_at: EndDate
    }
    axios({
      method: 'post',
      url: "urls/anonymous/shortner",
      data: body,
    }).then(response => {

      // const url = response.data.redirectSite;
      // //taking user to redirected url
      // window.location.href = url;
      const newUrl = response.data.data;
      console.log(newUrl,992334)
      if(newUrl){
        try{
          dispatch(urls_actions.add_url(newUrl));
        }catch(err){
          console.log(err,27328)
        }
        
       
        cogoToast.success("Yaah ! Link shortened successfully !");
      }
      
      //setLink("");
      // set_show_urls(false);
    }).catch(err => {
       console.log(err , 9911)
      cogoToast.error(err.response.data.message, { position: 'top-right', hideAfter: 4 });
    })
  }


  const copytoClipboard = (text) => {
    navigator.clipboard.writeText(text);
    cogoToast.success("Link copied to clipboard !");
  }
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <>
      <Particles params={particle_js_config} />
      {
        <Container>
          <div style={{
            marginTop: "100px",
            position: "absolute",
            top: 0,
            width: "90%",
            height: "auto"
          }}>
            <div >
              <Row >
                <Col sm={9} md={9} className="d-flex justify-content-end"><div style={{ fontSize: "100px", fontWeight: 500, color: "wheat" }}>Welcome to Chota</div> </Col>
                <Col sm={3} md={3} className="d-flex justify-content-start"><img src={ninjapic} width="100px" height="120px" style={{ float: "left" }} /></Col>
              </Row>
              <Row >
                {count ? (
                  <div className="d-flex justify-content-center">
                    <Typist cursor={{ show: false }} avgTypingDelay={90} onTypingDone={() => setCount(0)}>
                      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}> Create shortlinks that expire !
                        <Typist.Backspace count={41} delay={800} />
                        Complete link demographics
                        <Typist.Backspace count={40} delay={1600} />
                        All Links are <span style={{ color: "#35BF09" }}>ENCRYPTED</span> on DB
                        <Typist.Backspace count={40} delay={3200} />
                        More features on the way
                      </div>
                    </Typist>
                  </div>
                ) : (
                  ""
                )}
              </Row>

            </div>
          </div>

          <div style={{
            marginTop: "380px",
            position: "absolute",
            top: 0,
            width: "90%",
            height: "auto",


          }}>
            <div >
              <Row>
                <Col sm={12} md={10} >
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Paste your url here like https://google.co.in!"
                      aria-label="Paste your url here like https://google.co.in!!"
                      aria-describedby="basic-addon2"
                      onChange={(event) => setLink(event.target.value)}
                    />

                  </InputGroup>
                </Col>
                <Col sm={12} md={2} >
                  <Button onClick={() => {
                    console.log("hi")
                    shortenLink();
                  }} >
                    Shorten it
                  </Button>
                </Col>
              </Row>
              <Row>
              <Col sm={12} md={6} className="d-flex justify-content-end">
                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeClassName={handleColor}
                  />
                </Col>

                <Col sm={12} md={6} >

                  <DatePicker
                    showTimeSelect
                    selected={EndDate}
                    onChange={(date) => setEndDate(date)}
                    timeClassName={handleColor}
                  />
                </Col>
              </Row>


            </div>

            <div className="my-3">
              {urls.map(j => {
                return (
                  // <div>{j.meta.description}</div>
                  <Card style={{ width: '90.3%', marginTop: "20px", marginLeft: "35px", opacity: "0.8" }}>
                    <Card.Body>

                      <Card.Title>{j.meta.title} {j.is_synced?<span className ="px-2"><FontAwesomeIcon icon={faCloudUploadAlt} style={{color:"#4db8ff"}} /></span>:""}</Card.Title>
                      <p>{j.meta.description}</p>
                      <div style={{ float: "right" }}>
                        <h6>Opens on :   {`${new Date(j.opensAt)}`}</h6>
                        <h6>Expires on : {`${new Date(j.expiresAt)}`}</h6>
                      </div>
                      <br />
                      <Card.Text>
                        <h6 style={{ color: "grey" }}>{j.actualLink}</h6>
                        <hr />
                        <h5 style={{ color: "red", cursor: "copy" }}><div className={{ color: "red" }} onClick={() => copytoClipboard(j.shortenedLink)}>{j.shortenedLink}</div></h5>
                      </Card.Text>
                      <RenameUrl id = {j.id}/>
                      {isLoggedIn()?(
                        <>
                      <span className = "px-2">
                      <BlockUrl id = {j.id} />
                      </span>
                      <span className = "px-2">
                      <PassWordedLinks id = {j.id} password ={j.is_passworded}/>
                      </span>
                      </>
                      ):(
                        <>
                        <span>
                          <a href="/login" className = "px-3" style ={{textDecoration:"none",fontWeight:"bold"}}>
                            Register for more features
                          </a>
                        </span>
                        </>
                      )}

                      {/* <Button 
                      variant="primary" 
                      onClick = {()=>GetTrackingInfofun(j.id)}
                      disabled = {Trackingdisabled}
                      className="float-end">
                        Clicks <Badge bg="secondary">{j.total_clicks}</Badge>
                        <span className="visually-hidden">Clicks</span>
                      </Button> */}
 
                      < GetTrackingInfo id = {j.id} totalClicks = {j.total_clicks} shortUrl = {j.shortenedLink} />

                      
                    </Card.Body>
                  </Card>
                  )
              }).sort().reverse()}
            </div>
          </div>

        </Container>
      }
    </>
  );
};

export default Home;
