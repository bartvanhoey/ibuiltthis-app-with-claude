import type { ReactNode } from "react";

export const ClerkProvider = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
export const SignedIn = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
export const SignedOut = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
export const SignInButton = ({ children }: { children?: ReactNode }) => (
  <button>{children ?? "Sign In"}</button>
);
export const SignUpButton = ({ children }: { children?: ReactNode }) => (
  <button>{children ?? "Sign Up"}</button>
);
export const UserButton = () => <button>User</button>;

export const useUser = jest.fn(() => ({
  isLoaded: true,
  isSignedIn: false,
  user: null,
}));
export const useAuth = jest.fn(() => ({
  isLoaded: true,
  isSignedIn: false,
  userId: null,
}));
export const useClerk = jest.fn(() => ({
  signOut: jest.fn(),
}));
