import React, { useContext, useState } from 'react'

const Context = React.createContext({})

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        email: '',
        password: '',
        errorMsg: ''
    })
    console.log('is logged in:', authState.isLoggedIn)
    console.log('email:', authState.email)
    console.log('password:', authState.password)
    console.log('error message:', authState.errorMsg)
    console.log('-------------------------')

    const register = (email, password) => {

        let newAuth = {}

        if (email && password) {
            console.log('registered')
            console.log('logged in')
            newAuth.isLoggedIn = true
            newAuth.email = email
            newAuth.password = password

            setAuthState({...newAuth})
        }
    } 

    const logIn = (email, password) => {
        let newAuth = {}

        if (email && password) {
            console.log('registered')
            console.log('logged in')
            newAuth.isLoggedIn = true
            newAuth.email = email
            newAuth.password = password

            setAuthState({...newAuth})
        }
    }

    const logOut = () => {
        let newAuth = {}

        newAuth.isLoggedIn = false
        newAuth.email = ''
        newAuth.password = ''

        setAuthState({...newAuth})
    }

    const { isLoggedIn, email, password } = authState

    const value = {
        isLoggedIn,
        register,
        logIn,
        logOut,
        email,
        password
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AuthContextProvider
export const useAuth = () => useContext(Context)