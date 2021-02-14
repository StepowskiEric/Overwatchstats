import React, { useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Paper, Tabs, Tab, Grid, TextField, Select, InputLabel, MenuItem, Typography, List, ListItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Add } from '@material-ui/icons'

export default function NewMatchDialog({ cancel }) {

    const [tabValue, setTabValue] = useState(0)
    const [name, setName] = useState('')
    const [map, setMap] = useState('')
    const [outcome, setOutcome] = useState('')
    const [players, setPlayers] = useState([])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
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
                            {
                                tabValue === 0 ?
                                <>
                                <Grid item style={{width: '100%'}} md={4} sm={6} xs={12}>
                                    <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} style={{width: '100%'}} />
                                </Grid>
                                </>
                                :
                                <>
                                    <Grid item style={{width: '100%'}} md={4} sm={6} xs={12}>
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
                                    <Grid item style={{width: '100%'}} md={4} sm={6} xs={12} style={{paddingTop: '12px'}}>
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
                                    <Grid item style={{width: '100%'}} md={4} sm={6} xs={12} style={{paddingTop: '12px'}}>
                                        <Typography>
                                            Players
                                        </Typography>
                                        <List>
                                            {

                                            }
                                        </List>
                                        <Button
                                            color='primary'
                                            variant='outlined'
                                        >
                                            <Add />
                                            Player
                                        </Button>
                                    </Grid>
                                </>
                            }
                        </Grid>
                </CardContent>
                <CardActions>
                    <Button variant='contained' color='primary'>
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
