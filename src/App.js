import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

import {AuthProvider} from "./context/AuthContext";
import {TravelProvider} from "./context/TravelContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Places from "./pages/Places";
import AddPlace from "./pages/AddPlace";
import PlaceDetail from "./pages/PlaceDetail";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import MapPage from "./pages/MapPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App(){

return(

<AuthProvider>

<TravelProvider>

<Router>

<Routes>

{/* Default route */}

<Route path="/" element={<Navigate to="/dashboard"/>} />

{/* Auth Routes */}

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

{/* Protected Routes */}

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Layout>
<Home/>
</Layout>
</ProtectedRoute>
}
/>
<Route
path="/admin"
element={
<ProtectedRoute>
<Layout>
<AdminDashboard/>
</Layout>
</ProtectedRoute>
}
/>
<Route
path="/admin"
element={
<AdminRoute>
<Layout>
<AdminDashboard/>
</Layout>
</AdminRoute>
}
/>
<Route
path="/map"
element={
<ProtectedRoute>
<Layout>
<MapPage/>
</Layout>
</ProtectedRoute>
}
/>
<Route
path="/places"
element={
<ProtectedRoute>
<Layout>
<Places/>
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/add"
element={
<ProtectedRoute>
<Layout>
<AddPlace/>
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/place/:id"
element={
<ProtectedRoute>
<Layout>
<PlaceDetail/>
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/stats"
element={
<ProtectedRoute>
<Layout>
<Statistics/>
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/settings"
element={
<ProtectedRoute>
<Layout>
<Settings/>
</Layout>
</ProtectedRoute>
}
/>

</Routes>

</Router>

</TravelProvider>

</AuthProvider>

);

}

export default App;