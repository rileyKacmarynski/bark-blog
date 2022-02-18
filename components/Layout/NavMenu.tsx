import Link from 'next/link'
import React from 'react'
import { Post } from '../../lib/barkBlogApi'
import useSWR from 'swr'
import { MenuLink, MenuItem } from './MenuItem'
import AnimatedNav from './AnimatedNav'
import fetcher from '../../lib/fetcher'

const NavMenu: React.FC = () => {
  const { data: posts } = useSWR<Post[]>('/api/post', fetcher)

  const links = posts?.map(post => ({
    href: `/breed/${post.slug}`,
    text: post.name,
  })) ?? [{ href: '', text: 'Unable to fetch posts' }]

  return (
    <AnimatedNav>
      <MenuLink>
        <Link prefetch={false} href="/">Home</Link>
      </MenuLink>
      <MenuLink>
        <Link prefetch={false} href="/random-images">Random Images</Link>
      </MenuLink>
      <div>
        <MenuItem>
          <div className="mt-1 text-lg flex items-center gap-2 w-full text-neutral-600 cursor-default">
            <p className="flex-shrink-0">Breeds</p>
            <span className="h-[1px] w-full z-40 left-0 mt-1 bg-neutral-400" />
          </div>
        </MenuItem>
        {links.map(link => (
          <Link prefetch={false} key={link.href} href={link.href} passHref>
            <a>
              <MenuLink key={link.href}>{link.text}</MenuLink>
            </a>
          </Link>
        ))}
      </div>
    </AnimatedNav>
  )
}

export default NavMenu
