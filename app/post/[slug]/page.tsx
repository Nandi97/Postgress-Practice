'use client';

import Post from '../../components/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../../types/Post';
import { Oval } from 'react-loader-spinner';
import AddComment from '../../components/AddComment';
import Image from 'next/image';
import Date from '../../components/Date';
import { motion } from 'framer-motion';

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
	// console.log(data);
	return (
		<div>
			<Post
				avatar={data?.user.image}
				name={data?.user.name}
				postTitle={data?.title}
				id={data?.id}
				comments={data?.comments}
			/>

			<AddComment id={data?.id} />
			{data?.comments?.map((comment) => (
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.8 }}
					transition={{ ease: 'easeOut' }}
					key={comment.id}
					className="p-8 my-8 bg-white rounded-lg"
				>
					<div className="flex items-center gap-2 justify-between">
						<div className="flex items-center gap-2">
							<Image
								className="rounded-full"
								width={32}
								height={32}
								src={comment.user.image}
								alt="avatar"
							/>
							<h3 className="font-bold text-gray-700">
								{comment.user.name}
							</h3>
						</div>
						<Date dateString={comment.createdAt} />
					</div>
					<div className="my-8">
						<p className="break-all">{comment.title}</p>
					</div>
				</motion.div>
			))}
		</div>
	);
}
