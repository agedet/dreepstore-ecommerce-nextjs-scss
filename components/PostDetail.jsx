import moment from 'moment'
import Link from 'next/link'
import React from 'react'

export default function PostDetail({ post }) {
  return (
    <div className='post-det-card'>
      <div className='post-det-img-component'>
        <img 
          src={post.featuredImage}
          alt={post.title}
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
            {post.content}
          </p>
        </div>
      
    </div>
  )
}
