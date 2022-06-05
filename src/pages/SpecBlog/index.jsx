import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { comments } from '../../constants/comments'
import { useMoralis } from 'react-moralis'
import style from './SpecBlog.module.css'

export default function SpecificBlogPage() {

  let { user } = useMoralis()

  let [blogs, setBlog] = useState({
    cover: '',
    content: '',
    title: '',
    uid: '',
    bid: '',
    comments
  })
  let { bid } = useParams()
  let [cContent, setCContent] = useState('')

  function comment() {
    let uid = user.get('ethAddress')
    let body = JSON.stringify({
      bid,
      uid,
      content: cContent
    })
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`https://travel-blog.epiccodewizard2.repl.co/blogs/comments/${bid}`,{
      headers,
      body,
      method: 'POST'
    })
  }

  useEffect(() => {
    fetch(`https://travel-blog.epiccodewizard2.repl.co/blogs/get/${bid}`)
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
                    {/* <div className='text-2xl font-medium'>
                        by {blogs.uid}
                    </div> */}
                </div>

      <div className={style.comments}>
      <div dangerouslySetInnerHTML={{__html: blogs.content}} />
        <div>
          {blogs.comments.map((values, index) => {
            return (
              <div key={`comment-${index}`} className='p-3 rounded-lg shadow-md'>
                <h1>
                  By User: {values.uid}
                </h1>
                <br></br>
                <div>
                  {values.content}
                </div>
              </div>
            )
          })}
        </div>
        <div>
        <br></br>
          <input
            placeholder='Write your comment'
            value={cContent}
            onChange={e => setCContent(e.target.value)}
          />

          <button onClick={comment}>
            Submit your comment
          </button>

        </div>
      </div>
    </div>
  )
}
