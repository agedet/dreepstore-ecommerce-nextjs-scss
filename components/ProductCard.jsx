import  Link from 'next/link';
import { useContext } from 'react';
import Rating from '../utils/Rating';
import { Store } from '../utils/Store';

const ProductCard = ({ product }) => {

    // add to cart
    const { state, dispatch} = useContext(Store);

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

    return (
        <div className="product-card">
            <div className="img-component">
                <Link href={`/product/${product.slug}`} >
                    <img 
                        src={product.image} 
                        alt={product.name}
                        height="640px"
                    />
                </Link>
            </div>

            <div className='text-content'>
                <p className='title'>
                    <Link href={`/product/${product.slug}`}>
                        {product.name}
                    </Link>
                </p>
                <Rating rating={product.rating} numReviews={product.numReviews} />

                <p className="price">
                    ₦{product.price}
                </p>

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