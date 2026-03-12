import axios from "axios";

const API_KEY = "818e4eba40364923b6e161ebcca570ff";

class TravelAPIService {
  constructor() {
    this.apiKey = API_KEY;
  }

  // SEARCH PLACES (FIXED URL)
  async searchPlaces(query, latitude, longitude, radius = 5000) {
    try {
      const response = await axios.get("https://api.geoapify.com/v2/places", {
        params: {
          categories:
            "tourism,tourism.attraction,tourism.museum,accommodation,accommodation.hotel,catering.restaurant,natural.beach,natural.peak",
          text: query,
          filter:
            latitude && longitude
              ? `circle:${longitude},${latitude},${radius}`
              : undefined,
          bias:
            latitude && longitude
              ? `proximity:${longitude},${latitude}`
              : undefined,
          limit: 20,
          apiKey: this.apiKey,
        },
      });

      return this.formatPlacesResponse(response.data);
    } catch (error) {
      console.log("Search error:", error);
      throw new Error("Failed to fetch places");
    }
  }

  // CATEGORY SEARCH
  async searchPlacesByCategory(category, latitude, longitude, radius = 10000) {
    try {
      const response = await axios.get("https://api.geoapify.com/v2/places", {
        params: {
          categories: category,
          filter:
            latitude && longitude
              ? `circle:${longitude},${latitude},${radius}`
              : undefined,
          limit: 15,
          apiKey: this.apiKey,
        },
      });

      return this.formatPlacesResponse(response.data);
    } catch (error) {
      console.log("Category error:", error);
      throw new Error("Failed to fetch category results");
    }
  }

  // GEOCODING (FIXED URL)
  async geocodeAddress(address) {
    try {
      const response = await axios.get(
        "https://api.geoapify.com/v1/geocode/search",
        {
          params: {
            text: address,
            apiKey: this.apiKey,
          },
        }
      );

      return response.data.features || [];
    } catch (error) {
      console.log("Geocode error:", error);
      throw new Error("Failed to geocode");
    }
  }

  // FORMAT RESPONSE
  formatPlacesResponse(data) {
    if (!data.features) return [];

    return data.features.map((place) => {
      const p = place.properties;
      const coords = place.geometry.coordinates;

      return {
        id: p.place_id,
        name: p.name || "Unknown",
        address: p.formatted,
        category: p.categories?.[0] ?? "place",
        coordinates: {
          lat: coords[1],
          lng: coords[0],
        },
        imageUrl: `https://source.unsplash.com/400x250/?${encodeURIComponent(
          p.name || p.categories?.[0] || "travel"
        )}`,
      };
    });
  }
}

const travelAPI = new TravelAPIService();
export default travelAPI;
