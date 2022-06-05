import React, { useEffect, useState } from 'react'
import { activities } from '../../constants/activities'
const key = 'm1pytQA1POTIbVbPase7sX2vmeXhrn3c0fJXN28J'


export default function ParksMap() {

    let [items, setItems] = useState([])
    let [loaded, setLoaded] = useState(false)
    let [active, setActive] = useState('')

    async function activity() {
        fetch(
            `https://developer.nps.gov/api/v1/parks?api_key=${key}&id=${active}`)
                .then((res) => res.json())
            .then((json) => {
                setItems(json)
                setLoaded(true)
            })
    }

    return (
        <div>
            <select onChange={e => setActive(e.target.value)} value={active}>
                {activities.map((values, index) => {
                    return (
                        <option value={values.id} onSelect>
                            {values.name}
                        </option>
                    )
                })}
                <option value=''>
Choose One
                </option>
            </select>
            <button onClick={async () => await activity()}>
                Select
            </button>
            {JSON.stringify(items)}
        </div>
    )
}