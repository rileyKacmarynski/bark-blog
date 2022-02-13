import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CardLinkProps {
  img: string
  title: string
  slug: string
}

const variants = {
  start: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
}

const CardLink: React.FC<CardLinkProps> = post => {
  return (
    <Link passHref href={`/breed/${encodeURIComponent(post.slug)}`}>
      <motion.div
        className={`pic-card overflow-hidden cursor-pointer rounded-3xl shadow-md hover:shadow-xl hover:shadow-neutral-600 transition-all duration-200 shadow-neutral-400 h-[300px] flex justify-center items-center`}
        whileHover="hover"
      >
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: `url(${post.img})` }}
          className="z-[-1] rounded-3xl absolute bg-cover bg-center h-full w-full"
          variants={variants}
        ></motion.span>
        <motion.h2
          className="z-10 drop-shadow-lg leading-8 text-3xl font-semibold tracking-wide uppercase px-6 text-center text-neutral-50"
          variants={{
            start: {
              y: 0,
              scale: 1,
              transition: { duration: 0.2 },
            },
            hover: {
              y: '100px',
              scale: 1.1,
              transition: { duration: 0.2 },
            },
          }}
        >
          {post.title}
        </motion.h2>
      </motion.div>
    </Link>
  )
}

export default CardLink
