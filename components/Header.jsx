import Link from 'next/link';
import NextLink from 'next/link'
import React, { useContext, useState } from 'react'
import { Store } from '../utils/Store';

const Header = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const closeMobileClicked = () => setClicked(false);

    // Cart add item
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart,
    } = state;

  return (
    <div className='navbar'>
        <div className='container'>
            <Link href='/' className='logo'>
                dreepstore 
            </Link>

            <div className='menu-icon' onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
            </div>

            <nav className={clicked ? 'nav' : 'nav-menu active'}>
                <ul className='primary-nav'>
                    <li className='current' onClick={closeMobileClicked}>
                        <Link href='/' >
                            <a>All</a>
                        </Link>
                    </li>
                    <li onClick={closeMobileClicked}>
                        <NextLink href="/" >
                            <a>New Arrivals</a>
                        </NextLink>
                    </li>
                    <li onClick={closeMobileClicked}>
                        <NextLink href="/">
                            <a>Featured</a>
                        </NextLink>
                    </li>

                    <li className='search-nav'>
                        <input placeholder='search products here'  />
                        <i className='fas fa-magnifying-glass' />
                    </li>

                    <li onClick={closeMobileClicked}>
                        <NextLink href="/cart">
                           <a>  
                                <i className='fas fa-cart-shopping-fast' />
                                <i className='fas fa-bag-shopping' />
                                <i className='fas fa-cart-plus' />
                                Cart
                                {cart.cartItems.length > 0 && (
                                    <span className='cart-span-add'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0 )}
                                    </span>
                                )}
                            </a> 
                        </NextLink> 
                    </li>
                    <li>
                        <a>
                            <i className='fas fa-user' /> 
                            User  
                            <i className='fas fa-circle-caret-down' />
                        </a>
                        {/* ADMIN */}
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Header;
