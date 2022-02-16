import { createClient } from '@supabase/supabase-js'
import { getContent } from './contentGenerator'
import { getHeroImage, Photo } from './photoApi'

export type PostLink = {
  title: string
  imgUrl: string
  slug: string
}

export type FeaturedPost = {
  title: string
  image: Photo
  content: string
}

export type Post = {
  id: number;
  created_at: Date;
  name: string;
  dog_ceo_api_path?: string;
  slug: string;
  content: string;
  is_featured: boolean;
}

const supabaseUrl = 'https://zmyvnfcqkfvsqowacrvi.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export const getFeaturedPaths = async (): Promise<string[]> => {
  const response = await supabase.from<Post>('posts')
    .select('slug')
    .match({ is_featured: true })

  if(!response.data){
    console.log(response)
    throw new Error('Unable to fetch featured posts')
  }

  return response.data.map(post => post.slug)
}

export const getPost = async (slug: string): Promise<FeaturedPost> => {
  const response = await supabase.from<Post>('posts')
    .select('*')
    .match({ slug: slug})

  if(!response.data) {
    throw new Error(`Unable to find post: {slug}`)
  }

  const post = response.data[0]
  const image = await getHeroImage(post.name)
  
  return {
    title: post.name,
    image,
    content: post.content,
  }
}

const makeUrl = (breedPathPart: string): string =>
  `https://dog.ceo/api/breed/${breedPathPart}/images/random`

export const getFeaturedPosts = async (): Promise<PostLink[]> => {
  const { data: posts, error } = await supabase.from<Post>('posts')
    .select('*')
    .match({ is_featured: true })
  
  if(!posts || error){
    throw new Error(error?.message ?? 'Unable to fetch posts')
  }
  
  return await Promise.all(
    posts.map(async post => {
      if(!post.dog_ceo_api_path) {
        throw new Error('Unable to fetch picture from dog ceo api')
      }

      const url = makeUrl(post.dog_ceo_api_path)
      const imgResposnse = await fetch(url)
      const img = await imgResposnse.json()

      return {
        title: post.name,
        slug: post.slug,
        imgUrl: img.message as string,
      }
    })
  )
}

export const getAllPosts = async (): Promise<Post[]> => {
  const { data: posts, error } = await supabase
    .from<Post>('posts')
    .select('*')

  if(!posts || error) {
    throw new Error(error?.message ?? 'Unable to fetch posts')
  }

  return posts;
}