import Link from 'next/link';
import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';
import postsData from '../../utils/PostData';


export default function Post() {
  const { query } = useRouter();
  const { slug } = query;
  const post = postsData.posts.find((x) => x.slug === slug);
  if (!post) {
    return <div>Post Not Found</div>
  }

  return (
    <section>
      <div className='container'>
        <p className="post-link">
          <Link href='/blog'>
            <a >
              <i className="fas fa-arrow-left"/>  back to blog   
            </a>
          </Link>
        </p>

        <div>
            <PostDetail post={post} />  
        </div>
      </div>
    </section>
  )
}
