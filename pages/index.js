import Head from 'next/head';
import { ProductCard } from '../components';
import data from '../utils/data.js';
import {ToastContainer} from 'react-toastify'


function HomePage() {

    return (
      <div>
        <Head>
            <title>
                DreepStore - ecommerce website
            </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer position="bottom-center" limit={1} />
        <section className='hero'>
            <div className='container'>
                <div className='prod-banner'>
                    <img 
                        src='/images/alirac.jpg' 
                        alt='wardrobe'
                    />
                </div>
            </div>
        </section>
        
        <section className='products'>
            <div className='container'>
                <p>Products</p>
                <div className='product-card-display'>
                    {data.products.map((product) => (
                        <ProductCard product={product} key={product.slug} />  
                    ))}
                </div>
            </div>
        </section>
    </div>  
    ) 
}

export default HomePage;