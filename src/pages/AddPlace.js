import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import toast, { Toaster } from 'react-hot-toast';
import './AddPlace.css';

const AddPlace = () => {

const navigate = useNavigate();
const { addPlace } = useTravel();   // ⭐ database function

const [formData,setFormData] = useState({
name:'',
country:'',
city:'',
description:'',
bestTimeToVisit:'',
estimatedBudget:'',
tripType:'Adventure',
priority:'Medium',
imageUrl:'',
notes:'',
category:'',
rating:'',
coordinates:null,
address:'',
website:'',
phone:''
});

const [errors,setErrors] = useState({});
const [isSubmitting,setIsSubmitting] = useState(false);


// ⭐ UNSPLASH IMAGE FETCH
const fetchPlaceImage = async (placeName)=>{

try{

const response = await fetch(
`https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=xTiXK2H9BFZcJ3S7HAG9HY9vFy2EbxuM7VTZ2qkXMcI`
);

const data = await response.json();

if(data.results && data.results.length>0){
return data.results[0].urls.small;
}

return "";

}catch(err){

console.log("Image fetch error",err);

return "";

}

};


// INPUT CHANGE
const handleInputChange = (e)=>{

const {name,value}=e.target;

setFormData(prev=>({
...prev,
[name]:value
}));

if(errors[name]){
setErrors(prev=>({...prev,[name]:''}));
}

};


// FORM VALIDATION
const validateForm = ()=>{

const newErrors={};

if(!formData.name.trim()) newErrors.name="Place name required";

if(!formData.country) newErrors.country="Country required";

if(!formData.description.trim()) newErrors.description="Description required";

if(formData.estimatedBudget && (isNaN(formData.estimatedBudget) || formData.estimatedBudget < 0)){
newErrors.estimatedBudget="Budget must be valid";
}

setErrors(newErrors);

return Object.keys(newErrors).length===0;

};


// SUBMIT
const handleSubmit = async (e)=>{

e.preventDefault();

if(!validateForm()){
toast.error("Fix form errors");
return;
}

setIsSubmitting(true);

const loadingToast = toast.loading("Adding place...");

try{

// ⭐ IMAGE FETCH
const fetchedImage = await fetchPlaceImage(formData.name);

const newPlace = {

...formData,

estimatedBudget: formData.estimatedBudget
? parseInt(formData.estimatedBudget)
:0,

imageUrl: fetchedImage || formData.imageUrl

};

// ⭐ SAVE TO DATABASE
await addPlace(newPlace);

toast.success(`🎉 ${formData.name} added successfully`,{id:loadingToast});

setTimeout(()=>{
navigate("/places");
},1000);

}catch(err){

console.log(err);

toast.error("Failed to add place",{id:loadingToast});

}

setIsSubmitting(false);

};


return(

<>

<Toaster position="top-right"/>

<div className="add-place">

<motion.div
className="add-place-container"
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
>

<div className="page-header">

<motion.h1
initial={{y:-20}}
animate={{y:0}}
transition={{delay:0.1}}
>
✈️ Add New Destination
</motion.h1>

<motion.p
initial={{y:-20}}
animate={{y:0}}
transition={{delay:0.2}}
>
Discover and add amazing places to your travel bucket list
</motion.p>

</div>


<motion.form
className="add-place-form"
onSubmit={handleSubmit}
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
>

<div className="form-grid">


<div className="form-group">
<label>Place Name *</label>

<input
type="text"
name="name"
value={formData.name}
onChange={handleInputChange}
placeholder="e.g Santorini"
/>

{errors.name && <span className="error-message">{errors.name}</span>}

</div>


<div className="form-group">

<label>Country *</label>

<input
type="text"
name="country"
value={formData.country}
onChange={handleInputChange}
/>

{errors.country && <span className="error-message">{errors.country}</span>}

</div>


<div className="form-group full-width">

<label>Description *</label>

<textarea
name="description"
value={formData.description}
onChange={handleInputChange}
/>

{errors.description && <span className="error-message">{errors.description}</span>}

</div>


<div className="form-group">

<label>Budget</label>

<input
type="number"
name="estimatedBudget"
value={formData.estimatedBudget}
onChange={handleInputChange}
/>

</div>


<div className="form-group">

<label>Trip Type</label>

<select
name="tripType"
value={formData.tripType}
onChange={handleInputChange}
>

<option>Adventure</option>
<option>Relaxation</option>
<option>Cultural</option>
<option>Nature</option>

</select>

</div>


<div className="form-group">

<label>Priority</label>

<select
name="priority"
value={formData.priority}
onChange={handleInputChange}
>

<option>High</option>
<option>Medium</option>
<option>Low</option>

</select>

</div>


</div>


<div className="form-actions">

<motion.button
type="button"
className="btn-secondary"
onClick={()=>navigate("/places")}
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
>

Cancel

</motion.button>


<motion.button
type="submit"
className="btn-primary"
disabled={isSubmitting}
whileHover={{scale:isSubmitting?1:1.05}}
whileTap={{scale:isSubmitting?1:0.95}}
>

{isSubmitting ? "Adding..." : "✅ Add to Bucket List"}

</motion.button>


</div>


</motion.form>


</motion.div>

</div>

</>

);

};

export default AddPlace;