// import React, { useRef, useEffect } from 'react';
// import { Box } from '@mui/material';

// const Map = (props) => {
//     const mapRef = useRef();
//     const { center, zoom } = props;

//     useEffect(() => {
//         const map = new window.google.maps.Map(mapRef.current, {
//             center: center,
//             zoom: zoom,
//         });

//         new window.google.maps.Marker({ position: center, map: map });
//     }, [center, zoom]);

//     return (
//         <Box
//             ref={mapRef}
//             sx={{ ...props.style, width: '100%', height: '100%' }}
//         ></Box>
//     );
// };

// export default Map;




import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import L from 'leaflet';

// Configure the default Leaflet icon for compatibility
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = (props) => {
    const { center, zoom, style } = props;

    return (
        <Box sx={{ ...style, width: '100%', height: '100%' }}>
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center} />
            </MapContainer>
        </Box>
    );
};

export default Map;

