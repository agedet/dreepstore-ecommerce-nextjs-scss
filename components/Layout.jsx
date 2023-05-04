import { useContext } from 'react';
import { Store } from '../utils/Store';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => {
    const {state, dispatch} = useContext(Store);
    const {darkMode} = state;

    // const theme = CreateMyTheme ({
    //     palette: {
    //         type: darkMode ? 'darkMode' : "light",
    //     }
    // })

    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}

export default Layout;