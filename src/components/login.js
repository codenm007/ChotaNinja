import {Container,Button} from "react-bootstrap";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import "./login.css";
const Login = () => {

   const onGoogleSuccess = (response) => {
      const access_token = response.tokenId;

      
      axios({
         method: 'post',
         url: "user/auth/google",
         data: { 
            "token":response.tokenId
          }
      }).then((res) => {
        const { user, token } = res.data.data;
        
        // Save the JWT inside a cookie
        localStorage.setItem('token', token);

        window.location.href = "/"
      }).catch((err) => {
         
       // throw new Error(err);
      })
    }
    const onGoogleFailure = (err) => {
      //  console.log(err,99900909);
    }
return(
    <>
<div className="card">
   <form>
      <h2 className="title"> Namaste!</h2>
      <p className="subtitle"> Chaliye suru karteh hai !</p>

      <div className="social-login">

         <GoogleLogin 
        clientId="199477342550-hurgvv8q5ud9lgv9megn131k5b9pvf8c.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        className="google-login-button" />
      
      </div>
   </form>
</div>
    </>
)
}

export default Login;