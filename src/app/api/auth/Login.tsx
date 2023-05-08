"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        onClick={async () => {
          await signIn();
        }}
        className="p-1 text-sm text-white rounded bg-slate-800 hover:shadow"
      >
        Sign In
      </button>
    </li>
  );
}
