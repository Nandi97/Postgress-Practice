'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Toggle from './Toggle';

type EditProps = {
	id: string;
	avatar: string;
	name: string;
	title: string;
	comments?: {
		id: string;
		postId: string;
		userId: string;
	}[];
};

export default function EditPost({
	avatar,
	name,
	title,
	comments,
	id,
}: EditProps) {
	//Toggle

	const [toggle, setToggle] = useState(false);

	//Delete post

	const { mutate } = useMutation(
		async (id: string) =>
			await axios.delete('/api/post/deletePost', { data: id }),
		{
			onError: (error) => {
				console.log(error);
			},

			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	const deletePost = () => {
		mutate(id);
	};
	return (
		<>
			<div className="p-8 my-8 bg-white rounded-lg">
				<div className="flex items-center gap-2">
					<Image
						className="rounded-full"
						width={32}
						height={32}
						src={avatar}
						alt="avatar"
					/>
					<h3 className="font-bold text-gray-700">{name}</h3>
				</div>
				<div className="my-8">
					<p className="break-all">{title}</p>
				</div>
				<div className="flex items-center gap4">
					<p className="text-sm font-bold text-gray-700">
						{comments?.length} Comments
					</p>
					<button
						onClick={() => setToggle(true)}
						className="p-1 text-white bg-red-600 rounded-md hover:opacity-80"
					>
						<MdDeleteOutline />
					</button>
				</div>
			</div>
			{toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
		</>
	);
}
