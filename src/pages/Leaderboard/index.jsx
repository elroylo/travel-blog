import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function LeaderboardPage() {

    let [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        fetch(`https://travel-blog.epiccodewizard2.repl.co/leaderboard`)
            .then(res => res.json())
            .then(json => setLeaderboard(json))
    }, [])

    return (
        <div className='m-4'>
            {leaderboard.map((values, index) => {
                return (
                    <Link to={`/users/${values.uid}`} key={`leader_user-${index}`}>
                        <div className='border border-gray-500 hover:bg-gray-100 hover:border-2 hover:border-black p-2 rounded-md  shadow-md'>
                            <p className='font-bold text-xl'>
                                ({index + 1}) User {values.uid}:
                            </p>
                            <p className='font-medium text-lg'>
                                {parseFloat(values.distance).toFixed(2)} miles
                            </p>
                        </div>
                    </Link>
                )
            })}
        </div>

    )
}