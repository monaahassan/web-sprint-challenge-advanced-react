
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

  fireEvent.change(firstName, {target: {value: "Alice"}});
  fireEvent.change(lastName, {target: {value: "Chang"}});
  fireEvent.change(address, {target: {value: "30th Street"}});
  fireEvent.change(city, {target: {value: "Brooklyn"}});
  fireEvent.change(state, {target: {value: "CA"}});
  fireEvent.change(zip, {target: {value: "11232"}});

  await waitFor(() => {
    fireEvent.click(submit)
    const success = screen.getByTestId("successMessage");
    expect(success).toBeInTheDocument();
  })
});