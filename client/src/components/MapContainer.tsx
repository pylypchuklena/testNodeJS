import * as React from 'react';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from 'react-google-maps'


export const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAfJVH6eVBDPEAdkmAZE1mUW-PfD6cygU4'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 49.436687, lng: 26.985202 }}>
    <Marker position={{ lat: 49.436687, lng: 26.985202 }} /> 
  </GoogleMap>
))
export class MapContainer extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className='google-map'>
        <MyMapComponent
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }

}
export default MapContainer;