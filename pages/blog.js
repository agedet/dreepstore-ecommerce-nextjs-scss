import PostCard from '../components/PostCard.jsx';
// import ProductCard from '../components/ProductCard.jsx';
// import data from '../public/data.js';
import postsData from '../utils/PostData.js';


export default function blog() {
  return (
    <section>
        <div className='container'>
          <div className='blog-header'>
            <h3 className='blog-title'>Dreepstore lounge</h3>
            <i className='blog-italic'>lifestyle and more ...</i>
          </div>
          

          <div className='post-grid-container'>
            <div className='post-card-display'>  
              {postsData.posts.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}              
            </div>

            <div className='post-relevant'>
              <div>
                {/* <div className='product-card-display'>
                  {data.products.map((product) => (
                    <ProductCard product={product} key={product.slug} />  
                  ))}
                </div> */}
              </div>
            </div>
            <div>
              <h3>Featured Products</h3> 
            </div>
          </div>
        </div> 
    </section>
  )
}
