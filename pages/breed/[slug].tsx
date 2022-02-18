import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { PageHeading, SmallText, Text } from '../../components/typeography'
import { getFeaturedPaths, getPost } from '../../lib/barkBlogApi'

export const getStaticPaths: GetStaticPaths = async () => {
  const featuredBreeds = await getFeaturedPaths()

  return {
    paths: featuredBreeds.map(slug => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<BreedProps> = async ({
  params,
}) => {
  // we can pass an array for a single params to do /bulldog/french if we
  // wanted to, but we're not doing that here.
  if (typeof params?.slug !== 'string') {
    throw new Error('how did we get here?')
  }

  const post = await getPost(params.slug)

  return {
    props: {
      title: post.title,
      content: post.content,
      timestamp: new Date().toUTCString(),
      image: {
        srcRegular: post.image.urls.regular,
        srcLoad: post.image.urls.small,
        width: post.image.width,
        height: post.image.height,
        user: {
          name: post.image.user.name,
          profileLink: post.image.user.links.self,
        },
      },
    },
  }
}

interface BreedProps {
  timestamp: string
  title: string
  image: {
    srcRegular: string
    srcLoad: string
    width: number
    height: number
    user: {
      name: string
      profileLink: string
    }
  }
  content: string
}

const Breed: React.FC<BreedProps> = ({ title, content, image, timestamp }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>generating page</div>
  }

  return (
    <div>
      <div className="max-w-[65ch] mx-auto">
        <PageHeading>{title}</PageHeading>
        <Text>
          Featured breeds are statically generated at build time. If{' '}
          <code>fallback</code> is set to <code>false</code>, then non-featured
          breeds will return a <code>404</code> page. If <code>fallback</code>{' '}
          is <code>true</code>, then Next.js will statically generate the page
          for that breed. <code>fallback blocking</code> will result in the page
          being server-side rendered. Next.js will add this path to the list of
          pre-rendered pages. Susequent requests will serve the generated page.
        </Text>
        <SmallText>
          Page generated at: {new Date(timestamp).toLocaleString()}
        </SmallText>
      </div>
      <div className="mt-8 max-w-xl">
        <Image
          height={image.height}
          width={image.width}
          src={image.srcRegular}
          alt={`picture of a ${title}`}
          placeholder="blur"
          blurDataURL={image.srcLoad}
        />
        <Text>{content}</Text>
      </div>
    </div>
  )
}

export default Breed
