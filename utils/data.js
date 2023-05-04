import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'John Doe',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jane Doe',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
       {
        name: 'Nike Air Sneaker',
        slug: 'nikeair-suede-black-red',
        category: 'Sneakers',
        image: '/images/nikeairblue.jpg',
        color: 'Black',
        price: 26500,
        countInStock: 5,
        brand: 'Nike Air',
        rating: '1.5',
        numReviews: '6',
        description: 'high quality sneakers',
       },
       {
        name: 'Nike AIR Sneaker',
        slug: 'nikeair-suede-black-yellow',
        category: 'Sneakers',
        image: '/images/nikeair-purple.jpg',
        color: 'Black',
        price: 25000,
        countInStock: 0,
        brand: 'Nike Air',
        rating: '3.5',
        numReviews: '8',
        description: 'High Quality Sneakers',
       },
       {
        name: 'Diesel Sneakers',
        slug: 'diesel-white-sneakers',
        category: 'sneakers',
        image: '/images/dieselWRed.jpg',
        color: 'White',
        price: 30000,
        countInStock: 4,
        brand: 'Diesel',
        rating: '4.5',
        numReviews: '7',
        description: 'high quality sneakers',
       },
       {
        name: 'Clarks Boot',
        slug: 'clarks-boot',
        category: 'sneakers, men',
        image: '/images/clarksboot.jpg',
        color: 'black',
        price: 17000,
        countInStock: 4,
        brand: 'black',
        rating: '2.5',
        numReviews: '6',
        description: 'high quality shoes',
       },
       {
        name: 'Louis Vuitton Derby',
        slug: 'louis-black-derby',
        category: 'Shoes, men',
        image: '/images/derbyblack.jpg',
        color: 'Black',
        price: 15000,
        countInStock: 1,
        brand: 'Louis Vuitton',
        rating: '5',
        numReviews: '2',
        description: 'high quality Shoes',
       },
       {
        name: 'Brown Dresser',
        slug: 'brown-dress-shoe',
        category: 'Shoes, men',
        image: '/images/diorleather.jpg',
        color: 'Brown',
        price: 30000,
        countInStock: 4,
        brand: 'Nike Air',
        rating: '3.5',
        numReviews: '1',
        description: 'High quality Shoes',
       },
       {
        name: 'Louis Vuitton formal',
        slug: 'loius-black-formal',
        category: 'Shoes, men',
        image: '/images/dressblack.jpg',
        color: 'Black',
        price: 20000,
        countInStock: 2,
        brand: 'Louis Vuitton',
        rating: '1.5',
        numReviews: '4',
        description: 'High quality Shoes',
       },
       {
        name: 'Nike AIR Sneaker',
        slug: 'nikeair-suede-grey',
        category: 'sneakers, men',
        image: '/images/NikeAirgrey.jpg',
        color: 'Grey',
        price: 200,
        countInStock: 1,
        brand: 'Nike Air',
        rating: '1',
        numReviews: '5',
        description: 'high quality sneakers',
       },
       {
        name: 'Timberland ',
        slug: 'timberland-blue',
        category: 'sneakers, men',
        image: '/images/timberland.jpg',
        color: 'Blue',
        price: 12000,
        countInStock: 1,
        brand: 'Timberland',
        rating: '1',
        numReviews: '5',
        description: 'high quality sneakers',
       },
    ],
};

export default data;
    
