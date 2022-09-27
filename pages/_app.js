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


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <PayPalScriptProvider deferLoading={true}>
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