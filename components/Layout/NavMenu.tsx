import Link from 'next/link'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import MenuItem from './MenuItem'

const links = [
  { href: '/lists/1', text: 'List 1' },
  { href: '/lists/2', text: 'List 2' },
  { href: '/lists/3', text: 'List 3' },
]

const sideNav: Variants = {
  open: {
    x: 0,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  closed: {
    x: -300,
    transition: {
      duration: 0.2,
    },
  },
}

const navItems: Variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
}

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: -10,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const NavMenu: React.FC = () => {
  return (
    <motion.div
      className="nav-height z-40 absolute w-[300px] shadow-lg bg-neutral-200 px-2 py-2"
      variants={sideNav}
      initial={false}
    >
      <motion.ul variants={navItems} className="py-2">
        <MenuItem>
          <Link href="/">Home</Link>
        </MenuItem> 
        <MenuItem>
          <Link href="/random-images">Random Images</Link>
        </MenuItem> 
        <motion.div variants={variants}>
          <div className="mt-1 text-lg flex items-center gap-2 w-full text-neutral-600 cursor-default">
            <p className="flex-shrink-0">Link Group</p>
            <span className='h-[1px] w-full z-40 left-0 mt-1 bg-neutral-400'/>
          </div>
          {links.map(link => (
            <MenuItem key={link.href}>
              <Link href={link.href}>{link.text}</Link>
            </MenuItem>
          ))}
        </motion.div>
      </motion.ul>
    </motion.div>
  )
}

export default NavMenu
