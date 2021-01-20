
import React from "react";
import { render, screen, fireEvent, waitFor, within} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import { findAllInRenderedTree } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm/>);
  const header = screen.getByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);
  const firstName = screen.getByLabelText(/first Name/i);
  const lastName = screen.getByLabelText(/last Name/i);
  const address = screen.getByLabelText(/address/i);
  const city = screen.getByLabelText(/city/i);
  const state = screen.getByLabelText(/state/i);
  const zip = screen.getByLabelText(/zip/i);
  const submit = screen.getByRole("button");

  fireEvent.change(firstName, {target: {value: "Mona"}});
  fireEvent.change(lastName, {target: {value: "Hassan"}});
  fireEvent.change(address, {target: {value: "36th Street"}});
  fireEvent.change(city, {target: {value: "Moorhead"}});
  fireEvent.change(state, {target: {value: "MN"}});
  fireEvent.change(zip, {target: {value: "56560"}});

  await waitFor(() => {
    fireEvent.click(submit)
    const success = screen.getByTestId("successMessage");
    expect(success).toBeInTheDocument();
  })
});