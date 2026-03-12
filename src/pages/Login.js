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

<div style={styles.container}>

<div style={styles.card}>

<h2 style={styles.title}>Welcome Back</h2>

<form onSubmit={handleSubmit} style={styles.form}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
style={styles.input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
style={styles.input}
/>

<button type="submit" style={styles.button}>
Login
</button>

</form>

<p style={styles.text}>
Don't have an account?{" "}
<Link to="/register" style={styles.link}>Register</Link>
</p>

</div>

</div>

);

};

const styles = {

container:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#020617,#1e293b,#0f172a)",
},

card:{
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(10px)",
padding:"40px",
borderRadius:"12px",
width:"350px",
textAlign:"center",
boxShadow:"0 10px 25px rgba(0,0,0,0.5)"
},

title:{
color:"#fff",
marginBottom:"20px"
},

form:{
display:"flex",
flexDirection:"column",
gap:"15px"
},

input:{
padding:"12px",
borderRadius:"6px",
border:"none",
outline:"none",
background:"#1e293b",
color:"#fff"
},

button:{
padding:"12px",
borderRadius:"6px",
border:"none",
background:"#6366f1",
color:"#fff",
fontWeight:"bold",
cursor:"pointer"
},

text:{
color:"#cbd5f5",
marginTop:"15px"
},

link:{
color:"#818cf8",
textDecoration:"none",
fontWeight:"bold"
}

};

export default Login;