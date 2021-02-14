import React, { useContext, useState } from 'react'

const Context = React.createContext({})

const ThemeContextProvider = ({ children }) => {
    const [disableBackgrounds, setDisableBackgrounds] = useState(false)

    const value = {
        disableBackgrounds,
        setDisableBackgrounds
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeContextProvider
export const useTheme = () => useContext(Context)