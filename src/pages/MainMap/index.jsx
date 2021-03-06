import {IconButton, Input, SkeletonText, Text, Box, Button, ButtonGroup, Flex, HStack} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useMoralis } from 'react-moralis'
import { Autocomplete, DirectionsRenderer, useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48, lng: 2}
const key = "AIzaSyAbY81ItqkCPcfaoSAmzFG8I2ZFWjE5J9s"
function MainMapPage() {
  const { user } = useMoralis()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [matrix, setMatrix] = useState({
    duration: 0,
distance: 0
  })
  let [locations, setLocation] = useState({
    unit: 'u',
    distance: '',
    uid: '',
    start_loc: '',
    end_loc: ''
  })
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  function endTravel() {
    let origin = originRef.current.value
    let destination = destiantionRef.current.value
    let { duration, distance } = matrix
    let uid = user.get('ethAddress')
    let body = JSON.stringify({
      unit: 'u',
      distance: distance,
      uid,
      start_loc: origin,
      end_loc: destination
    })
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`https://travel-blog.epiccodewizard2.repl.co/users/log`, {
      body,
      method: "POST",
      headers
    })
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
      travelMode: google.maps.TravelMode.WALKING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setMatrix({
      duration: results.routes[0].legs[0].duration.value,
      distance: results.routes[0].legs[0].distance.value
    })
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }


  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button><Button colorScheme='blue' type='submit' onClick={endTravel}>
              End Travel
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default MainMapPage