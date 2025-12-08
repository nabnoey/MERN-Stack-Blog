import React from 'react'
// import { postDetail } from '../data/postDetail'
import  { useState } from 'react'
import Post from '../components/Post.jsx'

const  Home =  () => {
  const [posts,setPosts] = useState([
{
  id:1,
  title: 'Sample Post',
 cover:"https://i.pinimg.com/736x/6d/bc/8f/6dbc8fec5ee1cfb9819d10ed09e67829.jpg",
 author:"John Doe",
 createdAt:"2024-01-01",
 sumary:"This is a sample summary of the post."
},
{
  id:2,
  title: 'Sample Post',
 cover:"https://i.pinimg.com/736x/6d/bc/8f/6dbc8fec5ee1cfb9819d10ed09e67829.jpg",
 author:"John Doe",
 createdAt:"2024-01-01",
 sumary:"This is a sample summary of the post."
},
{
  id:3,
  title: 'Sample Post',
 cover:"https://i.pinimg.com/736x/6d/bc/8f/6dbc8fec5ee1cfb9819d10ed09e67829.jpg",
 author:"John Doe",
 createdAt:"2024-01-01",
 sumary:"This is a sample summary of the post."
},



  ]) 

  return (
    <div>
    {posts.map((post,index) => (
        <Post 
          key={post.id}
          index={index}
          id={post.id} 
          title={post.title}
          cover={post.cover}
          author={post.author}
          createdAt={post.createdAt}
          sumary={post.sumary}
            postDetail={post}
           
        />
      ))}
      
 

    </div>
  )
}

export default Home