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

const featuredBreeds = [
  {
    title: 'Akita',
    pathPart: 'akita',
    slug: 'akita',
  },
  {
    title: 'Pitbull',
    pathPart: 'pitbull',
    slug: 'pitbull',
  },
  {
    title: 'Husky',
    pathPart: 'husky',
    slug: 'husky',
  },
  {
    title: 'French Bulldog',
    pathPart: 'bulldog/french',
    slug: 'french-bulldog',
  },
]

export const getFeaturedPaths = async (): Promise<string[]> =>
  Promise.resolve(featuredBreeds.map(b => b.slug))

const titleCase = (words: string) => {
  return words.toLowerCase()
    .split('-')
    .map(word => {
      return [
        word.charAt(0).toUpperCase(),
        word.slice(1)
      ].join('')
    }).join(' ')
}

export const getPost = async (slug: string): Promise<FeaturedPost> => {
  let breed = featuredBreeds.find(b => b.slug === slug)
  if (!breed) {
    // this isn't one of our featured breeds
    breed = { title: titleCase(slug), pathPart: slug, slug }
  }

  const content = getContent()

  const image = await getHeroImage(breed.title)

  return {
    title: breed.title,
    image,
    content,
  }
}

const makeUrl = (breedPathPart: string): string =>
  `https://dog.ceo/api/breed/${breedPathPart}/images/random`

export const getFeaturedPosts = async (): Promise<PostLink[]> => {
  return await Promise.all(
    featuredBreeds.map(async breed => {
      const url = makeUrl(breed.pathPart)
      const imgResposnse = await fetch(url)
      const img = await imgResposnse.json()

      return {
        title: breed.title,
        slug: breed.slug,
        imgUrl: img.message as string,
      }
    })
  )
}
