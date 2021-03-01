import React from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Grid, Box, Card, CardHeader, CardContent, CardActions, Avatar, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CodeIcon from '@material-ui/icons/Code'
import { heroNames, heroPictures, mapPictures, sounds, icons } from '../../../components/data'

export default function MatchListItem({ match, index, expanded, handleChange, disableBackground }) {

    return (
        <Accordion onChange={() => handleChange(index)} expanded={expanded} style={{ backgroundImage: !disableBackground ? `url(${mapPictures[match.map]})` : '' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: 'rgba(190, 190, 190, 0.8)'}}>
                <Grid container justify='space-between'>
                    <Grid item xs={4}>
                        <Typography variant='h6' style={{textTransform: 'capitalize', fontFamily: 'Big Noodle Too,impact,sans-serif', fontStyle: 'italic', fontWeight: '400', color: 'white'}}>{match.map}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {
                            match.outcome === 0 ?
                            <HighlightOffIcon style={{color: 'red'}} />
                            :
                            match.outcome === 1 ?
                            <CheckCircleIcon style={{color: 'green'}} />
                            :
                            <CodeIcon style={{color: 'darkOrange'}} />
                        }
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify='flex-start' spacing={3}>
                            {
                                match.players.map(player => {
                                    console.log(player)
                                    return (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card elevation={6}>
                                                <CardHeader style={{backGroundColor: 'grey'}} title={<Typography style={{textTransform: 'capitalize'}}>{player.name}</Typography>} avatar={<div style={{height: '28px'}}>{icons[player.role]}</div>}/>
                                                <CardContent>
                                                    <Grid container>
                                                        {
                                                            player.heroes && player.heroes.map((hero, index) => {
                                                                if (index > 0) {
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
                                                                }
                                                            })
                                                        }
                                                    </Grid>
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
                </Grid>
                
            </AccordionDetails>
        </Accordion>
    )
}
