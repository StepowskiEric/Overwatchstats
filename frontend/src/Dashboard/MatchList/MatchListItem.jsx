import React from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Grid, Box, Card, CardHeader, CardContent, CardActions, Avatar, Button } from '@material-ui/core'
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

    const sounds = {
        ana: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/97/Ana_-_Bedtime%2C_habibti.ogg',
        dva: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4c/D.Va_-_Easy_mode.ogg',
        orisa: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/96/Orisa_-_Error_404._Sarcasm_module_not_found.mp3',
        reinhardt: [
            'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ea/Reinhardt_-_Catch_phrase.ogg',
            'https://static.wikia.nocookie.net/overwatch_gamepedia/images/3/3e/Reinhardt_-_Are_you_afraid.ogg'
        ],
        roadhog: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/c1/Roadhog_-_Like_Taking_Candy_From_A_Baby.mp3',
        sigma: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/9d/Sigma-just-act-normal.ogg',
        winston: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/74/Winston_-_Did_someone_say_peanut_butter.ogg',
        wreckingBall: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/17/Systems_at_the_ready._Small_mammal_at_the_controls.wav',
        zarya: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/68/Zarya_-_I_can_bench_more_than_you.ogg',
        ashe: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ea/Ashe_-_That%27s_rich.mp3',
        bastion: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/59/Bastion_-_Dah-dah_weeeee.ogg',
        doomfist: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e6/Doomfist_-_Go_and_sit_down.ogg',
        echo: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/cc/Echo_-_Type_Echo.ogg',
        genji: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/65/Genji_-_Mada_mada%21.ogg',
        hanzo: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/12/Hanzo_-_Sake.ogg',
        junkrat: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/c2/Junkrat_-_Brrring%21.mp3',
        mccree: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/04/McCree_-_I%27m_your_Huckleberry.ogg',
        mei: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/6a/Mei_-_A-Mei-Zing.mp3',
        pharah: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/97/Pharah_-_Play_nice%2C_play_Pharah.ogg',
        reaper: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f4/Psychopath.mp3',
        soldier: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/da/Old_soldiers_never_die%2C_and_they_don%C2%B4t_fade_away.ogg',
        sombra: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/41/Sombra_-_Boop%21.ogg',
        symmetra: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/8f/Symmetra_-_I_will_put_you_in_your_place.ogg',
        torbjorn: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ea/Torbj%C3%B6rn_-_Voice_Default_-_Hard_Work_Pays_Off.ogg',
        tracer: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/b/bf/Tracer_-_The_world_could_always_use_more_heroes.ogg',
        widowmaker: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d0/Widowmaker_-_One_shot%2C_one_kill.ogg',
        baptiste: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/3/34/%E2%80%9CThank_you%2C_Baptiste.%E2%80%9D_Oh%2C_you%27re_welcome.ogg',
        brigitte: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/13/Mace_to_the_face%21.ogg',
        lucio: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/7e/L%C3%BAcio_-_cant_stop_wont_stop.ogg',
        mercy: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ef/On_a_scale_of_one_to_ten%2C_how_is_your_pain.mp3',
        moira: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/85/MoiraWhatAnInterestingHypothesis.mp3',
        zenyatta: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/63/Zenyatta_-_Hello_world.ogg'
    }

    const icons = {
        tank: <svg viewBox="0 0 32 32" role="presentation" width='28px' height='28px' fill='grey'>
                <title>Tank</title>
                <path d="M29,10.7c0,2.1,0,4.1,0,6.2c0,0.6-0.1,1.1-0.4,1.6c-2.9,5.3-6.8,9.7-11.8,13.2c-0.6,0.4-1,0.4-1.6,0
            c-4.9-3.4-8.8-7.8-11.7-13c-0.3-0.6-0.4-1.2-0.4-1.8c0-3.9,0.1-7.8,0-11.7C3,2.3,5.2,1.9,7.1,1.4C10.4,0.6,13.3,0,16.6,0
            c3.1,0,7.7,1.1,9.4,1.6c1.3,0.4,2.7,0.9,2.9,2.2C29,4.9,28.9,6,29,7.1C29,8.3,29,9.5,29,10.7C29,10.7,29,10.7,29,10.7z"></path>
            </svg>,
        dps: <svg viewBox="0 0 32 32" role="presentation" width='28px' height='28px' fill='grey'>
        <title>Damage</title>
        <g>
            <rect x="2.1" y="28.1" width="7.1" height="3.9"></rect>
            <path d="M9.1,7c0,0,0-0.5,0-0.7C8.6,1.5,5.6,0,5.6,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path>
        </g>
        <g>
            <rect x="12.5" y="28.1" width="7.1" height="3.9"></rect>
            <path d="M19.5,7c0,0,0-0.5,0-0.7C19,1.5,16,0,16,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4H16h3.5V7z"></path>
        </g>
        <g>
            <rect x="22.9" y="28.1" width="7.1" height="3.9"></rect>
            <path d="M29.9,7c0,0,0-0.5,0-0.7C29.4,1.5,26.4,0,26.4,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path>
        </g>
    </svg>,
        support: <svg viewBox="0 0 32 32" role="presentation" width='28px' height='28px' fill='grey'>
        <title>Support</title>
        <path fill-rule="evenodd" d="M29.3,10.2h-7.5V2.7c0-1.5-1.2-2.7-2.7-2.7h-6.3c-1.5,0-2.7,1.2-2.7,2.7v7.5H2.7
    c-1.5,0-2.7,1.2-2.7,2.7v6.3c0,1.5,1.2,2.7,2.7,2.7h7.5v7.5c0,1.5,1.2,2.7,2.7,2.7h6.3c1.5,0,2.7-1.2,2.7-2.7v-7.5h7.5
    c1.5,0,2.7-1.2,2.7-2.7v-6.3C32,11.4,30.8,10.2,29.3,10.2z"></path>
    </svg>
    }

    return (
        <Accordion onChange={() => handleChange(index)} expanded={expanded} style={{ backgroundImage: !disableBackground ? `url(${mapPictures[match.map]})` : '' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{backgroundColor: 'rgba(190, 190, 190, 0.8)'}}>
                <Grid container justify='space-between'>
                    <Grid item xs={4}>
                        <Typography variant='h6' style={{textTransform: 'capitalize', color: match.outcome === 0 ? 'red' : match.outcome === 1 ? 'green' : 'darkOrange'}}>{match.map}</Typography>
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
