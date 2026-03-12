import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async (e) => {

e.preventDefault();

try{

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);
localStorage.setItem("user",JSON.stringify(res.data.user));

const role = res.data.user.role;

if(role === "admin"){
navigate("/admin");
}else{
navigate("/dashboard");
}

}catch(err){

console.log(err);
alert("Invalid email or password");

}

};

return(

<div className="auth-container">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Login
</button>

</form>

<p>
Don't have an account?{" "}
<Link to="/register">Register</Link>
</p>

</div>

);

};

export default Login;