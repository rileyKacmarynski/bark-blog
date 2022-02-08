import React from 'react'

interface NavMenuContext {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = {
  menuOpen: false,
  setMenuOpen: () => (state: boolean) => {
    return state
  },
}

const NavMenuContext = React.createContext<NavMenuContext>(initialState)

const useNavMenu = () => {
  const context = React.useContext(NavMenuContext)
  if (context === undefined) {
    throw new Error('useNavMenu must be used within a NavMenuProvider')
  }

  return context
}

const NavMenuProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const memoizedValue = React.useMemo(
    () => ({
      setMenuOpen,
      menuOpen,
    }),
    [setMenuOpen, menuOpen]
  )

  return (
    <NavMenuContext.Provider value={memoizedValue}>
      {children}
    </NavMenuContext.Provider>
  )
}

export { NavMenuProvider, useNavMenu }
