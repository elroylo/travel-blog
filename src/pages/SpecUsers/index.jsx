import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SpecificUsersPage() {

    let { uid } = useParams()
    let [user, setUser] = useState({
        uid: '',
        distance: '',
        runs: [{
            distance: '',
            start_loc: '',
            end_loc: ''
        }]
    })

    useEffect(() => {
        fetch(`https://travel-blog.epiccodewizard2.repl.co/users/get/${uid}`, {

        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    return (
        <div>
            <div>
                <h1 className='p-3 space-x-4'>

                    <span className='font-bold text-xl'>
                        {user.uid}:
                    </span>
                    <span className='font-medium text-xl'>
                        {user.distance} miles
                    </span>
                </h1>
            </div>
            <div className='p-3 space-y-3'>
                {user.runs.map((v, i) => (
                    <div key={i}>
A {v.distance} mile travel from {v.start_loc} to {v.end_loc}
                    </div>
                ))}
            </div>
        </div>
    )
}