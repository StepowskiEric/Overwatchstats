import React from 'react'
import { Container, Button } from '@material-ui/core'

import MatchList from './MatchList/MatchList'

import { useAuth } from '../context/auth'

export default function Dashboard() {

    const {logOut} = useAuth()

    return (
        <Container>
            <MatchList />
        </Container>
    )
}
