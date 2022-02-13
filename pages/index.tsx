import { Fragment } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import CardLink from '../components/CardLink'
import { PageHeading, SmallText, Text } from '../components/typeography'
import { getFeaturedPosts } from '../lib/barkBlogApi'

export const getStaticProps: GetStaticProps<
  FeaturedPostsProps
> = async () => {
  const posts = await getFeaturedPosts()

  return {
    props: {
      posts,
      timestamp: new Date().toUTCString(),
    },
  }
}

interface FeaturedPostsProps {
  posts: Post[];
  timestamp: string;
}

interface Post {
  title: string
  slug: string
  imgUrl: string
}

const Home: NextPage<FeaturedPostsProps> = ({ posts, timestamp }) => {
  return (
    <Fragment>
      <PageHeading>Featured Posts</PageHeading>
      <Text>
        This page is statically generated. The featured breeds are specified
        here and a random image is fetched for each breed from the Dog CEO API.
        This means that if we refresh the page the images we see won&apos;t
        change unless we rebuild the site.
      </Text>
      <SmallText>This page was generated: {new Date(timestamp).toLocaleString()}</SmallText>
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
