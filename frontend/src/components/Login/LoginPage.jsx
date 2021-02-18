import React, { useState } from 'react'
import { Container, Box, Grid, Button, CircularProgress, TextField } from '@material-ui/core'

import { useAuth } from '../../context/auth'

export default function LoginPage() {
    
    const { register, logIn, errorMsg, inputError } = useAuth()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handlePasswordInput = (text) => {
        setPassword(text)
    }

    const handleRegister = () => {
        register(email, password)
    }

    const handleLogin = () => {
        logIn(email, password)
    }

    return (
        <Container>
            <Box textAlign='center' pt={6} >
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <Grid container style={{maxWidth: '600px'}} justify='center' alignItems='center'>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => handleEmailInput(e.target.value)} error={inputError} value={email} label="Email" variant="outlined" style={{width: '100%'}}/>
                            </Grid>
                            <Grid item xs={12} style={{paddingTop: '12px'}}>
                                <TextField onChange={(e) => handlePasswordInput(e.target.value)} error={inputError} value={password} label="Password" variant="outlined" style={{width: '100%'}} type='password'/>
                            </Grid>
                            <Grid item xs={12} style={{paddingTop: '12px'}}>
                                <Button variant='outlined' onClick={handleRegister} disabled={!email.length || !password.length}>Register</Button>
                                <Button variant='outlined' color='primary' onClick={handleLogin} disabled={!email.length || !password.length}>Log In</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
