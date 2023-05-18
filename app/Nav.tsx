import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './auth/Login';
import Logged from './auth/Logged';
import Link from 'next/link';

export default async function Nav() {
	const session = await getServerSession(authOptions);

	return (
		<nav className="flex justify-between w-full p-2 bg-white h-14 fixed top-0 left-0 right-0">
			<Link href={'/'}>
				<h1 className="font-semibold text-black uppercase">SendIt.</h1>
			</Link>
			<ul className="flex items-center gap-6"></ul>
			{!session?.user && <Login />}
			{session?.user && <Logged image={session.user.image || ''} />}
		</nav>
	);
}
