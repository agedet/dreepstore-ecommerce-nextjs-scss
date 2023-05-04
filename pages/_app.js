import Layout from "../components/Layout";
import '../styles/styles.css';
import '../styles/footer.css';
import '../styles/productdetail.css';
import '../styles/cart.css';
import '../styles/blog.css';
import { StoreProvider } from "../utils/Store";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {ThemeProvider, createTheme} from '@mui/material/styles'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const theme = createTheme(({
        spacing: 10,
        palette: {
            primary: {
                main: '#f2f2f2'
            }
        }
    }))
    
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <PayPalScriptProvider deferLoading={true}>
                    <ThemeProvider theme={theme}>
                        {Component.auth ? (
                            <Auth adminOnly={Component.auth.adminOnly}>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </Auth>
                        )
                        : (
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        )}
                    </ThemeProvider>
                </PayPalScriptProvider>
            </StoreProvider>
        </SessionProvider>
    )
}

function Auth({ children, adminOnly }) {
    const router = useRouter();
    const { status, data: session } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/unauthorized?message=login required');
      },
    });
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    if (adminOnly && !session.user.isAdmin) {
      router.push('/unauthorized?message=admin login required');
    }
    return children;
}

export default MyApp;