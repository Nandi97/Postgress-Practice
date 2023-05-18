'use client';

import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';
import { PostType } from './types/Posts';
import { Oval } from 'react-loader-spinner';

//Fetch All Posts
const allPosts = async () => {
	const response = await axios.get('/api/posts/getPosts');
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryFn: allPosts,
		queryKey: ['posts'],
	});
	if (error) return error;
	if (isLoading)
		return (
			<div className="flex items-center justify-center w-full h-screen">
				<Oval
					height={50}
					width={50}
					color="#00BDFE"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
					ariaLabel="oval-loading"
					secondaryColor="#84E4F7"
					strokeWidth={4}
					strokeWidthSecondary={4}
				/>
			</div>
		);

	return (
		<div>
			<AddPost />
			{data?.map((post) => (
				<Post
					comments={post.comments}
					key={post.id}
					id={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
				/>
			))}
		</div>
	);
}
