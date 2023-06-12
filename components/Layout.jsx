import { useContext } from 'react';
import { Store } from '../utils/Store';
import Footer from './Footer';
import Header from './Header';
import { createTheme } from '@mui/material';

const Layout = ({children}) => {
    const {state, dispatch} = useContext(Store);
    const {darkMode} = state;

    const theme = createTheme ({
        palette: {
            type: darkMode ? 'darkMode' : "light",
        }
    })

    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}

export default Layout;