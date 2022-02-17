import { motion, Variants } from 'framer-motion'
import React from 'react'
import { useNavMenu } from './NavMenuContext'

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

const MenuItem: React.FC = ({ children }) => {
  return (
    <motion.div variants={variants}>
      {children}
    </motion.div>
  )
}

const MenuLink: React.FC = ({ children }) => {
  const { setMenuOpen } = useNavMenu()
  const handleClick = () => {
    setMenuOpen(false)
  }

  return (
    <motion.li
      onClick={handleClick} 
      className="cursor-pointer font-light py-1 px-2 hover:bg-slate-300 rounded-sm transition-colors"
      variants={variants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
    >
      {children}
    </motion.li>
  )
}

export { MenuLink, MenuItem}
