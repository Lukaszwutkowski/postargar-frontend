import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import * as apiCalls from "../api/apiCalls";

describe("HomePage", () => {
  describe("Layout", () => {
    it("has root page div", () => {
      const { queryByTestId } = setup();
      const homePageDiv = queryByTestId("homepage");
      expect(homePageDiv).toBeInTheDocument();
    });
  });
});
