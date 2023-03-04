import React from "react";
import { shallow } from "enzyme";
import UserPage from "./UserPage";
import * as apiCalls from "../api/apiCalls";

describe("UserPage", () => {
  const mockUser = {
    id: 1,
    name: "test-user",
  };

  beforeEach(() => {
    jest
      .spyOn(apiCalls, "fetchUser")
      .mockImplementation(() => Promise.resolve(mockUser));
  });

  afterEach(() => {
    apiCalls.fetchUser.mockReset();
  });

  it("displays loading when user is being fetched", () => {
    const wrapper = shallow(<UserPage userId={1} />);
    expect(wrapper.find("div").text()).toBe("Loading...");
  });

  it("displays user details when user is fetched", async () => {
    const wrapper = shallow(<UserPage userId={1} />);
    await apiCalls.fetchUser();
    expect(wrapper.find("h1").text()).toBe(mockUser.name);
  });

  it("displays user not found when user is not fetched", async () => {
    jest
      .spyOn(apiCalls, "fetchUser")
      .mockImplementation(() => Promise.reject(new Error("User not found")));
    const wrapper = shallow(<UserPage userId={999} />);
    await apiCalls.fetchUser();
    expect(wrapper.find("div").text()).toBe("User not found");
  });

  it("displays error message when user fetch fails", async () => {
    jest
      .spyOn(apiCalls, "fetchUser")
      .mockImplementation(() => Promise.reject(new Error("API error")));
    const wrapper = shallow(<UserPage userId={1} />);
    await apiCalls.fetchUser();
    expect(wrapper.find("div").text()).toBe("Error: API error");
  });
});
