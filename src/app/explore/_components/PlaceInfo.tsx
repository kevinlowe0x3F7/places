import { Place } from "./MapSearch";

interface PlaceInfoProps {
  place: Place;
}
export default function PlaceInfo({ place }: PlaceInfoProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded border border-solid border-white">
      <p>{`Name: ${place.name}`}</p>
      <p>{`Address: ${place.address}`}</p>
      <p>{`Latitude: ${place.coordinates.latitude}`}</p>
      <p>{`Longitude: ${place.coordinates.longitude}`}</p>
    </div>
  );
}
