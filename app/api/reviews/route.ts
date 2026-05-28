import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: "Missing configuration" }, { status: 500 });
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=es`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("[reviews] Places API error:", await res.text());
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
