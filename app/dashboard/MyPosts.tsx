'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthPosts } from '../types/AuthPosts';
import { Oval } from 'react-loader-spinner';
import EditPost from './EditPost';

const fetchAuthPosts = async () => {
	const response = await axios.get('/api/posts/authPosts');
	return response.data;
};

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthPosts[]>({
		queryFn: fetchAuthPosts,
		queryKey: ['auth-posts'],
	});
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
	console.log(data);
	return (
		<div>
			{data?.posts?.map((post) => (
				<EditPost
					id={post.id}
					key={post.id}
					avatar={data.image}
					name={data.name}
					title={post.title}
					comments={post.comments}
				/>
			))}
		</div>
	);
}
