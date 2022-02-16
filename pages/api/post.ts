import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts, Post } from '../../lib/barkBlogApi'

const handler = async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const posts = await getAllPosts()

  return res.status(200).json(posts)
}

export default handler
