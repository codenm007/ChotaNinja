import jwt_decode from "jwt-decode";

const isLoggedIn = () =>{
    const token = localStorage.getItem("token");
    if(token){
        return jwt_decode(token);
    }else{
        return false;
    }
}

export default isLoggedIn;