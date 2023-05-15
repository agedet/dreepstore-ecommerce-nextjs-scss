import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

function Loading() {
  const useStyles = makeStyles (() => ({
    loadingContainer: {
      background: '#927780'
    }
  }))

  return (
    <div className={classes.loadingContainer}>
      <Typography variant='h1'
        sx={{
          background: '#927780'
        }}
      >

      </Typography>
    </div>
  )
}

export default Loading;