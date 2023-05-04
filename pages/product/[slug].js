import { ProductDetail } from "../../components";
import {useRouter } from 'next/router';
import Rating from "../../utils/Rating";
import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import data from "../../utils/data.js";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { Box, Container, Grid, Typography } from "@mui/material";

const ProductScreen = () => {
    
    const { state, dispatch } = useContext(Store);
    const router = useRouter();

    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find((x) => x.slug === slug);
    if (!product) {
        return <div>Product Not Found</div>
    }

    // add to cart
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            alert('Sorry, Product is out of stock');
            return;
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    }

    const [selectedInput, setSelectedInput] = useState(0);
    const handleSelectedInput = (value) => {
        setSelectedInput(value);
    };

    const useStyles = makeStyles ((theme) => ({
        container: {
          padding: '120px 0 60px 0',
          fontFamily: 'Poppins',
        },
        buttonUpdate: {
            border: '1px solid #292a3c',
            backgroundColor: 'transparent',
            borderRadius: '50px',
            minWidth: '40px',
            height: '40px',
            padding: '0',
            margin: '5px 5px 5px 0',
            // borderRadius: '0',
            color: '#000000',
            cursor: 'pointer'

        },
        buttonActive: {
            backgroundColor: '#927780 !important',
            // border: '0',
            minWidth: '40px',
            height: '40px',
            borderRadius: '50px',
            color: '#ffffff !important',
            cursor: 'pointer'
        }
    }));
    
    const classes = useStyles();

    return (
        <section title={product.name} className={classes.container}>
            <Container>
                <Typography className="prod-link">
                    <Link href='/'>
                        <a style={{textTransform: 'capitalize', fontSize: '14px'}}>
                           <i className="fas fa-arrow-left"/>  {' '}
                           back to products   
                        </a>
                    </Link>
                </Typography>
                <div>
                    <Typography variant='h3'
                        sx={{fontWeight: '700', fontFamily: 'Poppins', fontSize: '20px', marginBottom: '20px'}}
                    >
                        Product Info
                    </Typography>
                </div>

                {/* Product Details */}
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                       <ProductDetail product={product} /> 
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <Box>
                            <div>
                                <Typography variant='h4'
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '600', 
                                        letterSpacing: '0.85px',
                                        fontSize: '38px',
                                        margin: '20px 0 40px'
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography variant="caption"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '500', 
                                        letterSpacing: '0.85px',
                                        fontSize: '24px',
                                        margin: '20px 0',
                                        display: 'block'
                                    }}
                                >
                                    ₦{product.price} 
                                </Typography>
                                <Typography variant="caption"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '400', 
                                        letterSpacing: '0.85px',
                                        fontSize: '14px',
                                        margin: '20px 0',
                                        display: 'block'
                                    }}
                                >
                                    {product.description} <br></br>
                                    Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made! All proceeds will be donated to charity.
                                </Typography>
                                <Typography variant="caption"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '500', 
                                        letterSpacing: '0.85px',
                                        fontSize: '16px',
                                        margin: '20px 0',
                                        display: 'block'
                                    }}
                                >
                                   Color:  {product.color}
                                    <i className="color-tic" />
                                </Typography>

                                <Typography variant="caption"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '500', 
                                        letterSpacing: '0.85px',
                                        fontSize: '16px',
                                        margin: '20px 0'
                                    }}
                                >
                                   Size:  
                                </Typography>

                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <div>
                                        <button type='button'
                                            name="one"
                                            value='1'
                                            onClick={() => handleSelectedInput(1)}
                                            className={selectedInput === 1 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            38
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="two"
                                            value='2'
                                            onClick={() => handleSelectedInput(2)}
                                            className={selectedInput === 2 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            39
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="three"
                                            value='3'
                                            onClick={() => handleSelectedInput(3)}
                                            className={selectedInput === 3 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            40
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="four"
                                            value='4'
                                            onClick={() => handleSelectedInput(4)}
                                            className={selectedInput === 4 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            41
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="five"
                                            value='5'
                                            onClick={() => handleSelectedInput(5)}
                                            className={selectedInput === 5 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            42
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="six"
                                            value='6'
                                            onClick={() => handleSelectedInput(6)}
                                            className={selectedInput === 6 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            43
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="seven"
                                            value='7'
                                            onClick={() => handleSelectedInput(7)}
                                            className={selectedInput === 7 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            44
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
                                            name="eight"
                                            value='8'
                                            onClick={() => handleSelectedInput(8)}
                                            className={selectedInput === 8 ? `${classes.buttonUpdate} ${classes.buttonActive}` : `${classes.buttonUpdate}`}
                                        >
                                            45
                                        </button>
                                    </div>

                                </Box>

                                <Box sx={{margin: '20px 0'}}>
                                    <div className="prod-det-rating">
                                        <Rating rating={product.rating} 
                                            numReviews={product.numReviews}> 
                                        </Rating>

                                        {product.countInStock > 0 ? 
                                            (
                                                <span className="stock-in">In Stock</span>
                                            ) :
                                            (
                                                <span className="stock-out">Sold Out</span>
                                            )
                                        }
                                    </div>
                                </Box>

                                <Box>
                                    {product.countInStock > 0 && (
                                        <div>
                                            <button 
                                                onClick={addToCartHandler} 
                                                className="prod-det-button"
                                            >
                                            <i className="fas fa-cart-plus" />  
                                            Add to Cart
                                            </button>
                                        </div>
                                    )}
                                </Box>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default ProductScreen;