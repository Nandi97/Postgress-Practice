'use client';

import AddPost from './components/AddPost';

export default function Home() {
	return (
		<main className="px-10 pt-4">
			<h1>Home</h1>
			<AddPost />
		</main>
	);
}
