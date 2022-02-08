import { Fragment } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import CardLink from '../components/CardLink'
import { PageHeading, SmallText, Text } from '../components/typeography'

const makeUrl = (breedPathPart: string): string =>
  `https://dog.ceo/api/breed/${breedPathPart}/images/random`

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

export const getStaticProps: GetStaticProps<
  FeaturedPostsProps
> = async context => {
  const posts = await Promise.all(
    featuredBreeds.map(async breed => {
      const url = makeUrl(breed.pathPart)
      const imgResposnse = await fetch(url)
      const img = await imgResposnse.json()

      console.log('image for ', breed.title)

      return {
        title: breed.title,
        slug: breed.slug,
        imgUrl: img.message as string,
      }
    })
  )

  return {
    props: {
      posts,
    },
  }
}

interface FeaturedPostsProps {
  posts: Post[]
}

interface Post {
  title: string
  slug: string
  imgUrl: string
}

const Home: NextPage<FeaturedPostsProps> = ({ posts }) => {
  return (
    <Fragment>
      <PageHeading>Featured Posts</PageHeading>
      <Text>
        This page is statically generated. The featured breeds are specified
        here and a random image is fetched for each breed from the Dog CEO API.
        This means that if we refresh the page the images we see won&apos;t
        change unless we rebuild the site.
      </Text>
      <SmallText>This page was generated: {new Date().toUTCString()}</SmallText>
      <div className="mt-12 grid gap-6 grid-cols-medium">
        {posts.map(post => (
          <CardLink
            key={post.title}
            img={post.imgUrl}
            title={post.title}
            slug={post.slug}
          />
        ))}
      </div>
    </Fragment>
  )
}

export default Home
