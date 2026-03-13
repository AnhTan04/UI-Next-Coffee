import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

// Kích thước bản đồ
const mapContainerStyle = {
    height: '400px',
    width: '100%',
};

const MapComponent = ({ address, city, district, ward }) => {
    const [position, setPosition] = useState({ lat: 10.7769, lng: 106.7009 }); // Default: TP.HCM

    // Hàm gọi Google Maps Geocoding API
    const fetchCoordinates = async (fullAddress) => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        address: fullAddress,
                        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                    },
                }
            );
            const location = response.data.results[0]?.geometry.location;
            if (location) {
                setPosition({ lat: location.lat, lng: location.lng });
            } else {
                // Nếu không tìm thấy địa chỉ, giữ vị trí mặc định
                setPosition({ lat: 10.7769, lng: 106.7009 });
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            setPosition({ lat: 10.7769, lng: 106.7009 }); // Fallback khi có lỗi
        }
    };

    // Chỉ gọi API khi tất cả các trường đều được điền
    useEffect(() => {
        if (address && city && district && ward) {
            const fullAddress = `${address}, ${ward}, ${district}, ${city}, Vietnam`;
            fetchCoordinates(fullAddress);
        }
    }, [address, city, district, ward]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={13}
            >
                <Marker position={position} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
