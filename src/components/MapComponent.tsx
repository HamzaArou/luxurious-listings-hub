import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Project {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  projects: Project[];
}

// Center of Makkah
const center: [number, number] = [21.3891, 39.8579];

const MapComponent = ({ projects }: MapComponentProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // This ensures the map is properly initialized after mounting
    if (mapRef.current) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, []);

  return (
    <MapContainer 
      ref={mapRef}
      center={center} 
      zoom={12} 
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project) => 
        project.lat && project.lng ? (
          <Marker
            key={project.id}
            position={[Number(project.lat), Number(project.lng)]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{project.name}</h3>
                <p>{project.location}</p>
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapComponent;