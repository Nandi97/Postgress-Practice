'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();
	let toastPostID: string;

	//Create a post
	const { mutate } = useMutation(
		async (title: string) =>
			await axios.post('/api/posts/addPost', { title }),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, {
						id: toastPostID,
					});
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				toast.success('Post has been Created', { id: toastPostID });
				queryClient.invalidateQueries(['posts']);
				setTitle('');
				setIsDisabled(false);
			},
		}
	);

	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();
		toastPostID = toast.loading('Creating Your Post', { id: toastPostID });
		setIsDisabled(true);
		mutate(title);
	};
	return (
		<form onSubmit={submitPost} className="p-8 my-8 bg-white rounded-md">
			<div className="flex flex-col my-4">
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					name="title"
					value={title}
					placeholder="What's on your mind"
					className="p-4 my-2 text-base rounded-md bg-slate-200"
				></textarea>
			</div>
			<div className="flex items-center justify-between gap-2">
				<p
					className={`font-thin text-sm  ${
						title.length > 300 ? 'text-red-700' : 'text-slate-500'
					}`}
				>{`${title.length}/300`}</p>
				<button
					disabled={isDisabled}
					className={`p-1 text-white rounded-md shadow text-sm  ${
						isDisabled
							? 'bg-gray-500 cursor-not-allowed'
							: 'bg-sky-500 hover:bg-sky-600'
					}`}
					type="submit"
				>
					Create A Post
				</button>
			</div>
		</form>
	);
}
