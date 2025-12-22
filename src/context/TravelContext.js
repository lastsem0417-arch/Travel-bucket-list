import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TravelContext = createContext();

const initialState = {
  places: [],
  filters: {
    search: '',
    status: 'all', // all, visited, notVisited
    priority: 'all', // all, high, medium, low
    tripType: 'all'
  },
  viewMode: 'grid', // grid, list
  isLoading: false,
  error: null
};

// Sample data
const samplePlaces = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    description: "Beautiful Greek island with stunning sunsets, white buildings, and crystal blue waters. Perfect for a romantic getaway.",
    bestTimeToVisit: "April to October",
    estimatedBudget: 2500,
    tripType: "Relaxation",
    priority: "High",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
    isVisited: false,
    dateAdded: new Date('2024-01-15').toISOString(),
    dateVisited: null,
    notes: "Consider booking accommodation in Oia for best sunset views"
  },
  {
    id: "2",
    name: "Machu Picchu",
    country: "Peru",
    description: "Ancient Incan citadel high in the Andes Mountains. A UNESCO World Heritage site and one of the New Seven Wonders of the World.",
    bestTimeToVisit: "May to September",
    estimatedBudget: 3000,
    tripType: "Adventure",
    priority: "High",
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&h=300&fit=crop",
    isVisited: true,
    dateAdded: new Date('2023-12-01').toISOString(),
    dateVisited: new Date('2024-07-15').toISOString(),
    notes: "Amazing experience! The trek was challenging but worth it."
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    description: "Vibrant capital city blending traditional culture with modern technology. Amazing food, temples, and city life.",
    bestTimeToVisit: "March to May, September to November",
    estimatedBudget: 4000,
    tripType: "Cultural",
    priority: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
    isVisited: false,
    dateAdded: new Date('2024-02-20').toISOString(),
    dateVisited: null,
    notes: "Must try authentic ramen and visit Senso-ji Temple"
  },
  {
    id: "4",
    name: "Safari in Kenya",
    country: "Kenya",
    description: "Experience the Great Migration and witness incredible wildlife in their natural habitat.",
    bestTimeToVisit: "June to October",
    estimatedBudget: 5000,
    tripType: "Nature & Wildlife",
    priority: "High",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop",
    isVisited: false,
    dateAdded: new Date('2024-03-10').toISOString(),
    dateVisited: null,
    notes: "Book during migration season for best wildlife viewing"
  },
  {
    id: "5",
    name: "Northern Lights in Iceland",
    country: "Iceland",
    description: "Witness the magical Aurora Borealis dancing across the night sky in this Nordic island nation.",
    bestTimeToVisit: "September to March",
    estimatedBudget: 3500,
    tripType: "Nature & Wildlife",
    priority: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=500&h=300&fit=crop",
    isVisited: false,
    dateAdded: new Date('2024-01-30').toISOString(),
    dateVisited: null,
    notes: "Check aurora forecast and book tours in advance"
  }
];

function travelReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOAD_PLACES':
      return { ...state, places: action.payload };
    case 'ADD_PLACE':
      const newPlace = {
        ...action.payload,
        id: uuidv4(),
        dateAdded: new Date().toISOString(),
        isVisited: false,
        dateVisited: null
      };
      return { ...state, places: [...state.places, newPlace] };
    case 'UPDATE_PLACE':
      return {
        ...state,
        places: state.places.map(place =>
          place.id === action.payload.id ? { ...place, ...action.payload } : place
        )
      };
    case 'DELETE_PLACE':
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.payload)
      };
    case 'TOGGLE_VISITED':
      return {
        ...state,
        places: state.places.map(place =>
          place.id === action.payload
            ? {
                ...place,
                isVisited: !place.isVisited,
                dateVisited: !place.isVisited ? new Date().toISOString() : null
              }
            : place
        )
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'CLEAR_ALL_DATA':
      return { ...state, places: [] };
    default:
      return state;
  }
}

export function TravelProvider({ children }) {
  const [state, dispatch] = useReducer(travelReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlaces = localStorage.getItem('travelPlaces');
    if (savedPlaces) {
      dispatch({ type: 'LOAD_PLACES', payload: JSON.parse(savedPlaces) });
    } else {
      // Load sample data if no saved data
      dispatch({ type: 'LOAD_PLACES', payload: samplePlaces });
    }
  }, []);

  // Save to localStorage whenever places change
  useEffect(() => {
    localStorage.setItem('travelPlaces', JSON.stringify(state.places));
  }, [state.places]);

  const value = {
    ...state,
    dispatch
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
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}
