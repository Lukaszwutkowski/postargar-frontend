import React from "react";
import { render } from "@testing-library/react";
import TopBar from "./TopBar";
import * as apiCalls from "../api/apiCalls";

describe("TopBar", () => {
  describe("Layout", () => {
    it("has application logo", () => {
      const { container } = render(<TopBar />);
      const image = container.querySelector("img");
      expect(image.src).toContain("postagram-logo.png");
    });
  });
});
