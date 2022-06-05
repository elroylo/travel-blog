import React, { useEffect, useState } from 'react';
import PostComponent from '../../components/Post';
import { comments } from '../../constants/comments';

function BlogPage() {
    let [blog, setBlogs] = useState([])
    async function getBlogs() {
      fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(resp => setBlogs(resp.posts))
    }

    useEffect(() => {
      getBlogs()
    }, [])

    return (
      <div className='m-4 space-y-3'>
        {blog.map((values, index) => {
          return (
            <PostComponent
              body={values.body}
              pid={values.id}
              uid={values.userId}
              title={values.title}
              key={`post-${index}`}
              comments={comments}
            />
          )
        })}
      </div>
    )
}

export default BlogPage