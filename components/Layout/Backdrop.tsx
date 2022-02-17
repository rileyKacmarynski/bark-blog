import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useNavMenu } from './NavMenuContext'

const variants: Variants = {
  open: {
    opacity: 0.25,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
}

const Backdrop: React.FC = () => {
  const { menuOpen } = useNavMenu()

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="nav-height absolute right-0 bottom-0 z-20 left-0 nav-height bg-black"
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
        ></motion.div>
      )}
    </AnimatePresence>
  )
}

export default Backdrop
