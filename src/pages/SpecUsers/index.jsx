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
                <h1>
                    {user.uid}: {user.distance}
                </h1>
            </div>
            <div>
                {user.runs.map((values, index) => {
                    <div>
A {values.distance} mile travel from {values.start_loc} to {values.end_loc}
                    </div>
                })}
            </div>
        </div>
    )
}