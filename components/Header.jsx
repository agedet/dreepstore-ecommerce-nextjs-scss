import Link from 'next/link';
import NextLink from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';

const Header = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const closeMobileClicked = () => setClicked(false);

    // Cart add item
    const { status, data: session } = useSession();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount ] = useState(0);
    useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);
    
    //Logout
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    }

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
                                <i className='fas fa-cart-plus' />
                                Cart
                                {/* {cart.cartItems.length > 0 && (
                                    <span className='cart-span-add'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0 )}
                                    </span>
                                )} */}
                                {cartItemsCount > 0 && (
                                    <span className='cart-span-add'>
                                        {cartItemsCount} 
                                    </span>
                                )}
                            </a> 
                        </NextLink> 
                    </li>
                    <li>
                        {   status === 'loading' ? ('Loading') : session?.user ? (
                                <Menu as='div' className='relative inline-block'>
                                    <Menu.Button className="text-blue">
                                      {/* <i className='fas fa-user' />   */}
                                      {session.user.name} <i className='fas fa-caret-down' />
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link" href="/profile">
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link" href="/order-history">
                                                Order History
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a className="dropdown-link" href="/#" onClick={logoutClickHandler}>
                                                Logout
                                            </a>
                                        </Menu.Item>

                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href="/signin"><a>Login</a></Link>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Header;
