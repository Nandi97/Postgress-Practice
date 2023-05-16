import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import MyPosts from './MyPosts';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect('/api/auth/signIn');
	}

	return (
		<main className="px-10 pt-4">
			<h1 className="text-2xl font-bold">
				Welcome back {session?.user?.name}
			</h1>
			<MyPosts />
		</main>
	);
}
