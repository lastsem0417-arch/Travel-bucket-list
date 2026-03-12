import React, {useEffect,useState} from "react";
import API from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = ()=>{

const [users,setUsers] = useState([]);
const [places,setPlaces] = useState([]);

useEffect(()=>{

loadData();

},[]);

const loadData = async ()=>{

try{

const usersRes = await API.get("/admin/users");
const placesRes = await API.get("/admin/places");

setUsers(usersRes.data);
setPlaces(placesRes.data);

}catch(err){

console.log(err);

}

};


const deletePlace = async (id)=>{

await API.delete(`/admin/place/${id}`);

setPlaces(places.filter(p=>p._id !== id));

};


return(

<div className="admin-dashboard">

<h1>Admin Dashboard 👑</h1>

<div className="admin-stats">

<div className="stat-card">
<h2>{users.length}</h2>
<p>Total Users</p>
</div>

<div className="stat-card">
<h2>{places.length}</h2>
<p>Total Places</p>
</div>

</div>


<h2>All Users</h2>

<div className="admin-users">

{users.map(user=>(

<div key={user._id} className="admin-user-card">

<h3>{user.name}</h3>

<p>{user.email}</p>

<span className="role">{user.role}</span>

</div>

))}

</div>


<h2>All Places</h2>

<div className="admin-places">

{places.map(place=>(

<div key={place._id} className="admin-place-card">

<img src={place.imageUrl} alt={place.name}/>

<div className="place-info">

<h3>{place.name}</h3>

<p>{place.country}</p>

<p className="user">

Added by: {place.user?.name}

</p>

<button
className="delete"
onClick={()=>deletePlace(place._id)}
>

Delete

</button>

</div>

</div>

))}

</div>

</div>

);

};

export default AdminDashboard;