import React from "react"
import { Link } from "react-router-dom"

export default function PostComponent({
    pid,
    body,
    uid,
    title,
    comments
}) {

    function rate(pid) {
        fetch(`/ratings/${pid}`, {
            method: 'POST'
        })
    }

    return (
        <div className='m-4 space-y-4 hover:bg-gray-300 p-4 text-center border border-gray-400 rounded-md'>
            <div>
                <h1 className="text-2xl font-semibold py-4">
                    {title} by {uid}
                </h1>
            </div>
            <div>
                <Link to={`/blogs/${pid}`} className='py-3 px-4 rounded-lg bg-blue-400 font-bold text-white'>
                    Go to this Blog
                </Link>
                <button className="py-2 px-5 rounded-lg bg-red-400 text-white font-bold" onClick={() => rate(pid)}>
                    Rate this post
                </button>
            </div>
        </div>
    )
}