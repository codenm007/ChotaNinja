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
import { faCloudUploadAlt,faLock } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css'
import './home.css';
//importing components
import RenameUrl from "./renameurlComponent";
import GetTrackingInfo from "./GetTrackingInfo";
import BlockUrl from "./BlockUrlComponent";
import DeleteUrl from "./deleteComponent";
import PassWordedLinks from "./PasswordedLinks";
import QRCODE from './showQR';

const Home = () => {

  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);
  

  const getTotalClicks = (id) => {
    
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
      // console.log(err , 99);
      cogoToast.error("Syncing of urls failed");
    })
  }

 const getSyncedUrls = (urls) =>{
  
   
  axios({
    method: 'get',
    url: "urls/mylinks",
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
  }).then((data) => {
    

    let accountUrls = data.data.data.sort(compareDescending);
    
    //this case will only happen when this two are not synced
    
   

    
    if(JSON.stringify(accountUrls) != JSON.stringify(urls)){

    

      accountUrls.map(accUrl =>{
        
        if(urls.length == 0){
          dispatch(urls_actions.add_url(accUrl));
          
          
        }else{
          urls.map(localUrl =>{
          //  console.log(localUrl , 92933029);
            if(localUrl.id != accUrl.id){
              
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
    
    cogoToast.error("getting cloud urls failed");
  })
 }


   useEffect(()=>{

    if(isLoggedIn()){
      const SyncStore = localStorage.getItem("syncStore");
      //console.log(SyncStore,"sync store")
      if(SyncStore == null){
        getSyncedUrls(urls); //getting your account urls
      }
    }
  },[urls])


    urls.forEach(async url => {
      getTotalClicks(url.id);
      if(isLoggedIn()){ //if logged in then starting cloud processes
        
        // console.log(!url.is_synced,88)
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
      
      if(newUrl){
        try{
          dispatch(urls_actions.add_url(newUrl));
        }catch(err){
          
        }
        
       
        cogoToast.success("Yaah ! Link shortened successfully !");
      }
      
      //setLink("");
      // set_show_urls(false);
    }).catch(err => {
       
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

  const compareDescending  = (a,b) =>{
    if(new Date(b.createdAt) > new Date(a.createdAt)){
      return +1
    }else if (new Date(b.createdAt) < new Date(a.createdAt)){
      return -1
    }else{
      return 0;
    }
  }

  return (
    <>
      <Particles params={particle_js_config} />
      {
        <Container>
          <div style={{
            marginTop: "170px",
            position: "absolute",
            top: 0,
            width: "90%",
            height: "auto"
          }}>
            {/* desktop view */}
            <div className = "d-none d-md-block" >
              <Row >
                <Col sm={9} md={9} className="d-flex justify-content-end"><div style={{ fontSize: "100px", fontWeight: 500, color: "wheat" }}>Welcome to Chota</div> </Col>
                <Col sm={3} md={3} className="d-flex justify-content-start"><img src={ninjapic} width="100px" height="120px" style={{ float: "left" }} /></Col>
              </Row>
              <Row >
                {count ? (
                  <div className="d-flex justify-content-center" >
                    <Typist cursor={{ show: false }} avgTypingDelay={90} onTypingDone={() => setCount(0)}>
                      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}> Create shortlinks that expire !
                        <Typist.Backspace count={41} delay={800} />
                        Complete link demographics
                        <Typist.Backspace count={40} delay={1600} />
                        All Links are <span style={{ color: "#35BF09" }}>ENCRYPTED</span> on DB
                        <Typist.Backspace count={40} delay={3200} />
                        Passworded Links <span style={{ color: "#35BF09" }}> <FontAwesomeIcon icon={faLock} /> </span>
                        
                      </div>
                    </Typist>
                  </div>
                ) : (
                  ""
                )}
              </Row>
                
            </div>
            {/* mobile view */}
            <div className = "d-xs-block d-sm-block d-md-none" >
              <Row className="d-flex justify-content-center" >
              <Col className="d-flex justify-content-center">
                <div style={{ fontSize: "35px", fontWeight: 500, color: "wheat" }}>Welcome to Chota </div> 
                <img src={ninjapic} className="mx-2" width="50px" height="60px"/>
                </Col>
              </Row>
              <Row >
                {count ? (
                  <div className="d-flex justify-content-center">
                    <Typist cursor={{ show: false }} avgTypingDelay={90} onTypingDone={() => setCount(0)}>
                      <div style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}> Create shortlinks that expire !
                        <Typist.Backspace count={41} delay={800} />
                        Complete link demographics
                        <Typist.Backspace count={40} delay={1600} />
                        All Links are <span style={{ color: "#35BF09" }}>ENCRYPTED</span> on DB
                        <Typist.Backspace count={40} delay={3200} />
                        Passworded Links <span style={{ color: "#35BF09" }}> <FontAwesomeIcon icon={faLock} /> </span>
                        
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
            marginTop: "390px",
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
                  <span className="d-flex justify-content-start">
                  <Button onClick={() => {
                    
                    shortenLink();
                  }} >
                    Shorten it
                  </Button>
                  </span>
                  
                </Col>
              </Row>
              <Row>
              <Col sm={12} md={6} >
                <div className="d-none d-md-block ">
                  <div className="d-flex justify-content-end">
                  <DatePicker
                    wrapperClassName = "datepicker"
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeClassName={handleColor}
                    
                  />
                  </div>
                  </div>
                  <div className="d-sm-block d-md-none ">
                  <DatePicker
                    wrapperClassName = "datepicker"
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeClassName={handleColor}
                    
                  />
                  </div>
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
              {urls
              .map(j => {
                return (
                  // <div>{j.meta.description}</div>
                  <Card key={j.id} style={{ width: '90.3%', marginTop: "20px", marginLeft: "35px", opacity: "0.8" }}>
                    <Card.Body>

                      <Card.Title>{j.meta.title} {j.is_synced?<span className ="px-2"><FontAwesomeIcon icon={faCloudUploadAlt} style={{color:"#4db8ff"}} /></span>:""}</Card.Title>
                      <p style={{overflow:"hidden"}}>{j.meta.description}</p>
                      <div style={{ float: "right" }}>
                        <h6>Opens on :   {`${new Date(j.opensAt).toLocaleString('en-IN')}`}</h6>
                        <h6>Expires on : {`${new Date(j.expiresAt).toLocaleString('en-IN')}`}</h6>
                      </div>
                      <br />
                      <Card.Text>
                        <h6 style={{ color: "grey" }}>{j.actualLink}</h6>
                        <hr />
                        <h5 style={{ color: "red", cursor: "copy" }}><div className={{ color: "red" }} onClick={() => copytoClipboard(j.shortenedLink)}>{j.shortenedLink}</div></h5>
                      </Card.Text>
                      <span>
                      <RenameUrl id = {j.id}/>
                      <QRCODE link = {j.shortenedLink} />
                      </span>
                      {isLoggedIn()?(
                        <>
                        
                      <span style = {{marginLeft:"0.8rem" }}>
                      <DeleteUrl  id = {j.id} />
                      </span>
                      <span className = "px-2 d-none d-md-inline-block">
                      <BlockUrl  id = {j.id} />
                      </span>
                      <span className = "px-2  d-none d-md-inline-block">
                      <PassWordedLinks  id = {j.id} password ={j.is_passworded}/>
                      </span>

                      <div className = "d-sm-block d-md-none " style={{paddingTop:"20px" , paddingLeft:"10px"}}>
                      <BlockUrl  id = {j.id} />
                     
                      </div>
                      <div className = "d-sm-block d-md-none " style={{paddingTop:"20px",paddingBottom:"30px"}}>
                      <PassWordedLinks  id = {j.id} password ={j.is_passworded}/>
                      </div>
                      </>
                      ):(
                        <>
                        
                        <span className="d-none d-md-inline-block" >
                          
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
 
                      < GetTrackingInfo  id = {j.id} totalClicks = {j.total_clicks} shortUrl = {j.shortenedLink} />
                      {!isLoggedIn()?(
                                              <div className = "d-sm-block d-md-none " style ={{textDecoration:"none",fontWeight:"bold" , paddingTop:"20px"}} >
                                              <a href="/login"  >
                                                Register for more features
                                              </a>
                                            </div>
                      ):""}

                    </Card.Body>
                  </Card>
                  )
              })
              }
            </div>
          </div>

        </Container>
      }
    </>
  );
};

export default Home;
