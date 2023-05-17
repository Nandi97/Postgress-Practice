import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			console.log(req.query);
			const data = await prisma.post.findUnique({
				where: {
					id: req.query.details,
				},
				include: {
					user: true,
					comments: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							user: true,
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
