import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import hotelInfo from '../../data/hotelInfo';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hotel marker icon
const hotelIcon = new L.Icon({
  iconUrl: '/logo.webp',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'hotel-marker-icon'
});

const LocationMap = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Hotel location from static data
  const hotelLocation = {
    lat: hotelInfo.contact.location.lat,
    lng: hotelInfo.contact.location.lng,
    name: hotelInfo.name,
    address: hotelInfo.contact.address,
    phone: `${hotelInfo.contact.phone} / ${hotelInfo.contact.phoneSecondary} / ${hotelInfo.contact.phoneThird}`,
    email: hotelInfo.contact.email
  };

  useEffect(() => {
    // Simulate loading time for map initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
    borderRadius: '0.5rem',
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="h-96 bg-secondary-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-secondary-600 font-medium">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={[hotelLocation.lat, hotelLocation.lng]}
              zoom={15}
              style={mapContainerStyle}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker 
                position={[hotelLocation.lat, hotelLocation.lng]} 
                icon={hotelIcon}
              >
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-elegant text-lg font-semibold text-secondary-900 mb-2">
                      {hotelLocation.name}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-2">
                      {hotelLocation.address}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="text-secondary-700">📞 {hotelLocation.phone}</p>
                      <p className="text-secondary-700">✉️ {hotelLocation.email}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>

        {/* Location Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Contact Card */}
          <div className="card">
            <div className="p-6">
              <h3 className="mb-4 text-secondary-900 text-xl font-semibold">
                {t('footer.contact.title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Address</p>
                    <p className="text-secondary-600 text-sm">{hotelLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Phone</p>
                    <p className="text-secondary-600 text-sm">{hotelLocation.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Email</p>
                    <p className="text-secondary-600 text-sm">{hotelLocation.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Directions Card */}
          <div className="card">
            <div className="p-6">
              <h3 className="mb-4 text-secondary-900 text-xl font-semibold">
                Getting Here
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚗</span>
                  <div>
                    <p className="font-medium text-secondary-900">By Car</p>
                    <p className="text-secondary-600 text-sm">{hotelInfo.transportation.parking.type}</p>
                  </div>
                </div>


                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <p className="font-medium text-secondary-900">From Airport</p>
                    <p className="text-secondary-600 text-sm">{hotelInfo.transportation.airport.time} by {hotelInfo.transportation.airport.methods.join('/')}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 btn-primary text-sm">
                Get Directions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationMap; 