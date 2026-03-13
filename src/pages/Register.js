import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await register(name,email,password);

      alert("🎉 Registration successful");

      navigate("/login");

    } catch (err) {

      alert("❌ Registration failed");

    }

    setLoading(false);

  };

  return (

    <div style={styles.container}>

      <motion.div
        style={styles.card}
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
      >

        <motion.h2
          style={styles.title}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.2}}
        >
          ✨ Create Account
        </motion.h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email Address"
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

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
          >
            {loading ? "Creating..." : "Register"}
          </motion.button>

        </form>

        <p style={styles.text}>
          Already have account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

      </motion.div>

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
background:"rgba(255,255,255,0.08)",
backdropFilter:"blur(15px)",
padding:"45px",
borderRadius:"16px",
width:"380px",
textAlign:"center",
boxShadow:"0 20px 40px rgba(0,0,0,0.6)"
},

title:{
color:"#fff",
marginBottom:"25px",
fontSize:"26px",
fontWeight:"600"
},

form:{
display:"flex",
flexDirection:"column",
gap:"18px"
},

input:{
padding:"13px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.1)",
outline:"none",
background:"#1e293b",
color:"#fff",
fontSize:"15px"
},

button:{
padding:"13px",
borderRadius:"8px",
border:"none",
background:"linear-gradient(90deg,#22c55e,#16a34a)",
color:"#fff",
fontWeight:"bold",
fontSize:"15px",
cursor:"pointer",
marginTop:"10px"
},

text:{
color:"#cbd5f5",
marginTop:"20px",
fontSize:"14px"
},

link:{
color:"#60a5fa",
textDecoration:"none",
fontWeight:"600"
}

};

export default Register;