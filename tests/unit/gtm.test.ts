// UNIT TESTS — Phase 2 (side effects)
//
// pushEvent() doesn't RETURN anything — it PUSHES onto window.dataLayer, the
// array Google Tag Manager reads. So instead of checking a return value, we
// check that the side effect happened correctly.
//
// `beforeEach` runs before every `it`, giving each test a clean slate so they
// can't interfere with each other (test isolation).

import { pushEvent } from "@/lib/gtm";

describe("pushEvent", () => {
  beforeEach(() => {
    // Reset the global array before each test.
    window.dataLayer = [];
  });

  it("creates dataLayer if it doesn't exist yet", () => {
    // @ts-expect-error — deliberately remove it to test the lazy-init path.
    delete window.dataLayer;
    pushEvent("test_event");
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it("pushes the event name", () => {
    pushEvent("form_submit_contact");
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toEqual({ event: "form_submit_contact" });
  });

  it("merges extra params alongside the event", () => {
    pushEvent("click_phone", { location: "contact" });
    expect(window.dataLayer[0]).toEqual({
      event: "click_phone",
      location: "contact",
    });
  });

  it("appends without clobbering existing entries", () => {
    pushEvent("a");
    pushEvent("b");
    expect(window.dataLayer.map((d) => d.event)).toEqual(["a", "b"]);
  });
});
