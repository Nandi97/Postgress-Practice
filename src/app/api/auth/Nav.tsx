import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]/route";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(`user is: ${session}`);
  return (
    <nav className="flex justify-between w-full p-2 bg-white">
      <Link href={"/"}>
        <h1 className="font-semibold text-black uppercase">Send it.</h1>
      </Link>
      <ul>
        <Login />
      </ul>
    </nav>
  );
}
