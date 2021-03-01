import React, { useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Paper, Tabs, Tab, Grid, TextField, Select, InputLabel, MenuItem, Typography, List, ListItem, CardHeader, Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Add } from '@material-ui/icons'
import { useAuth } from '../../../../context/auth'
import { heroNames, heroPictures, sounds, icons } from '../../../../components/data'

export default function NewMatchDialog({ cancel }) {

    const { addPlayer, players } = useAuth()

    const [tabValue, setTabValue] = useState(0)
    const [name, setName] = useState('')
    const [map, setMap] = useState('')
    const [outcome, setOutcome] = useState('')
    const [matchPlayers, setMatchPlayers] = useState([])

    const [playerToAdd, setPlayerToAdd] = useState(false)
    const [roleToAdd, setRoleToAdd] = useState('')
    console.log(players)
    console.log(matchPlayers)
    const addMatchPlayer = () => {
        if (playerToAdd) {
            let array = matchPlayers
            array.push({player: players.filter(player => player.playername === playerToAdd)[0], role: roleToAdd, heroes: []})
            setMatchPlayers([...array])
            setPlayerToAdd(false)
            setRoleToAdd('')
        }
    }

    const choosePlayerToAdd = (player) => {
        setPlayerToAdd(player)
    }


    const chooseRoleToAdd = (role) => {
        setRoleToAdd(role)
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const create = () => {
        if (tabValue === 0) {
            // Create a player
            addPlayer(name)
        } else if (tabValue === 1) {
            // Create a match

        }
    }

    const addHeroToPlayer = (player, hero) => {

    }


    return (
        <Box pb={2}>
            <Card variant='outlined'>
                <CardContent>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Player"/>
                            <Tab label="Match"/>
                        </Tabs>
                        <Grid container direction='column'>
                            <Card style={{padding: '16px'}} variant='outlined'>
                            {
                                tabValue === 0 ?
                                <>
                                <Grid item style={{width: '100%'}} md={4} sm={6} xs={12}>
                                    <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} style={{width: '100%'}} />
                                </Grid>
                                </>
                                :
                                <>
                                    <Grid item style={{width: '100%'}} md={6} sm={6} xs={12}>
                                        <InputLabel id="demo-simple-select-label">Outcome</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={outcome}
                                            onChange={(e) => setOutcome(e.target.value)}
                                            style={{width: '100%'}}
                                        >
                                            <MenuItem value={1}>Win</MenuItem>
                                            <MenuItem value={0}>Loss</MenuItem>
                                            <MenuItem value={2}>Tie</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item style={{width: '100%'}} md={6} sm={6} xs={12} style={{paddingTop: '12px'}}>
                                        <InputLabel id="demo-simple-select-label">Map</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={map}
                                            onChange={(e) => setMap(e.target.value)}
                                            style={{width: '100%'}}
                                        >
                                            <MenuItem value={'ayutthaya'}>Ayutthaya</MenuItem>
                                            <MenuItem value={'blackForest'}>Black Forest</MenuItem>
                                            <MenuItem value={'blizzardWorld'}>Blizzard World</MenuItem>
                                            <MenuItem value={'busan'}>Busan</MenuItem>
                                            <MenuItem value={'castillo'}>Castillo</MenuItem>
                                            <MenuItem value={'chateuGuillard'}>Chateu Guillard</MenuItem>
                                            <MenuItem value={'dorado'}>Dorado</MenuItem>
                                            <MenuItem value={'ecopointAntarctica'}>Ecopoint Antarctica</MenuItem>
                                            <MenuItem value={'eichenwalde'}>Eichenwalde</MenuItem>
                                            <MenuItem value={'hanamura'}>Hanamura</MenuItem>
                                            <MenuItem value={'havana'}>Havana</MenuItem>
                                            <MenuItem value={'hollywood'}>Hollywood</MenuItem>
                                            <MenuItem value={'horizon'}>Horizon</MenuItem>
                                            <MenuItem value={'ilios'}>Ilios</MenuItem>
                                            <MenuItem value={'junkertown'}>Junkertown</MenuItem>
                                            <MenuItem value={'kanezaka'}>Kanezaka</MenuItem>
                                            <MenuItem value={'kingsRow'}>King's Row</MenuItem>
                                            <MenuItem value={'lijiangTower'}>Lijiang Tower</MenuItem>
                                            <MenuItem value={'necropolis'}>Necropolis</MenuItem>
                                            <MenuItem value={'nepal'}>Nepal</MenuItem>
                                            <MenuItem value={'numbani'}>Numbani</MenuItem>
                                            <MenuItem value={'oasis'}>Oasis</MenuItem>
                                            <MenuItem value={'paris'}>Paris</MenuItem>
                                            <MenuItem value={'petra'}>Petra</MenuItem>
                                            <MenuItem value={'rialto'}>Rialto</MenuItem>
                                            <MenuItem value={'route66'}>Route 66</MenuItem>
                                            <MenuItem value={'templeOfAnubis'}>Temple of Anubis</MenuItem>
                                            <MenuItem value={'volskaya'}>Volskaya</MenuItem>
                                            <MenuItem value={'gibraltar'}>Gibraltar</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item style={{width: '100%'}} md={6} sm={6} xs={12} style={{paddingTop: '12px'}}>
                                        {
                                            <Card variant='outlined'>
                                                <Box p={3}>
                                                    <Grid container direction='row' justify='center' alignItems='center'>
                                                        <Grid item xs={12} style={{textAlign: 'center'}}>
                                                            <Typography>
                                                                You haven't created any players to add to matches.
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{textAlign: 'center'}}>
                                                            <Button
                                                                color='primary'
                                                                variant='outlined'
                                                                onClick={() => setTabValue(0)}
                                                            >
                                                                <Add />
                                                                Player
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                            
                                        }
                                        {
                                            players && players.length &&
                                            <>
                                                <Typography>
                                                    Players
                                                </Typography>
                                                <Grid container>
                                                    <Grid item xs={3}>
                                                            <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={playerToAdd}
                                                            onChange={(e) => choosePlayerToAdd(e.target.value)}
                                                            style={{width: '100%'}}
                                                            >
                                                                {
                                                                    players && players.length && players.map(player => {
                                                                        if (matchPlayers.filter(matchPlayer => matchPlayer.player.playername === player.playername).length) {
                                                                            return null
                                                                        }
                                                                        return (
                                                                            <MenuItem value={player.playername}>{player.playername}</MenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={roleToAdd}
                                                            onChange={(e) => chooseRoleToAdd(e.target.value)}
                                                            style={{width: '100%'}}
                                                        >
                                                            <MenuItem value={'tank'}>Tank</MenuItem>
                                                            <MenuItem value={'dps'}>DPS</MenuItem>
                                                            <MenuItem value={'support'}>Support</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button
                                                            color='primary'
                                                            variant='outlined'
                                                            onClick={() => addMatchPlayer()}
                                                        >
                                                            <Add />
                                                            Player
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        }
                                        <Grid container>
                                            {
                                                !!matchPlayers.length && matchPlayers.map(matchPlayer => {
                                                    return (
                                                        <Grid item>
                                                            <Card elevation={6}>
                                                                <CardHeader style={{backGroundColor: 'grey'}} title={<Typography style={{textTransform: 'capitalize'}}>{matchPlayer.player.playername}</Typography>} avatar={<div style={{height: '28px'}}>{icons[matchPlayer.role]}</div>}/>
                                                                <CardContent>
                                                                    <Grid container>
                                                                        {
                                                                            matchPlayer.heroes.length > 0 && matchPlayer.heroes.map(hero => {
                                                                                    return (
                                                                                        <Grid item>
                                                                                            <Avatar src={heroPictures[hero]} style={{cursor: 'pointer'}} onClick={() => {
                                                                                                    let sound = new Audio(Array.isArray(sounds[hero]) ? sounds[hero][0] : sounds[hero])
                                                                                                    sound.play()
                                                                                                    console.log('this is a test')
                                                                                                }}
                                                                                            />
                                                                                        </Grid>
                                                                                    )
                                                                            })
                                                                        }
                                                                    </Grid>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={roleToAdd}
                                                                        onChange={(e) => addHeroToPlayer(e.target.value)}
                                                                        style={{width: '100%'}}
                                                                    >
                                                                        {
                                                                            
                                                                        }
                                                                        <MenuItem value={'tank'}>Tank</MenuItem>
                                                                        <MenuItem value={'dps'}>DPS</MenuItem>
                                                                        <MenuItem value={'support'}>Support</MenuItem>
                                                                    </Select>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Grid container direction='row-reverse'>
                                                                        <Grid item>
                                                                            <Button color='primary' variant='contained'>View</Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardActions>
                                                            </Card>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Grid>
                                </>
                            }
                            </Card>
                        </Grid>
                </CardContent>
                <CardActions>
                    <Button onClick={() => create()} variant='contained' color='primary'>
                        Create
                    </Button>
                    <Button variant='contained' color='secondary' onClick={cancel}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
