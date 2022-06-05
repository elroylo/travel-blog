import React, { useEffect, useState } from 'react';
import PostComponent from '../../components/Post';

function BlogPage() {
    let [blog, setBlogs] = useState([])
    async function getBlogs() {
      fetch('https://travel-blog.epiccodewizard2.repl.co/blogs/all')
        .then(res => res.json())
        .then(resp => setBlogs(resp))
    }

    useEffect(() => {
      getBlogs()
    }, [])

    return (
      <div className='m-4 space-y-3'>
        
        {blog.map((values, index) => {
          return (
            <PostComponent
              body={values.content}
              pid={values.bid}
              uid={values.uid}
              title={values.title}
              key={`post-${index}`}
            />
          )
        })}
      </div>
    )
}

export default BlogPage