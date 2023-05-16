'use client';
import { MdDeleteOutline } from 'react-icons/md';

type ToggleProps = {
	deletePost: () => void;
	setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
	return (
		<div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
			<div className="absolute flex flex-col items-center gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<h2 className="text-xl">
					Are you sure you want to delete post❓
				</h2>
				<h3 className="text-red-600">
					Pressing this button will permanently delete this button
				</h3>
				<button className="flex items-center gap-2 p-2 text-sm text-white bg-red-600 rounded-md hover:opacity-80">
					<MdDeleteOutline /> Delete Post
				</button>
			</div>
		</div>
	);
}
