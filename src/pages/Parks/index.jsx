import React, { useEffect, useState } from 'react'

const key = 'm1pytQA1POTIbVbPase7sX2vmeXhrn3c0fJXN28J'


export default function ParksMap() {

    let [items, setItems] = useState([])
    let [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch(
            `https://developer.nps.gov/api/v1/parks?activities=Wildlife%20Watching&api_key=${key}`)
                .then((res) => res.json())
            .then((json) => {
                setItems(json)
                setLoaded(true)
            })
    }, [])
}