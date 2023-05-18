import moment from 'moment';
import Link from 'next/link';

export default function PostDetail ({ post }) {
  const useStyles = makeStyles ((theme) => ({
    container: {
      padding: '120px 0 60px 0',
      overflow: 'hidden',
      height: {
        md: '100vh !important',
        lg: '100vh !important'
      }
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'Center',
      // border: '1px solid ',
      padding: '40px',
      // borderRadius: '5px'
    }, 
  }));

  const classes = useStyles();

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
