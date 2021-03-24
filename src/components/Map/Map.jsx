import React from 'react';
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';
import CountryPopup from './CountryPopup';
import './Map.css';

const caseTypeColors = {
    cases: { hex: '#cc1034', mulitiplier: 800 },
    recovered: { hex: '#7dd71d', mulitiplier: 800 },
    deaths: { hex: '#c0c0c0', mulitiplier: 2000 },
};

export default function Map({ center, zoom, countries, casesType = 'cases' }) {
    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    };

    return (
        <MapContainer className='map'>
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {countries.map(countryDetails => {
                const { lat, long } = countryDetails.countryInfo;
                return (
                    <Circle
                        key={countryDetails.country}
                        center={[lat, long]}
                        pathOptions={{
                            fillColor: caseTypeColors[casesType].hex,
                            color: caseTypeColors[casesType].hex,
                        }}
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(countryDetails[casesType] / 10) *
                            caseTypeColors[casesType].mulitiplier
                        }
                    >
                        <CountryPopup countryDetails={countryDetails} />
                    </Circle>
                );
            })}
        </MapContainer>
    );
}
