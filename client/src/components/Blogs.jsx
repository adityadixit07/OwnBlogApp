import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Blog = () => {
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
      <h1>This is a blog page.</h1>
    </div>
  )
}

export default Blog