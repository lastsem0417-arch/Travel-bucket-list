import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TravelProvider } from './context/TravelContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Places from './pages/Places';
import AddPlace from './pages/AddPlace';
import PlaceDetail from './pages/PlaceDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import './styles/App.css';

function App() {
  return (
    <TravelProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1f2937',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                fontSize: '14px',
                maxWidth: '400px'
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff'
                },
                style: {
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff'
                },
                style: {
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }
              },
              loading: {
                iconTheme: {
                  primary: '#3b82f6',
                  secondary: '#ffffff'
                }
              }
            }}
          />

          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/places" element={<Places />} />
              <Route path="/add" element={<AddPlace />} />
              <Route path="/place/:id" element={<PlaceDetail />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </TravelProvider>
  );
}

export default App;
