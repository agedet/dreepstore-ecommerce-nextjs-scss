import React from 'react'

export default function ProductDetail({ product }) {
  return (
    <div className='product-det-card'>
      <div className='product-det-img-component'>
        <img 
          src={product.image}
          alt={product.name}
        />
      </div>
    </div>
  )
}
