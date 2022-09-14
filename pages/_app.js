import Layout from "../components/Layout";
import '../styles/styles.css';
import '../styles/footer.css';
import '../styles/productdetail.css';
import '../styles/shopping.css';
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    )
}

export default MyApp;