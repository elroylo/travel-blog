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
        <div>
            {leaderboard.map((values, index) => {
                return (
                    <Link className='p-2 rounded-md  shadow-md' to={`/users/${values.uid}`}>
                        <div>
                            <p>
                                {values.uid}
                            </p>:
                            <p>
                                {parseFloat(values.distance).toFixed(2)}
                            </p>
                        </div>
                    </Link>
                )
            })}
        </div>

    )
}