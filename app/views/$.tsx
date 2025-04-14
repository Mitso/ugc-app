import {
    isRouteErrorResponse,
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
  } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return  [
    { title: "Oh no!" },
    {   name: "404 Not found! Something went wrong", 
        content: "404 Error has occured " 
    }
  ]
}

export default function NotFound() {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}