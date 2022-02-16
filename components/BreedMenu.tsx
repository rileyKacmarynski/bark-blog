import { useEffect, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { getAllPosts, Post } from '../lib/barkBlogApi'
import Menu from './Dropdown/Menu'

const links = [
  { href: '/blah', text: 'dog 1'},
  { href: '/blah', text: 'dog 2'},
  { href: '/blah', text: 'dog 3'},
  { href: '/blah', text: 'dog 4'},
]

type Link = {
  href: string;
  text: string;
}

// const fetcher = async (input: RequestInfo, init?: RequestInit): Promise<Post> {
//   const res = await fetch(input, init)
//   return res.json()
// }

const fetcher: Fetcher<Post[]> = (url: string) => fetch(url).then(res => res.json())

const BreedMenu = () => {
  const { data: posts } = useSWR<Post[]>('/api/post', fetcher)

  const links = posts?.map(post => ({ 
    href: `/breed/${post.slug}`,
    text: post.name,
  })) ?? [{ href: '', text: 'Unable to fetch posts'}]
  // useEffect(() => {
  //   const getLinks = async () => {
  //     // const posts = fetch('/api/post').then(res => res.json())
  //     const result = posts.map(post => ({ 
  //       href: `/breed/${post.slug}`,
  //       text: post.name,
  //     }))

  //     setLinks(result)
  //   }
  
  //   getLinks()
  // })
  console.log(links)
  
  return (
    <Menu title="Breeds" links={links} />
  )
}

export default BreedMenu
