import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/material';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  const useStyles = makeStyles ((theme) => ({
    container: {
      padding: '10px 0 0px 0',
      overflow: 'hidden',
          minHeight: {
            md: '100vh !important',
            lg: '100vh !important'
          }
    },
}));

const classes = useStyles();

  return (
    <section title="Unauthorized Page" className={classes.container}>
      <Container>
        <Box 
          sx={{
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: "center", 
            alignItems: 'center'
          }}
        >
          <h1 className="text-xl">Access Denied</h1>
          {message && <div className="mb-4 text-red">{message}</div>}
        </Box>
      </Container>
    </section>
  );
}