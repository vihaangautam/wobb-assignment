// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { useShortlistStore } from "../useShortlistStore";
import type { ShortlistedProfile } from "../useShortlistStore";

describe("useShortlistStore", () => {
  const dummyProfile1: ShortlistedProfile = {
    username: "mrbeast",
    fullName: "Jimmy Donaldson",
    platform: "youtube",
    avatarUrl: "https://example.com/mrbeast.jpg",
    followers: 240000000,
    isVerified: true,
  };

  const dummyProfile2: ShortlistedProfile = {
    username: "cristiano",
    fullName: "Cristiano Ronaldo",
    platform: "instagram",
    avatarUrl: "https://example.com/cr7.jpg",
    followers: 600000000,
    isVerified: true,
  };

  beforeEach(() => {
    // Reset store state and clear mock storage
    useShortlistStore.getState().clearAll();
    localStorage.clear();
  });

  it("should start with an empty shortlist", () => {
    const state = useShortlistStore.getState();
    expect(state.profiles).toEqual([]);
    expect(state.isShortlisted("mrbeast")).toBe(false);
  });

  it("should add a profile to the shortlist", () => {
    const state = useShortlistStore.getState();
    state.addProfile(dummyProfile1);

    const updatedState = useShortlistStore.getState();
    expect(updatedState.profiles).toHaveLength(1);
    expect(updatedState.profiles[0]).toEqual(dummyProfile1);
    expect(updatedState.isShortlisted("mrbeast")).toBe(true);
  });

  it("should prevent duplicate entries in the shortlist", () => {
    const state = useShortlistStore.getState();
    state.addProfile(dummyProfile1);
    state.addProfile(dummyProfile1); // Add again

    const updatedState = useShortlistStore.getState();
    expect(updatedState.profiles).toHaveLength(1);
  });

  it("should remove a profile from the shortlist", () => {
    const state = useShortlistStore.getState();
    state.addProfile(dummyProfile1);
    state.addProfile(dummyProfile2);

    expect(useShortlistStore.getState().profiles).toHaveLength(2);

    useShortlistStore.getState().removeProfile("mrbeast");

    const updatedState = useShortlistStore.getState();
    expect(updatedState.profiles).toHaveLength(1);
    expect(updatedState.profiles[0].username).toBe("cristiano");
    expect(updatedState.isShortlisted("mrbeast")).toBe(false);
    expect(updatedState.isShortlisted("cristiano")).toBe(true);
  });

  it("should clear all profiles on clearAll", () => {
    const state = useShortlistStore.getState();
    state.addProfile(dummyProfile1);
    state.addProfile(dummyProfile2);

    expect(useShortlistStore.getState().profiles).toHaveLength(2);

    useShortlistStore.getState().clearAll();

    expect(useShortlistStore.getState().profiles).toEqual([]);
  });
});
