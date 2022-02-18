import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { PageHeading, SmallText, Text } from '../components/typeography'

interface RandomImageProps {
  images: string[]
  timestamp: string
}

export const getServerSideProps: GetServerSideProps<
  RandomImageProps
> = async () => {
  const url = 'https://dog.ceo/api/breeds/image/random/12'
  const res = await fetch(url)
  const images = await res.json()

  return {
    props: {
      images: images.message,
      timestamp: new Date().toUTCString(),
    },
  }
}

const RandomImage: NextPage<RandomImageProps> = ({ images, timestamp }) => {
  return (
    <React.Fragment>
      <div className="max-w-[65ch] mx-auto">
        <PageHeading>Images</PageHeading>
        <Text>
          This page is server side rendered. Images are fetched from the Dog CEO
          API for each request. Refreshing the page will return a new set of
          images
        </Text>
        <SmallText>
          This page was generated: {new Date(timestamp).toLocaleString()}
        </SmallText>
      </div>
      <div className="mt-6 grid gap-6 grid-cols-medium justify-center items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden flex rounded-3xl shadow-lg shadow-neutral-600"
          >
            <Image
              className=""
              key={index}
              src={image}
              width={300}
              height={300}
              alt="Image of dog"
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default RandomImage
