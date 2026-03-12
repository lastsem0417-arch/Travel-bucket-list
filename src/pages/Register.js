import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Register(){

const {register} = useAuth();

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async (e) => {

e.preventDefault();

try {

await register(name, email, password);

alert("Registration successful");

navigate("/login");

} catch (err) {

alert("Registration failed");

}

};

return(

<div style={styles.container}>

<div style={styles.card}>

<h2 style={styles.title}>Create Account</h2>

<form onSubmit={handleSubmit} style={styles.form}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
style={styles.input}
/>

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
Register
</button>

</form>

<p style={styles.text}>
Already have account?{" "}
<Link to="/login" style={styles.link}>Login</Link>
</p>

</div>

</div>

);

}

const styles = {

container:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#020617,#1e293b,#0f172a)"
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
background:"#22c55e",
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

export default Register;