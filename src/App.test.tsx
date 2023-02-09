import { render, screen } from "@testing-library/react";
import App from "./App";

test("render initial screen", () => {
 render(<App />);
 expect(screen.getByText(/Username/i)).toBeInTheDocument();
 const inputElement = screen.getByRole("textbox");
 expect(inputElement).toBeInTheDocument();
 expect(inputElement).toHaveValue("");
});
