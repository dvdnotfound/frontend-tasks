import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/task-marker.svg';

import '../styles/pages/tasks-map.css';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


function OrphanagesMap() {
  const [tasks, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
      api.get('tasks').then(response => {
        setOrphanages(response.data);
      });
    }, []);
    return (
        <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha as tasks no mapa</h2>
          <p>Faça a diferença para quem está perto de você! :)</p>
        </header>

        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map
        center={[-12.9913412,-38.5165131]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
         url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />
        {tasks.map(task => {
          return (
            <Marker 
          icon={mapIcon}
         position={[task.latitude,task.longitude]}
         key={task.id}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
          {task.name}
          <Link to={`/tasks/${task.id}`}>
            <FiArrowRight size={20} color="#FFF"/>
          </Link>
          </Popup>
        </Marker>
          )
        })}

      </Map>

      <Link to="/tasks/create" className="create-task">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
    );
}

export default OrphanagesMap;