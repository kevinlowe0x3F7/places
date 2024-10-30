"use client";

import * as React from "react";
import PlaceInfo from "./PlaceInfo";

export type Place = {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function MapSearch() {
  const [query, setQuery] = React.useState("");
  const [selectedPlaceIndex, setSelectedPlaceIndex] = React.useState<
    number | null
  >(null);
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/mapbox/${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log("data", data);
      setPlaces(
        data.features.map((feature) => {
          return {
            id: feature.properties.mapbox_id,
            name: feature.properties.name,
            address: feature.properties.full_address,
            coordinates: {
              latitude: feature.properties.coordinates.latitude,
              longitude: feature.properties.coordinates.longitude,
            },
          };
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {places.length > 0 ? (
            places.map((place, i) => (
              <p key={place.id} onClick={() => setSelectedPlaceIndex(i)}>
                {place.name}
              </p>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
        {selectedPlaceIndex != null && places[selectedPlaceIndex] != null && (
          <PlaceInfo place={places[selectedPlaceIndex]} />
        )}
      </div>
    </div>
  );
}
