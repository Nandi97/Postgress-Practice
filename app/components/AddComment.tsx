'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type PostProps = {
	id?: string;
};

type Comment = {
	postId?: string;
	title: string;
};
export default function AddComment({ id }: PostProps) {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();
	let toastCommentID: string;

	//Create a Comment
	const { mutate } = useMutation(
		async (data: Comment) =>
			await axios.post('/api/posts/addComment', { data }),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, {
						id: toastCommentID,
					});
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				toast.success('Comment has been Added', { id: toastCommentID });
				queryClient.invalidateQueries(['comments']);
				setTitle('');
				setIsDisabled(false);
			},
		}
	);
	const submitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		toastCommentID = toast.loading('Posting Your Comment', {
			id: toastCommentID,
		});
		setIsDisabled(true);
		mutate({ title, postId: id });
	};
	return (
		<form onSubmit={submitComment} className="my-8">
			<h3>Add Comment</h3>
			<div className="flex flex-col my-2">
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="p-4 my-2 text-lg rounded-md"
				/>
			</div>
			<div className="flex items-center gap-2">
				<button
					disabled={isDisabled}
					type="submit"
					className={`p-1 text-white rounded-md shadow text-sm  ${
						isDisabled
							? 'bg-gray-500 cursor-not-allowed'
							: 'bg-sky-500 hover:bg-sky-600'
					}`}
				>
					Add Comment➕
				</button>
				<p
					className={`font-bold ${
						title.length > 300 ? 'text-red-700' : 'text-slate-600'
					}`}
				>{`${title.length}/300`}</p>
			</div>
		</form>
	);
}
