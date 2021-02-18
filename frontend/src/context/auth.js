import React, { useContext, useState } from 'react'
import axios from 'axios'

const Context = React.createContext({})

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        email: '',
        name: '',
        password: '',
        players: [],
        matches: [],
        inputError: false,
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
            axios.post('http://localhost:5000/login', {
                email,
                password
              })
              .then(function (response) {
                  if (response.data.status === 500) {
                    newAuth.errorMsg = response.data.data
                    newAuth.inputError = true
                    setAuthState({...newAuth})
                  } else if (response.data.status === 200) {
                      console.log(response.data)
                    console.log('logged in')
                    newAuth.isLoggedIn = true
                    newAuth.email = email
                    newAuth.password = password
                    newAuth.matches = response.data.data.matches
                    newAuth.players = response.data.data.players
                    setAuthState({...newAuth})
                  }
              })
              .catch(function (error) {
                console.log(error)
              })
        }
    }

    const logOut = () => {
        let newAuth = {}

        newAuth.isLoggedIn = false
        newAuth.email = ''
        newAuth.password = ''

        setAuthState({...newAuth})
    }

    const addPlayer = (playerName) => {
        axios.post('http://localhost:5000/player', {
                email: authState.email,
                password: authState.password,
                playername: playerName
              })
              .then(function (response) {
                  if (response.data.status === 500) {
                      console.log('error')
                  } else if (response.data.status === 200) {
                      console.log('successful')
                  }
              })
              .catch(function (error) {
                console.log(error)
              })
    }

    const getPlayers = () => {
        axios.get('http://localhost:5000/player', {
                email: authState.email,
                password: authState.password
              })
              .then(function (response) {
                  if (response.data.status === 500) {
                      console.log('error')
                  } else if (response.data.status === 200) {
                      console.log('successful')
                  }
              })
              .catch(function (error) {
                console.log(error)
              })
    }

    const addMatch = () => {

    }

    const { isLoggedIn, email, password } = authState

    const value = {
        isLoggedIn,
        register,
        logIn,
        logOut,
        email,
        password,
        inputError: authState.inputError,
        errorMsg: authState.errorMsg,
        players: authState.players,
        matches: authState.matches,
        addPlayer
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AuthContextProvider
export const useAuth = () => useContext(Context)