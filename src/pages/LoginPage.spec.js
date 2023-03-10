import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  describe("Layout", () => {
    it("has header of Login", () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Login");
    });

    it("has input for username", () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has login button", () => {
      const { container } = render(<LoginPage />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });
});
