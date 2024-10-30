import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { savedPlaces } from "~/server/db/schema";

export default async function MyPlacesPage() {
  const { userId } = await auth();

  if (!userId) {
    return <p>You must be signed in to view this page</p>;
  }

  const places = await db
    .select()
    .from(savedPlaces)
    .where(eq(savedPlaces.userId, userId));

  return (
    <main>
      <h1>My Saved Places</h1>
      <ul>
        {places.length > 0 ? (
          places.map((place) => (
            <li key={place.id}>
              <h2>{place.placeId}</h2>
              <p>{place.description}</p>
            </li>
          ))
        ) : (
          <p>No saved places found.</p>
        )}
      </ul>
    </main>
  );
}
