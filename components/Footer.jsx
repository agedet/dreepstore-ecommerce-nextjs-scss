import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";

export default function Footer() {

    const useStyles = makeStyles (() => ({
        footerContainer: {
            background: '#000000',
            padding: "60px 0"
        }
    }))

    const classes = useStyles();
  return (
    <Box className={classes.footerContainer}>
        <Container>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4}>                
                        <div className='footer-sec-name'>
                            <Typography variant="h4" sx={{color: '#927780', fontWeight: '400', fontFamily: 'Fauna One'}}>
                                DreepStore
                            </Typography>
                            <Typography variant="h4" sx={{color: '#ffffff', fontWeight: '400', fontFamily: 'Fauna One'}}>
                                
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} md={4}>
                                    <div className='footer-sec'>
                                        <Typography variant="h5" sx={{color: '#ffffff', fontWeight: '400', fontFamily: 'Fauna One'}}>Quick Links</Typography>

                                        <ul 
                                            style={{
                                            margin: '20px 0'
                                            }}
                                        >
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/'>Home</Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/cart'>Cart</Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/about-us'>About Us</Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/blog'>Blog</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <div className='footer-sec'>
                                        <Typography variant="h5" sx={{color: '#ffffff', fontWeight: '400', fontFamily: 'Fauna One'}}>Support</Typography>

                                        <ul style={{
                                            margin: '20px 0'
                                            }}>
                                            <li 
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/terms'>
                                                Terms of service
                                                </Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/legal'>
                                                Legal
                                                </Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/privacy'>
                                                Privacy Policy
                                                </Link>
                                            </li>
                                            <li
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='/shipping'>
                                                Shipping
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <div className='footer-sec'>
                                        <Typography variant="h5" sx={{color: '#ffffff', fontWeight: '400', fontFamily: 'Fauna One'}}>
                                            Follow us
                                        </Typography>

                                        <ul style={{
                                            margin: '20px 0'
                                            }}>
                                            <li 
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                                >
                                                <Link href='https://www.facebook.com/dreepstore'>
                                                    Facebook
                                                </Link>
                                            </li>
                                            <li 
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='https://www.twitter.com/dreepstore'>
                                                    Twitter
                                                </Link>
                                            </li>
                                            <li 
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='https://www.instagram.com/dreepstore'>
                                                    Instagram
                                                </Link>
                                            </li>
                                            <li 
                                                style={{
                                                    color: '#ffffff', 
                                                    textDecoration: 'none', 
                                                    listStyle: 'none',
                                                    fontWeight: '400',
                                                    fontSize: '14px',
                                                    fontFamily: 'Fauna One'

                                                }}
                                            >
                                                <Link href='https://www.telegram.com/dreepstore'>
                                                    Telegram
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box> 
            <Typography variant="body2" 
                sx={{
                    color: '#ffffff', 
                    textAlign: 'center', 
                    marginTop: '20px', 
                    fontFamily: 'Fauna One',
                    fontSize: '14px', 
                    fontWeight: '400'
                }}
            >
                Copyright © 2022. All Rights Reserved
            </Typography>
        </Container>
    </Box>
  )
}
