import moment from 'moment';
import Link from 'next/link';

export default function PostDetail ({ post }) {
  return (
    <div className='post-det-card'>
      <div className='post-det-img-component'>
        <img 
          src={post.featuredImage}
          alt={post.title}
        />
      </div>
      <div className='post-det-text-content'>
        <p className='post-det-cat'>
                {post.category}
        </p>
        <h3 className='post-det-title'>
          <Link href={`/post/${post.slug}`}>
            <a>
              {post.title}  
            </a>
          </Link>
        </h3>
        <div className='post-det-author'>
          <img
                src={post.authorPhoto}
                alt={post.authorName}
                height='30px'
                width='30px'
          ></img>
          <p>
            {post.authorName}
          </p>
        </div>
        <div className='post-det-time'>
          <span>
            {moment(post.createdAt).format('MMM DD, YYYY')}
          </span>
        </div>
        <p className='post-det-content'>
          {post.content}
        </p>
       
      </div> 
      <div>
        <Link href='/' className='post-det-btn'>
          <a>View Products</a>
        </Link>
      </div>
    </div>
  )
}
