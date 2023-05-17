import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions);
		if (!session) return res.status(401).json({ message: 'Please signin' });
		//Get Aith users Posts
		try {
			const data = await prisma.user.findUnique({
				where: {
					email: session?.user?.email,
				},
				include: {
					posts: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							comments: true,
						},
					},
				},
			});
			res.status(200).json(data);
		} catch (err) {
			res.status(400).json({
				message: 'Error has occurred, cant find user posts',
			});
		}
	}
}
