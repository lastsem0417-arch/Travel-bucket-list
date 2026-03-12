import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTravel } from "../context/TravelContext";

const MapPage = () => {

  const { places } = useTravel();

  return (

    <div style={{ height: "90vh", width: "100%" }}>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map(place => (

          place.coordinates && (

            <Marker
              key={place._id}
              position={[place.coordinates.lat, place.coordinates.lng]}
            >

              <Popup>

                <strong>{place.name}</strong>

                <br/>

                {place.country}

              </Popup>

            </Marker>

          )

        ))}

      </MapContainer>

    </div>

  );

};

export default MapPage;