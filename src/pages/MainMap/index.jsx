import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useRef, useState, useCallback, memo } from 'react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const center = { lat: 48, lng: 2 }
// const REACT_APP_API_KEY="AIzaSyAbY81ItqkCPcfaoSAmzFG8I2ZFWjE5J9s"
function MainMapPage() {
    const { loaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY

    })

    const onLoadMap = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    })

    const onUnMountMap = useCallback(map => {
        setMap(null)
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!loaded) {
        return (
            <div>
                HELLO PEOPLE WE ARE GETTING THINGS READY
                {!loaded ? 'loading...' : 'ready but not working ?'}
            </div>
        )
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.p)
        setDuration(results.routes[0].legs[0].duration.p)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    return (

        <div
            className='flex relative flex-col align-center h-screen w-screen'
        >

            TESTING123
            <div className='absolute left-0 top-0 h-full w-full'>
                {/* Google Map div */}
                <GoogleMap
                    onLoad={onLoadMap}
                    onUnmount={onUnMountMap}
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div>
            <div
                className='p-4 rounded-lg m-4 bg-white shadow-md min-w-md z-1'>
                <div className='space-y-2 justify-between'>
                    <div className='flex'>
                        <Autocomplete>
                            <input type='p' placeholder='Origin' ref={originRef} />
                        </Autocomplete>
                    </div>
                    <div className='flex'>
                        <Autocomplete>
                            <input
                                type='p'
                                placeholder='Destination'
                                ref={destiantionRef}
                            />
                        </Autocomplete>
                    </div>

                    <div>
                        <button className='bg-pink-400' type='submit' onClick={calculateRoute}>
                            Calculate Route
                        </button>
                        <button
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </div>
                </div>
                <div className='space-y-4 mt-4 justify-between'>
                    <p>Distance: {distance} </p>
                    <p>Duration: {duration} </p>
                    <button
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}


export default memo(MainMapPage)