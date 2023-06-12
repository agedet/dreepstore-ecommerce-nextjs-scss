// import Link from 'next/link';
import NextLink from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { makeStyles } from '@mui/styles';
import { 
    AppBar, Avatar, Badge, Box, 
    Container, IconButton, Menu, 
    MenuItem, MenuList, Switch, Toolbar, 
    Tooltip, Typography, createTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import Link from 'next/link';



const Header = () => {
    const { status, data: session } = useSession();

    // Cart add item
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount ] = useState(0);
    const [activeLink, setActiveLink] = useState(1);
    const [scrolled, setScrolled] = useState(false);

    // const [clicked, setClicked] = useState(false);

    // const handleClick = () => {
    //     setClicked(!clicked);
    // }

    // const closeMobileClicked = () => setClicked(false);

    const handleActiveLink = (value) => {
        setActiveLink(value);
    }

    //mui
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const settings = [
        {title: 'Profile', path: '/profile', },
        {title: 'Dashboard', path: '/admin/dashboard', },
        {title: 'Order History', path: '/orders-history', },
    ];
    const MenuItems = [
        {title: 'Home', path: '/', },
        {title: 'About', path: '/about', },
        {title: 'Shipping', path: '/shipping', },
        {title: 'Contact', path: '/contact-us', },
        {title: 'Login', path: '/login', },
        {title: 'Sign Up', path: '/signup', }
    ];

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };   

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);

      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);
    
    //Logout
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    }

    const useStyles = makeStyles (() => ({
    }))

    const classes = useStyles();

    // const theme = createTheme({
    //     palette: {
    //         type: darkMode ? 'dark' : 'light',
    //     }
    // })

  return (
    // <div className={classes.container}>
        <AppBar 
            position='fixed' 
            width="100%" 
            className={scrolled ? `${'scrolled'}` : `${'not-scrolled'}`}
        >
            <Container>
                <Toolbar 
                    disableGutters 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        height: '74px',
                        background: 'none',
                        backgroundColor: 'none'
                    }}
                >
                    <Box 
                        sx={{
                            display: {
                                xs:'none', 
                                md:"flex"
                            }
                        }}
                    >
                        <li  
                            style={{
                                fontWeight :'500'
                            }}
                            onClick={() => handleActiveLink(1)}
                        >
                            <NextLink href='/' 
                            // className={classes.navbarLink}
                            >
                                <a className={activeLink === 1 ?  `${'navbar-link'} ${'activeLink'}` : `${'navbar-link'}`}>Home</a>
                            </NextLink>
                        </li>
                        <li sx={{ fontWeight :'500'}}
                            onClick={() => handleActiveLink(2)}
                        >
                            <NextLink href='/about' 
                            // sx={{color: '#fff', marginLeft: '30px'}}
                            // className={classes.navbarLink} 
                            >
                                <a 
                                    className={activeLink === 2 ?  `${'navbar-link'} ${'activeLink'}` : `${'navbar-link'}`}
                                    // className={classes.navbarLink}
                                >About</a>
                            </NextLink>
                        </li>
                        <li onClick={() => handleActiveLink(3)}>
                            <NextLink href='/shipping'>
                                <a  className={activeLink === 3 ?  `${'navbar-link'} ${'activeLink'}` : `${'navbar-link'}`}>
                                    Shipping
                                </a>
                            </NextLink>
                        </li>
                        <li  style={{listStyle: "none"}} onClick={() => handleActiveLink(4)}>
                            <NextLink href='/contact-us' 
                                // sx={{marginLeft: '30px'}}
                                >
                                <a className={activeLink === 4 ?  `${'navbar-link'} ${'activeLink'}` : `${'navbar-link'}`}>Contact us</a>
                            </NextLink>
                        </li>
                    </Box>
                    <Box>
                        <Typography 
                            variant='h3' 
                            component='a' 
                            href='/'
                            sx={{
                                fontFamily: 'Cinzel !important',
                                fontSize: '24px', 
                                lineHeight: '28px',
                                color: '#000000', 
                                fontWeight: '700', 
                                letterSpacing: '1px'
                            }}
                        >
                            DreepStore
                        </Typography>
                    </Box>

                    {/* Links */}
                    <Box 
                        sx={{display: 'flex', alignItems: 'center'}}
                    >
                        <Box 
                            sx={{
                                display: "flex", 
                                justifyContent: 'end', 
                                alignItems: 'center'
                            }}
                        >
                            <li>
                                {/* <Switch
                                    checked={darkMode}
                                    onChange={darkModeChangeHandler}
                                >
                                </Switch> */}
                            </li>

                            <li>
                                <NextLink href='/cart' passHref>
                                    <Link>
                                    {cart.cartItems > 0 ?
                                        <Badge
                                            badgeContent={cart.cartitems.length}
                                            color='secondary'
                                            // invisible={cartItemsCount === 0}
                                            sx={{
                                                "& .MuiBadge-badge": {
                                                    right: 5,
                                                    top: 5,
                                                    padding: '0 4px',
                                                    height: '14px',
                                                    minWidth: '13px',
                                                    color: 'red !important'
                                                }
                                            }}
                                        >
                                            <IconButton
                                                sx={{color: 'black'}}
                                            >
                                                <ShoppingBagOutlined sx={{fontSize: '25px'}} />
                                            </IconButton>
                                        </Badge>
                                        : 
                                        <IconButton
                                            sx={{color: 'black'}}
                                        >
                                            <ShoppingBagOutlined sx={{fontSize: '25px'}} />
                                        </IconButton>
                                    }
                                    </Link>
                                </NextLink>
                            </li>
                            {/* <li>
                                <NextLink href='/cart'>
                                    <a>
                                        <i className='fas fa-cart-plus' 
                                            style={{
                                                fontSize: '20px', 
                                                color: '#000000'
                                            }} 
                                        />
                                        {cartItemsCount > 0 && (
                                            <span className='cart-span-add'>
                                                {cartItemsCount} 
                                            </span>
                                        )}
                                    </a>
                                </NextLink>
                            </li> */}

                            {/* User Menu */}
                            {status === 'loading' ? ('Loading') : session?.user ? (
                            <>
                                <li sx= {{ display: {xs: 'none', md: 'none'}}}>
                                    <Tooltip title="Open Settings">
                                        <IconButton 
                                            onClick={handleOpenUserMenu} 
                                            sx={{
                                                display: {xs: 'none', md: 'none'},  
                                                p: 0 
                                            }}
                                        >
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                            {session.user.name}
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li style={{listStyle: "none"}}>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                    <MenuList>
                                            {settings.map((menuItem) => (
                                                <MenuItem key={menuItem} onClick={handleCloseUserMenu} 
                                                sx={{
                                                    color: '#000000 !important',
                                                    display:'block', 
                                                    fontWeight: '500', 
                                                    padding: '20px 40px'
                                                }} 
                                                textAlign="center">
                                                    <Link href={menuItem.path}>
                                                        <a sx={{
                                                            color: '#000000 !important',
                                                            display:'block', 
                                                            fontWeight: '400', 
                                                            padding: '20px 40px'
                                                        }} 
                                                        textAlign="center"
                                                        >
                                                            {menuItem.title}
                                                        </a>
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                            <MenuItem
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #cd6f8e',
                                                    padding: '10px 30px',
                                                    borderRadius: '5px',
                                                    color: '#fff',
                                                    margin: '0 10px',
                                                }}
                                            >
                                                <Link href='/#'>
                                                    <a style={{color: '#000000', }}>Logout</a>
                                                </Link>
                                            </MenuItem>
                                    </MenuList>
                                    </Menu>
                                </li>
                                </>
                            )
                            : 
                            (
                                <Box 
                                    sx={{
                                        display: {
                                            xs: 'none', 
                                            md: 'flex'
                                        },
                                        alignItems: 'center',
                                    }}
                                >
                                    <li 
                                        style={{
                                            margin: '0 10px',
                                        }}
                                    >
                                        <NextLink href='/signin'>
                                            <a 
                                                style={{
                                                    color: '#000000',
                                                    fontFamily: 'Cinzel',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    letterSpacing: '0.85px',
                                                    padding: '10px 30px', 
                                                    background: 'transparent',
                                                    border: '1px solid #927780', borderRadius: '2px',
                                                }}
                                            >
                                                Login
                                            </a>
                                        </NextLink>
                                    </li>
                                    <li 
                                        style={{
            
                                        }}
                                    >
                                        <NextLink href='/signup'>
                                            <a 
                                                style={{
                                                    color: '#ffffff', 
                                                    background: '#927780',
                                                    padding: '10px 30px',
                                                    // borderRadius: '2px',
                                                    fontFamily: 'Cinzel',
                                                    fontWeight: '600',
                                                    fontSize: '12px',
                                                    letterSpacing: '0.85px'
                                                }}
                                            >
                                                Sign Up
                                            </a>
                                        </NextLink>
                                    </li>
                                </Box>
                            )}
                        </Box>

                            {/* Nav MENU */}
                        <Box 
                            sx={{
                                display: {
                                    xs:'block', 
                                    md:"none"
                                },
                                // background: '#000000',
                                paddingLeft: '0',
                                paddingRight: '0'

                            }}
                        >
                            {/* nav menu button */}
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                sx={{
                                    display: {
                                        xs: 'block', 
                                        md: 'none'
                                    } 
                                }}
                            >
                                <MenuIcon 
                                    sx={{
                                        fontSize: '40px', 
                                        color: '#000000',
                                        paddingRight: '0',
                                        marginRight: '0',
                                    }} 
                                />
                            </IconButton>
                        </Box>

                            {/* NAV MENU */}
                        <Box>
                            <Menu
                                sx={{
                                    display: {
                                        xs: 'block', 
                                        md: 'none'
                                    },
                                    minHeight: '100vh',
                                    width: '100% !important',
                                    // minWidth: '50% !important',
                                    // maxWidth: '50% !important',
                                    overflow: 'hidden !important',
                                    // background: '#000000',
                                    mx: '0',
                                    my: '0',
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                <MenuList
                                    sx={{
                                        display: {
                                            xs: 'block', 
                                            md: 'block'
                                        },
                                        height: 'auto',
                                        width: '100% !important',
                                        minWidth: '100% !important',
                                        maxWidth: '100% !important',
                                        overflow: 'hidden !mportant',
                                        background: '#F2F2F2',
                                        mx: '0',
                                        my: '0',
                                    }}
                                >
                                    {/* <MenuItem onClick={handleCloseNavMenu}>
                                        <NextLink href='/setting' 
                                            sx={{
                                                color: '#fff',
                                                display:'block', fontWeight: '500', 
                                            }} 
                                            textAlign="center"
                                        >Seting
                                        </NextLink>
                                    </MenuItem> */}
                                    
                                
                                    {MenuItems.map((menuItem) => (
                                            <MenuItem key={menuItem} onClick={handleCloseNavMenu} sx={{
                                                color: '#000000 !important',
                                                display:'block', 
                                                fontWeight: '500', 
                                                padding: '20px 40px'
                                            }} 
                                            textAlign="center"
                                        >
                                            <Link href={menuItem.path}
                                                sx={{
                                                    color: '#000000 !important',
                                                    display:'block', 
                                                    fontWeight: '500', 
                                                    padding: '20px 40px'
                                                }}
                                            >
                                                <a 
                                                    sx={{
                                                        color: '#000000 !important',
                                                        display:'block', 
                                                        fontWeight: '500', 
                                                        padding: '20px 40px'
                                                    }} 
                                                textAlign="center"
                                                >
                                                    {menuItem.title}
                                                </a>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                    {/* <MenuItem onClick={handleCloseNavMenu}>
                                        <NextLink href='/setting' 
                                            sx={{
                                                color: '#fff',
                                                display:'block', fontWeight: '500', 
                                            }} 
                                            textAlign="center"
                                        >{session.user.name}
                                        </NextLink>
                                    </MenuItem> */}
                                </MenuList>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    // </div >
    // <div className='navbar'>
    //     <div className='container'>
    //         <Link href='/' className='logo'>
    //             dreepstore 
    //         </Link>

    //         <div className='menu-icon' onClick={handleClick}>
    //             <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
    //         </div>

    //         <nav className={clicked ? 'nav' : 'nav-menu active'}>
    //             <ul className='primary-nav'>
    //                 <li className='current' onClick={closeMobileClicked}>
    //                     <Link href='/' >
    //                         <a>All</a>
    //                     </Link>
    //                 </li>
    //                 <li onClick={closeMobileClicked}>
    //                     <NextLink href="/" >
    //                         <a>New Arrivals</a>
    //                     </NextLink>
    //                 </li>
    //                 <li onClick={closeMobileClicked}>
    //                     <NextLink href="/">
    //                         <a>Featured</a>
    //                     </NextLink>
    //                 </li>

    //                 <li className='search-nav'>
    //                     <input placeholder='search products here'  />
    //                     <i className='fas fa-magnifying-glass' />
    //                 </li>

    //                 <li onClick={closeMobileClicked}>
    //                     <NextLink href="/cart">
    //                        <a>  
    //                             <i className='fas fa-cart-plus' />
    //                             Cart
    //                             {/* {cart.cartItems.length > 0 && (
    //                                 <span className='cart-span-add'>
    //                                     {cart.cartItems.reduce((a, c) => a + c.quantity, 0 )}
    //                                 </span>
    //                             )} */}
    //                             {cartItemsCount > 0 && (
    //                                 <span className='cart-span-add'>
    //                                     {cartItemsCount} 
    //                                 </span>
    //                             )}
    //                         </a> 
    //                     </NextLink> 
    //                 </li>
    //                 <li>
    //                     {   status === 'loading' ? ('Loading') : session?.user ? (
    //                             <Menu as='div' className='relative inline-block'>
    //                                 <Menu.Button className="text-blue">
    //                                   {/* <i className='fas fa-user' />   */}
    //                                   {session.user.name} <i className='fas fa-caret-down' />
    //                                 </Menu.Button>
    //                                 <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
    //                                     <Menu.Item>
    //                                         <DropdownLink className="dropdown-link" href="/profile">
    //                                             Profile
    //                                         </DropdownLink>
    //                                     </Menu.Item>
    //                                     <Menu.Item>
    //                                         <DropdownLink className="dropdown-link" href="/order-history">
    //                                             Order History
    //                                         </DropdownLink>
    //                                     </Menu.Item>
    //                                     <Menu.Item>
    //                                         <a className="dropdown-link" href="/#" onClick={logoutClickHandler}>
    //                                             Logout
    //                                         </a>
    //                                     </Menu.Item>

    //                                 </Menu.Items>
    //                             </Menu>
    //                         ) : (
    //                             <Link href="/signin"><a>Login</a></Link>
    //                         )
    //                     }
    //                 </li>
    //             </ul>
    //         </nav>
    //     </div>
    // </div>
  )
}

export default Header;
