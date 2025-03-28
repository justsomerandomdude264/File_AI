import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

// Mock window.alert to prevent JSDOM errors
global.alert = jest.fn();

// Mock useAuth hook
jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock useRouter from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm Component", () => {
  it("shows loading state, fails login, and does not redirect", async () => {
    const mockLogin = jest.fn(() => Promise.resolve({ status: false, error: "Invalid credentials" })); // Fake failed login
    const push = jest.fn();

    // Mock useAuth hook to use our fake login function
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin, token: null });
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginForm />);

    // Select elements
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Click login button
    act(() => {
        fireEvent.click(loginButton);
      });

    // Expect loading state
    expect(loginButton).toBeDisabled();
    expect(screen.getByText("Logging in...")).toBeInTheDocument();

    // Wait for login attempt
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("email@example.com", "password"));

    // Expect no redirect
    await waitFor(() => expect(push).not.toHaveBeenCalled()); // As our credentials are wrong

    // Ensure button is re-enabled after failure
    expect(loginButton).not.toBeDisabled();
  });
});
