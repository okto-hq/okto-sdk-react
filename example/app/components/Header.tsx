"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useOkto, OktoContextType } from "okto-sdk-react";
import Container from "./Container";

// LoginButton component
function LoginButton() {
  const { authenticate } = useOkto() as OktoContextType;
  const { data: session } = useSession();

  const handleLogin = () => {
    session ? signOut() : signIn();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (session && session.id_token && authenticate) {
        authenticate(session.id_token, (result: any, error: any) => {
          if (result) {
            console.log("Authentication successful");
          }
          if (error) {
            console.error("Authentication error:", error);
            signOut();
          }
        });
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [session, authenticate]);

  return (
    <button
      className={`font-bold border border-transparent rounded-xl px-4 py-2 transition-colors ${
        session
          ? "bg-red-500 hover:bg-red-700 text-white"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      }`}
      onClick={handleLogin}
    >
      {session ? "Log Out" : "Log In"}
    </button>
  );
}

// Header component
function Header() {
  return (
    <nav className="absolute z-10 top-5 w-full">
      <Container>
        <div className="relative flex items-center justify-end header-bg-border">
          <LoginButton />
        </div>
      </Container>
    </nav>
  );
}

export default Header;
