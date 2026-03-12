import React, { createContext, useContext, useReducer, useEffect } from "react";
import API from "../services/api";

const TravelContext = createContext();

const initialState = {
  places: [],
  isLoading: false,
  error: null
};

function travelReducer(state, action) {

  switch (action.type) {

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "LOAD_PLACES":
      return { ...state, places: action.payload };

    case "ADD_PLACE":
      return { ...state, places: [action.payload, ...state.places] };

    case "DELETE_PLACE":
      return {
        ...state,
        places: state.places.filter(p => p._id !== action.payload)
      };

    case "UPDATE_PLACE":
      return {
        ...state,
        places: state.places.map(p =>
          p._id === action.payload._id ? action.payload : p
        )
      };

    default:
      return state;
  }

}

export function TravelProvider({ children }) {

  const [state, dispatch] = useReducer(travelReducer, initialState);

  // 🔵 LOAD PLACES
  const getPlaces = async () => {

  try {

    dispatch({ type: "SET_LOADING", payload: true });

    const res = await API.get("/destinations");

    dispatch({
      type: "LOAD_PLACES",
      payload: res.data
    });

  } catch (error) {

    dispatch({
      type: "SET_ERROR",
      payload: "Failed to load places"
    });

  } finally {

    dispatch({ type: "SET_LOADING", payload: false });

  }

};

  // 🟢 ADD PLACE
  
const addPlace = async (place) => {

  try {

    const res = await API.post("/destinations/add", place);

    // new place add
    dispatch({
      type: "ADD_PLACE",
      payload: res.data
    });

    // refresh list from database
    getPlaces();

  } catch (error) {

    console.log("Add place error:", error);

  }

};

  // 🔴 DELETE PLACE
  const deletePlace = async (id) => {

    try {

      await API.delete(`/destinations/${id}`);

      dispatch({
        type: "DELETE_PLACE",
        payload: id
      });

    } catch (error) {

      console.log("Delete error:", error);

    }

  };

  // 🟡 VISIT TOGGLE
  const toggleVisited = async (id) => {

    try {

      const res = await API.put(`/destinations/visit/${id}`);

      dispatch({
        type: "UPDATE_PLACE",
        payload: res.data
      });

    } catch (error) {

      console.log("Toggle error:", error);

    }

  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      getPlaces();
    }

  }, []);

  const value = {
    ...state,
    addPlace,
    deletePlace,
    toggleVisited,
    getPlaces
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );

}

export function useTravel() {

  const context = useContext(TravelContext);

  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }

  return context;

}