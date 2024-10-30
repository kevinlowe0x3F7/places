"use client";

import { SignedIn } from "@clerk/nextjs";
import { Place } from "./MapSearch";
import * as React from "react";

interface PlaceInfoProps {
  place: Place;
}
export default function PlaceInfo({ place }: PlaceInfoProps) {
  const [description, setDescription] = React.useState("");

  const savePlace = React.useCallback(async () => {
    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: place.id,
          description,
        }),
      });

      if (response.ok) {
        alert("Place saved");
      } else {
        console.error("Failed to save place");
      }
    } catch (error) {
      console.error("Error saving place", error);
    }
  }, [place, description]);

  return (
    <div className="flex flex-col items-center gap-2 rounded border border-solid border-white">
      <p>{`Name: ${place.name}`}</p>
      <p>{`Address: ${place.address}`}</p>
      <p>{`Latitude: ${place.coordinates.latitude}`}</p>
      <p>{`Longitude: ${place.coordinates.longitude}`}</p>

      <SignedIn>
        <div className="flex gap-2">
          <textarea
            className="text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={savePlace}>Save place</button>
        </div>
      </SignedIn>
    </div>
  );
}
