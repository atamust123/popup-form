// Import the testing library and the component to test
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AuthForm from "../components/AuthForm";

// Mock the axios, toast and useRouter modules
jest.mock("axios");
jest.mock("react-hot-toast", () => ({ toast: { success: jest.fn() } }));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Test that the AuthForm component renders correctly
test("AuthForm renders correctly", () => {
  render(<AuthForm />);
  expect(screen.getByTestId("Login")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

// Test that the AuthForm component handles the onSubmit function correctly
test("AuthForm handles onSubmit correctly", async () => {
  // Mock the router push function
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  // Render the AuthForm component
  render(<AuthForm />);

  //   Mock a successful response from the axios post function
  (axios.post as jest.MockedFunction<typeof axios.post>).mockImplementation(
    () => Promise.resolve({ data: "success" })
  );

  // Fill in the input fields with valid data
  const nameInput = screen.getByPlaceholderText("Name");
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(nameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "1234" } });

  // Click on the login button
  const loginButton = screen.getByRole("button", { name: "Login" });
  await waitFor(() => {
    fireEvent.submit(loginButton);
  });

  //   //   Expect the axios post function to be called with the correct data
  expect(axios.post).toHaveBeenCalledWith("api/users/login", {
    name: "test",
    password: "1234",
  });

  //   //   Wait for the toast success function to be called with the correct message
  await waitFor(() =>
    expect(toast.success).toHaveBeenCalledWith("Login successful, success")
  );

  //   //   Wait for the router push function to be called with the correct path
  await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/home"));
});
