'use client';

import Post from '../../components/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../../types/Post';
import { Oval } from 'react-loader-spinner';
import AddComment from '../../components/AddComment';

type URL = {
	params: {
		slug: string;
	};
};

//Fetch All posts
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`);
	return response.data;
};

export default function PostDetail(url: URL) {
	const { data, isLoading } = useQuery<PostType[]>({
		queryKey: ['detailPost'],
		queryFn: () => fetchDetails(url.params.slug),
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
		<div className="px-10 pt-4">
			<Post
				avatar={data?.user.image}
				name={data?.user.name}
				postTitle={data?.title}
				id={data?.id}
				comments={data?.comments}
			/>
			<AddComment id={data?.id} />
		</div>
	);
}
