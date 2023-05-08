import Link from "next/link";
import Login from "./auth/Login";
import getServerSession from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Logged from "./auth/Logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  //   console.log(`user is: ${session}`);
  return (
    <nav className="flex justify-between w-full p-2 bg-white">
      <Link href={"/"}>
        <h1 className="font-semibold text-black uppercase">Send it.</h1>
      </Link>
      <ul>
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image?} />}
      </ul>
    </nav>
  );
}
