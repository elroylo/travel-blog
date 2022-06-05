import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'

function SpecificBlogPage() {

  let [blogs, setBlog] = useState({
    cover: '',
    content: '',
    title: '',
    uid: '',
    bid: ''
  })
  let { bid } = useParams()

  useEffect(() => {
    fetch(`/blog?id=${bid}`)
      .then(res => res.json())
      .then(blog => setBlog(blog))
  }, [])

  return (
    <div key={bid}>
     <img
                    src={blogs.cover}
                    className='w-3/5 justify-center items-center m-auto mt-4 rounded-lg'
                />
                <div className='p-2 m-auto justify-center items-center text-center'>
                    <div className='text-4xl font-bold'>
                        {blogs.title}
                    </div>
                    <div className='text-2xl font-medium'>
                        by {blogs.uid}
                    </div>
                </div>
                <div>
                    {blogs.content}
                </div>
    </div>
  )
}

export default SpecificBlogPage