import React, { useState } from 'react'
import { Button, Grid, Box, Switch, Typography, FormGroup, FormControlLabel } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import MatchListItem from './MatchListItem'
import NewMatchDialog from './NewMatchDialog'

import { useAuth } from '../../context/auth'
import { useTheme } from '../../context/theme'

export default function MatchList() {

    const { logOut } = useAuth()

    const [expanded, setExpanded] = useState(false)
    const [isCreatingNew, setIsCreatingNew] = useState(false)

    const { disableBackgrounds, setDisableBackgrounds } = useTheme()

    const handleChange = (panel) => {
        if (panel === expanded) {
            setExpanded(false)
        } else {
            setExpanded(panel)
        }
    }

    const matches = [
        {
            map: 'nepal',
            outcome: 1,
            players: [
                {
                    name: 'dichi',
                    role: 'tank',
                    heroes: [
                        'zarya',
                        'roadhog'
                    ]
                },
                {
                    name: 'jerry'
                },
                {
                    name: 'baba'
                }
            ],
            dateTime: ''
        },
        {
            map: 'eichenwalde',
            outcome: 0,
            players: [
                {
                    name: 'dichi'
                },
                {
                    name: 'jerry'
                },
                {
                    name: 'baba'
                }
            ],
            dateTime: ''
        }
        ,{
            map: 'kingsRow',
            outcome: 0,
            players: [
                {
                    name: 'dichi'
                },
                {
                    name: 'jerry'
                },
                {
                    name: 'baba'
                }
            ],
            dateTime: ''
        }
        ,{
            map: 'paris',
            outcome: 2,
            players: [
                {
                    name: 'dichi'
                },
                {
                    name: 'jerry'
                },
                {
                    name: 'baba'
                }
            ],
            dateTime: ''
        }
    ]

    return (
        <>
            <Box py={2}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={() => setIsCreatingNew(true)} disabled={isCreatingNew}><AddIcon />Add</Button>
                    </Grid>
                    <Grid item>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={disableBackgrounds}
                                        onChange={() => setDisableBackgrounds(!disableBackgrounds)}
                                        name="disableBackgrounds"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label={'Disable Background Images'}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        <Button onClick={logOut} variant='outlined' color='secondary'>Logout</Button>
                    </Grid>
                </Grid>
            </Box>
            {
                isCreatingNew && <NewMatchDialog cancel={() => setIsCreatingNew(false)}/>
            }
            {
                matches.map((match, index) => {
                    return (
                        <MatchListItem match={match} index={index} expanded={expanded === index} handleChange={handleChange} disableBackground={disableBackgrounds}/>
                    )
                })
            }
        </>
    )
}
