import { useEffect, useState } from "react"

type ICoordinate = {
  lat: number | string
  lng: number | string
}

const useCoordinate = () => {
  const [coord, setCoord] = useState<ICoordinate>({ lat: "", lng: "" })
  useEffect(() => {

    window.navigator.geolocation.getCurrentPosition((position) => {
      setCoord({
        lat: position.coords.latitude.toString(),
        lng: position.coords.longitude.toString()
      })
    })

  }, [])
  return {lat: coord.lat, lng: coord.lng}
}

export default useCoordinate
