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

<div className="auth-page">

<h2>Register</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

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

<button type="submit">Register</button>

</form>

<p>
Already have account? <Link to="/login">Login</Link>
</p>

</div>

);

}

export default Register;