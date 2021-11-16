import {Container,Button} from "react-bootstrap";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import "./login.css";
const Login = () => {

   const onGoogleSuccess = (response) => {
      const access_token = response.tokenId;

      console.log(response,"token")
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
         console.log(err,99);
       // throw new Error(err);
      })
    }
    const onGoogleFailure = (err) => {
       console.log(err,99900909);
    }
return(
    <>
<div className="card">
   <form>
      <h2 className="title"> Log in / Sign up</h2>
      <p className="subtitle">Don't have an account? ,Lets get started !</p>

      <div className="social-login">

         <GoogleLogin 
        clientId="199477342550-hurgvv8q5ud9lgv9megn131k5b9pvf8c.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        className="google-login-button" />
         <button className="fb-btn">
         <img alt="FB" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI5MS4zMTkgMjkxLjMxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkxLjMxOSAyOTEuMzE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojM0I1OTk4OyIgZD0iTTE0NS42NTksMGM4MC40NSwwLDE0NS42Niw2NS4yMTksMTQ1LjY2LDE0NS42NmMwLDgwLjQ1LTY1LjIxLDE0NS42NTktMTQ1LjY2LDE0NS42NTkNCgkJUzAsMjI2LjEwOSwwLDE0NS42NkMwLDY1LjIxOSw2NS4yMSwwLDE0NS42NTksMHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTE2My4zOTQsMTAwLjI3N2gxOC43NzJ2LTI3LjczaC0yMi4wNjd2MC4xYy0yNi43MzgsMC45NDctMzIuMjE4LDE1Ljk3Ny0zMi43MDEsMzEuNzYzaC0wLjA1NQ0KCQl2MTMuODQ3aC0xOC4yMDd2MjcuMTU2aDE4LjIwN3Y3Mi43OTNoMjcuNDM5di03Mi43OTNoMjIuNDc3bDQuMzQyLTI3LjE1NmgtMjYuODF2LTguMzY2DQoJCUMxNTQuNzkxLDEwNC41NTYsMTU4LjM0MSwxMDAuMjc3LDE2My4zOTQsMTAwLjI3N3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
         </button>        
      </div>
   </form>
</div>
    </>
)
}

export default Login;