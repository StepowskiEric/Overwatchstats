import React from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Grid, Box } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CodeIcon from '@material-ui/icons/Code'

export default function MatchListItem({ match, index, expanded, handleChange, disableBackground }) {

    const statusColors = {
        win: 'rgba(0, 128, 0, 0.8)',
        loss: 'rgba(178, 34, 34, 0.8)',
        tie: 'rgba(190, 190, 190, 0.8)',
        grey: 'rgba(190, 190, 190, 0.8)'
    }

    const mapPictures = {
        ayutthaya: 'https://static.playoverwatch.com/img/pages/maps/images/ayutthaya.jpg',
        blackForest: 'https://static.playoverwatch.com/img/pages/maps/images/black-forest.jpg',
        blizzardWorld: 'https://static.playoverwatch.com/img/pages/maps/images/blizzard-world.jpg',
        busan: 'https://static.playoverwatch.com/img/pages/maps/images/busan.jpg',
        castillo: 'https://static.playoverwatch.com/img/pages/maps/images/castillo.jpg',
        chateuGuillard: 'https://static.playoverwatch.com/img/pages/maps/images/chateau-guillard.jpg',
        dorado: 'https://static.playoverwatch.com/img/pages/maps/images/dorado.jpg',
        ecopointAntarctica: 'https://static.playoverwatch.com/img/pages/maps/images/ecopoint-antarctica.jpg',
        eichenwalde: 'https://static.playoverwatch.com/img/pages/maps/images/eichenwalde.jpg',
        hanamura: 'https://static.playoverwatch.com/img/pages/maps/images/hanamura.jpg',
        havana: 'https://static.playoverwatch.com/img/pages/maps/images/havana.jpg',
        hollywood: 'https://static.playoverwatch.com/img/pages/maps/images/hollywood.jpg',
        horizon: 'https://static.playoverwatch.com/img/pages/maps/images/horizon-lunar-colony.jpg',
        ilios: 'https://static.playoverwatch.com/img/pages/maps/images/ilios.jpg',
        junkertown: 'https://static.playoverwatch.com/img/pages/maps/images/junkertown.jpg',
        kanezaka: 'https://playoverwatch.com/en-us/maps/',
        kingsRow: 'https://static.playoverwatch.com/img/pages/maps/images/kings-row.jpg',
        lijiangTower: 'https://static.playoverwatch.com/img/pages/maps/images/lijiang-tower.jpg',
        necropolis: 'https://static.playoverwatch.com/img/pages/maps/images/necropolis.jpg',
        nepal: 'https://static.playoverwatch.com/img/pages/maps/images/nepal.jpg',
        numbani: 'https://static.playoverwatch.com/img/pages/maps/images/numbani.jpg',
        oasis: 'https://static.playoverwatch.com/img/pages/maps/images/oasis.jpg',
        paris: 'https://static.playoverwatch.com/img/pages/maps/images/paris.jpg',
        petra: 'https://static.playoverwatch.com/img/pages/maps/images/petra.jpg',
        rialto: 'https://static.playoverwatch.com/img/pages/maps/images/rialto.jpg',
        route66: 'https://static.playoverwatch.com/img/pages/maps/images/route-66.jpg',
        templeOfAnubis: 'https://static.playoverwatch.com/img/pages/maps/images/temple-of-anubis.jpg',
        volskaya: 'https://static.playoverwatch.com/img/pages/maps/images/volskaya-industries.jpg',
        gibraltar: 'https://static.playoverwatch.com/img/pages/maps/images/watchpoint-gibraltar.jpg'
    }
    const heroPictures = {
        ana: 'https://d1u1mce87gyfbn.cloudfront.net/hero/ana/icon-portrait.png',
        dva: 'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/icon-portrait.png',
        orisa: 'https://d1u1mce87gyfbn.cloudfront.net/hero/orisa/icon-portrait.png',
        reinhardt: 'https://d1u1mce87gyfbn.cloudfront.net/hero/reinhardt/icon-portrait.png',
        roadhog: 'https://d1u1mce87gyfbn.cloudfront.net/hero/roadhog/icon-portrait.png',
        sigma: 'https://d1u1mce87gyfbn.cloudfront.net/hero/sigma/icon-portrait.png',
        winston: 'https://d1u1mce87gyfbn.cloudfront.net/hero/winston/icon-portrait.png',
        wreckingBall: 'https://d1u1mce87gyfbn.cloudfront.net/hero/wrecking-ball/icon-portrait.png',
        zarya: 'https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/icon-portrait.png',
        ashe: 'https://d1u1mce87gyfbn.cloudfront.net/hero/ashe/icon-portrait.png',
        bastion: 'https://d1u1mce87gyfbn.cloudfront.net/hero/bastion/icon-portrait.png',
        doomfist: 'https://d1u1mce87gyfbn.cloudfront.net/hero/doomfist/icon-portrait.png',
        echo: 'https://d1u1mce87gyfbn.cloudfront.net/hero/echo/icon-portrait.png',
        genji: 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/icon-portrait.png',
        hanzo: 'https://d1u1mce87gyfbn.cloudfront.net/hero/hanzo/icon-portrait.png',
        junkrat: 'https://d1u1mce87gyfbn.cloudfront.net/hero/junkrat/icon-portrait.png',
        mccree: 'https://d1u1mce87gyfbn.cloudfront.net/hero/mccree/icon-portrait.png',
        mei: 'https://d1u1mce87gyfbn.cloudfront.net/hero/mei/icon-portrait.png',
        pharah: 'https://d1u1mce87gyfbn.cloudfront.net/hero/pharah/icon-portrait.png',
        reaper: 'https://d1u1mce87gyfbn.cloudfront.net/hero/reaper/icon-portrait.png',
        soldier: 'https://d1u1mce87gyfbn.cloudfront.net/hero/soldier-76/icon-portrait.png',
        sombra: 'https://d1u1mce87gyfbn.cloudfront.net/hero/sombra/icon-portrait.png',
        symmetra: 'https://d1u1mce87gyfbn.cloudfront.net/hero/symmetra/icon-portrait.png',
        torbjorn: 'https://d1u1mce87gyfbn.cloudfront.net/hero/torbjorn/icon-portrait.png',
        tracer: 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/icon-portrait.png',
        widowmaker: 'https://d1u1mce87gyfbn.cloudfront.net/hero/widowmaker/icon-portrait.png',
        ana: 'https://d1u1mce87gyfbn.cloudfront.net/hero/ana/icon-portrait.png',
        baptiste: 'https://d1u1mce87gyfbn.cloudfront.net/hero/baptiste/icon-portrait.png',
        brigitte: 'https://d1u1mce87gyfbn.cloudfront.net/hero/brigitte/icon-portrait.png',
        lucio: 'https://d1u1mce87gyfbn.cloudfront.net/hero/lucio/icon-portrait.png',
        mercy: 'https://d1u1mce87gyfbn.cloudfront.net/hero/mercy/icon-portrait.png',
        moira: 'https://d1u1mce87gyfbn.cloudfront.net/hero/moira/icon-portrait.png',
        zenyatta: 'https://d1u1mce87gyfbn.cloudfront.net/hero/zenyatta/icon-portrait.png'
    }

    return (
        <Accordion onChange={() => handleChange(index)} expanded={expanded} style={{ backgroundImage: !disableBackground ? `url(${mapPictures[match.map]})` : '' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: 'rgba(190, 190, 190, 0.8)'}}>
                <Grid container justify='space-between'>
                    <Grid item xs={4}>
                        <Typography>{match.map}</Typography>
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
                    <Grid item sm={6} xs={12}>
                        <Box p={2} style={{backgroundColor: 'rgba(190, 190, 190, 0.8)', borderRadius: '5px'}}>
                            <List >
                                <Typography>
                                    Players:
                                </Typography>
                                {
                                    match.players.map(player => {
                                        return (
                                            <ListItem>
                                                <Typography>{player.name}</Typography>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                        
                    </Grid>
                </Grid>
                
            </AccordionDetails>
        </Accordion>
    )
}
