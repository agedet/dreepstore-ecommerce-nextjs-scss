import { Typography } from '@mui/material';
import  Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Rating from '../utils/Rating';
import { Store } from '../utils/Store';

const ProductCard = ({ product }) => {
    // add to cart
    const { state, dispatch} = useContext(Store);

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            toast.error('Sorry, Product is out of stock');
            return;
        }

        dispatch({ 
            type: 'CART_ADD_ITEM', 
            payload: { ...product, quantity } 
        });
        toast.success('Item added to cart');
    }

    return (
        <div className="product-card">
            <div className="img-component">
                <Link href={`/product/${product.slug}`} >
                    <img 
                        src={product.image} 
                        alt={product.name}
                        width="100%"
                        height="auto"
                        object-fit="center"
                    />
                </Link>
            </div>

            <div className='text-content'>
                <Typography variant='h4' className={ `${'title'}`} >
                    <Link href={`/product/${product.slug}`} >
                        {product.name}
                    </Link>
                </Typography>
                <Typography
                    variant='body1' 
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        fontSize: '16px'
                    }}
                >
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                </Typography>
                

                <Typography variant='body1' className="price">
                    ₦{product.price}
                </Typography>

                {product.countInStock === 0 ? 
                    (<button disabled>Out of Stock</button>) :
                    (<button onClick={() => addToCartHandler(product)}>
                      <i className='fas fa-cart-plus' />  Add to Cart
                    </button>)
                }
            </div>
        </div>
    )
}

export default ProductCard;