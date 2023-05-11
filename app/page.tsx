'use client';

import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';

//Fetch All Posts
const allPosts = async () => {
	const response = await axios.get('/api/posts/getPosts');
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery({
		queryFn: allPosts,
		queryKey: ['posts'],
	});
	if (error) return error;
	if (isLoading) return 'Loading.....';

	return (
		<main className="px-10 pt-4">
			<AddPost />
			{data?.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
				/>
			))}
		</main>
	);
}
