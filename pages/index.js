import Head from 'next/head';
import { Banner, ProductCard } from '../components';
import data from '../utils/data.js';
import {ToastContainer} from 'react-toastify'
import { makeStyles } from '@mui/styles';
import { Box, Container, Grid, Typography } from '@mui/material';


function HomePage() {
    const useStyles = makeStyles ((theme) => ({
        container: {
            padding: '120px 0 80px 0',
        }
    }));

    const classes = useStyles();

    return (
      <div className={classes.container}>
        <Head>
            <title>
                DreepStore - ecommerce website
            </title>
            {/* {description &&  */}
                <meta 
                    name="description" 
                    content="shoes, shirts, mules, shorts" 
                    // content={description} 
                />
            {/* } */}
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <ToastContainer position="top-center" limit={1} />

        {/* Banner */}
        {/* <Box >
            <Banner />
        </Box> */}

        <Container>
           <Typography variant='h3' 
                sx={{
                    fontWeight: '700', 
                    // fontFamily: 'Poppins', 
                    fontSize: '20px', 
                    marginBottom: '20px'
                }}
            >
                Products
            </Typography> 

            <Grid container spacing={3}>
                {data.products.map((product) => (
                    <Grid key={product.slug} item xs={12} sm={6} md={4} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>

        {/* <section className='hero'>
            <div className='container'>
                <div className='prod-banner'>
                    <img 
                        src='/images/alirac.jpg' 
                        alt='wardrobe'
                    />
                </div>
            </div>
        </section> */}
        
        {/* <section className='products'>
            <div className='container'>
                <p>Products</p>
                <div className='product-card-display'>
                    {data.products.map((product) => (
                        <ProductCard product={product} key={product.slug} />  
                    ))}
                </div>
            </div>
        </section> */}
    </div>  
    ) 
}

export default HomePage;