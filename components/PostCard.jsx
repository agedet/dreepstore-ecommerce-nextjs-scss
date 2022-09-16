import Image from 'next/image'
import Link from 'next/link';
import moment from 'moment'

export default function PostCard({post, category}) {
  return (
    <div className='post-card'>
        <div className='img-component'>
            <img
                src={post.featuredImage}
                alt={post.title}
                // height={640}
                // width={640}
            />
        </div>
        <div className='text-content'>
            <p className='post-cat'>
                {post.category}
            </p>
            <h3 className='post-title'>
                <Link href={`/post/${post.slug}`}>
                    <a>
                        {post.title}  
                    </a>
                </Link>
            </h3>
            <div className='post-author'>
                {/* <Image
                    src={post.author.photo}
                    alt={post.author.name}
                    height='30px'
                    width='30px'
                ></Image> */}
                <p>
                    {/* {post.author.name} */}
                </p>
            </div>
            <div className='post-time'>
                <span>
                    {moment(post.createdAt).format('MMM DD, YYYY')}
                </span>
            </div>
            <p className='post-excerpt'>
                {post.excerpt}
            </p>
            
            <Link href={`/post/${post.slug}`}>
                <span className='cont-btn'>
                    Continue Reading...
                </span>
            </Link>
        </div>
    </div>
  )
}
