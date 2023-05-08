"use client";

import Image from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: String;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex items-center gap-8">
      <button
        onClick={() => signOut()}
        className="p-1 text-sm text-white rounded bg-slate-800 hover:shadow"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          src={image}
          alt=""
          priority
          className="rounded-full w-14"
        />
      </Link>
    </li>
  );
}
