import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

function Loading() {
  const useStyles = makeStyles (() => ({
    loadingContainer: {
      background: '#927780',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }
  }))

  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <Typography variant='h1'
        sx={{
          background: '#927780',
          color: '#000000'
        }}
      >
        Dreepstore
      </Typography>
    </div>
  )
}

export default Loading;