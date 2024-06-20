import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

function PlacesAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { suggestions: placeSuggestions, setValue, clearSuggestions } =
  usePlacesAutocomplete({
    requestOptions: {
      types: ['address'], // Example: Restrict suggestions to addresses only
    },
  });


  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value); 
    setValue(value); 
  };

  const handleSelect = async (description) => {
    setQuery(description); 
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      console.log("Coordinates:", { lat, lng });
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Enter a location"
        className="border border-gray-300 p-2 rounded-md"
      />
      {placeSuggestions.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-md p-2">
          {placeSuggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion.description)}
              className="cursor-pointer hover:bg-gray-100 p-1"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlacesAutocomplete;
