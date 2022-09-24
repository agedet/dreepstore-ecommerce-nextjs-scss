import { ProductDetail } from "../../components";
import {useRouter } from 'next/router';
import Rating from "../../utils/Rating";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { Store } from "../../utils/data.js";
import Link from "next/link";

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

    return (
        <section title={product.name}>
            <div className="container">
                <p className="prod-link">
                    <Link href='/'>
                        <a >
                           <i className="fas fa-arrow-left"/>  back to products   
                        </a>
                    </Link>
                </p>
                <div>
                    <h3>Product Info</h3>
                    <ProductDetail product={product} />  
                </div>

                {/* Product Details */}
                <div>
                    <div>
                        <h3>{product.name}</h3>
                        <div className="color">
                            <p>
                                COLOR: {product.color}
                            </p>
                            <i className="color-tic" /> circle
                        </div>
                        <div className="size">
                            <p>SIZE</p>
                            <div>
                                <p>38</p>
                                <p>39</p>
                                <p>40</p>
                                <p>41</p>
                                <p>42</p>
                                <p>44</p>
                                <p>45</p>
                            </div>
                        </div>
                        <p className="prod-desc">
                            Description: 
                            
                            {product.description}
                            
                            Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made! All proceeds will be donated to charity.
                        </p>

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
                        <p className="price">Price: ₦{product.price}</p>
                    </div>
                </div>

                <div>
                    {product.countInStock > 0 && (
                        <div>
                            <button onClick={addToCartHandler} className="prod-det-button">
                              <i className="fas fa-cart-plus" />  Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProductScreen;