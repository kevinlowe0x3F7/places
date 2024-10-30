import { NextResponse } from "next/server";
import { env } from "~/env";

const MAPBOX_URL = "https://api.mapbox.com/search/searchbox/v1";

export async function GET(
  request: Request,
  { params }: { params: { query: string } },
) {
  const { query } = params;

  const response = await fetch(
    `${MAPBOX_URL}/forward?q=${query}&access_token=${env.MAPBOX_API_TOKEN}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();

  return NextResponse.json(data);
}
