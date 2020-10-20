import React, { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon';

import '../styles/pages/task.css';
import api from "../services/api";

interface Task {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface TaskParams {
  id: string;
}


export default function Task() {
  const params = useParams<TaskParams>();
  const [task, setTask] = useState<Task>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);  
    useEffect(() => {
      api.get(`tasks/${params.id}`).then(response => {
        setTask(response.data);
      });
    }, [params.id]);

    if (!task) {
      return <p>Carregando...</p>
    }

  return (
    <div id="page-task">
      <Sidebar />

      <main>
        <div className="task-details">
          <img src={task.images[activeImageIndex].url} alt={task.name} />

          <div className="images">
            {task.images.map((image, index) => {
              return (
                <button 
                key={image.id}
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index)
                }}>
                  <img src={image.url} alt={task.name} />
                </button>
            
              )
            })}
          </div>
          
          <div className="task-details-content">
            <h1>{task.name}</h1>
            <p>{task.about}</p>

            <div className="map-container">
              <Map 
                center={[task.latitude,task.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[task.latitude,task.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}`}> Ver rotas no Google Maps </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções à visita</h2>
            <p>{task.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {task.opening_hours}
              </div>
              { task.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="open-on-weekends dont-open">
                <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
              </div>
              ) }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}