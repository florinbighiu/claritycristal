// @vitest-environment node
//
// API ROUTE TESTS — Phase 4 (GET /api/reviews)
//
// This route reads two environment variables and calls the Google Places API
// over the network. We test it WITHOUT real env secrets and WITHOUT real
// network calls by:
//   - vi.stubEnv  → set/clear env vars per test
//   - vi.stubGlobal("fetch", ...) → replace global fetch with a fake response
//
// This shows two more mocking tools beyond module mocks: faking the environment
// and faking a global.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/reviews/route";

// A minimal fake of the Response object fetch returns, with just the bits the
// route uses: .ok, .json(), .text().
function fakeFetchResponse(opts: { ok: boolean; body?: unknown }) {
  return {
    ok: opts.ok,
    json: async () => opts.body,
    text: async () => JSON.stringify(opts.body ?? ""),
  };
}

describe("GET /api/reviews", () => {
  beforeEach(() => {
    // Start each test with credentials present; individual tests override.
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    vi.stubEnv("GOOGLE_PLACE_ID", "test-place-id");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns 500 when configuration is missing", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", ""); // simulate unset key
    const res = await GET();
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Missing configuration" });
  });

  it("returns the places data on success and calls Google with the API key", async () => {
    const placesData = { displayName: { text: "ClarityCristal" }, rating: 4.9 };
    const fetchMock = vi.fn().mockResolvedValue(fakeFetchResponse({ ok: true, body: placesData }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(placesData);

    // Verify the request was built correctly: right URL + auth header.
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain("places.googleapis.com");
    expect(url).toContain("test-place-id");
    expect(init.headers["X-Goog-Api-Key"]).toBe("test-key");
  });

  it("returns 500 when the Google API responds with an error", async () => {
    const fetchMock = vi.fn().mockResolvedValue(fakeFetchResponse({ ok: false, body: "quota exceeded" }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await GET();
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Failed to fetch reviews" });
  });
});
