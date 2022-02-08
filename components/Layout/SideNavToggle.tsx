import { motion } from 'framer-motion'
import classNames from 'classnames'

interface SideNavToggleProps {
  toggleMenu: () => void
}

const Path: React.FC<any> = props => (
  <motion.path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    {...props}
  />
)

const iconClasses =
  'h-6 w-6 cursor-pointer hover:text-neutral-300 transition-all'

const SideNavToggle: React.FC<SideNavToggleProps> = ({ toggleMenu, ...childProps}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("h-6 w-6", iconClasses)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={toggleMenu}
      {...childProps}
    >
        <Path 
          d="M6 18L18 6M6 6l12 12" 
          variants={{
            open: { opacity: 1, transition: { duration: .2 }},
            closed: { opacity: 0, transition: { duration: .2 }},
          }}
        />
        <Path d="M4 6h16M4 12h16M4 18h16" 
          variants={{
            open: { opacity: 0, transition: { duration: .2 }},
            closed: { opacity: 1, transition: { duration: .2 }},
          }}
        />
    </svg>
  )
}

export default SideNavToggle
