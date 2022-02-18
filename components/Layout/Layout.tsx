import React, { useEffect, useRef } from 'react'
import NavMenu from './NavMenu'
import Backdrop from './Backdrop'
import SideNavToggle from './SideNavToggle'
import { motion } from 'framer-motion'
import { useOnClickOutside } from '../../hooks'
import { useNavMenu } from './NavMenuContext'

const Layout: React.FC = ({ children }) => {
  const clickOutsideRef = useRef(null)
  const { menuOpen, setMenuOpen } = useNavMenu()

  const handleClickOutside = () => {
    setMenuOpen(false)
  }

  useOnClickOutside(clickOutsideRef, handleClickOutside)

  useEffect(() => {
    document.body.style.overflowY = menuOpen ? 'hidden' : 'initial'

    return () => {
      document.body.style.overflowY = 'initial'
    }
  }, [menuOpen])

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

// add Head details

export default Layout
