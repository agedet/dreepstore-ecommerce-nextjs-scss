import { Box, Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'

function about() {
  const useStyles = makeStyles ((theme) => ({
    container: {
      padding: '150px 0 60px 0',
      overflow: 'hidden',
      height: {
        md: '100vh !important',
        lg: '100vh !important'
      }
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container>
        <Box 
          sx={{
            height: '100vh', 
            dispaly: 'flex', 
            alignItems: 'center',
            
          }}
        >
          <Typography 
            variant='h1'
            sx={{
              color: '#000000',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: '30px'
            }}
          >
            Page is under maintenance.
          </Typography>

          <Typography 
            variant='body1'
            sx={{
              color: '#000000',
              fontWeight: '400',
              marginTop:'50px',
              textAlign: 'center',
              fontSize: '16px'
            }}
          >
            We will have it up soon.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default about