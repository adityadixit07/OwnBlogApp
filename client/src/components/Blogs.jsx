import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const Blogs = () => {
  const [Blogs,setBlogs]=useState();
  const sendRequest=async ()=>{
    const res=axios.get("http://localhost:5000/api/blog").catch((err)=>console.log(err))
    const data=await res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then(data=>console.log(data))
  },[])
  return (
    <div>
    {
      Blogs && Blogs.map((blog,index)=>{
       <Blog id={blog._id}
        isUser={localStorage.getItem("userId")===blog.user._id}
        title={blog.title}
        description={blog.description}
        imageURL={blog.image}
        userName={blog.user.name}
        />
      })
    }
    </div>
  )
}

export default Blogs;