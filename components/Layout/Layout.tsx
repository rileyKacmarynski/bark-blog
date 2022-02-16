import { Fragment, useRef, useState } from 'react'
import NavMenu from './NavMenu'
import Backdrop from './Backdrop'
import SideNavToggle from './SideNavToggle'
import { motion } from 'framer-motion'
import { useOnClickOutside } from '../../hooks'
import { useNavMenu } from './NavMenuContext'
import BreedMenu from '../BreedMenu'

const Layout: React.FC = ({ children }) => {
  const clickOutsideRef = useRef(null)
  const { menuOpen, setMenuOpen } = useNavMenu()

  const handleClickOutside = () => {
    setMenuOpen(false)
  }

  useOnClickOutside(clickOutsideRef, handleClickOutside)

  return (
    <Fragment>
      <motion.div animate={menuOpen ? 'open' : 'closed'}>
        <div ref={clickOutsideRef}>
          <nav className="px-3 h-11 bg-sky-700 text-neutral-200 flex items-center justify-between font-semibold">
            <SideNavToggle toggleMenu={() => setMenuOpen(o => !o)} />
          </nav>
          <NavMenu />
        </div>
        <Backdrop />
      </motion.div>
      <main className="content container mx-auto py-3 px-3">{children}</main>
    </Fragment>
  )
}

// add Head details

export default Layout
