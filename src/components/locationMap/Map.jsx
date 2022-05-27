import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import React from 'react';

const Map = ({product}) => {

  const [produtos, setProdutos] = useState(product);

  useEffect(() => {
    setProdutos(product)
  }, [product])

  const containerStyle = {
    width: '100%',
    height: '570px'
  };

  const center = {
  lat: produtos.latitude,
  lng: produtos.longitude
  };  

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBxcF7o95twhjLU1tPwFeyTn6OeIvh33CM"
      })
    
      return (
        <div style={{maxWidth: '1139px', width: '100%'}}>
          {isLoaded ? (
            <GoogleMap mapContainerClassName='rounded-3' mapContainerStyle={containerStyle} center={center} zoom={15}>
              <Marker position={center}/>
            </GoogleMap>
          ) : <></>}
      </div>
      )
}

export default Map;