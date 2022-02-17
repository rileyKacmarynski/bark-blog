import { motion, Variants } from 'framer-motion'

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
      delay: 0.3,
    },
  },
}

const navItems: Variants = {
  open: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.005,
      staggerDirection: -1,
      delayChildren: 0,
    },
  },
}

const AnimatedNav: React.FC = ({ children }) => {
  return (
    <motion.div
      className="nav-height z-40 absolute w-[300px] shadow-lg bg-neutral-200 px-2 py-2"
      variants={sideNav}
      initial={false}
    >
      <motion.ul variants={navItems} className="py-2">
        {children}
      </motion.ul>
    </motion.div>
  )
}

export default AnimatedNav
