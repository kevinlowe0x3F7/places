import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { savedPlaces } from "~/server/db/schema";

export type SavePlaceRequest = {
  id: string;
  description: string;
};

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body: SavePlaceRequest = (await request.json()) as SavePlaceRequest;

    const { id, description } = body;

    await db.insert(savedPlaces).values({
      placeId: id,
      userId,
      description,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save place" },
      { status: 500 },
    );
  }
}
