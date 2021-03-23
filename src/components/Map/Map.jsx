import React from 'react';
import { Circle, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import numeral from 'numeral';
import './Map.css';

const typeColors = {
    cases: { hex: '#cc1034', mulitiplier: 800 },
    recovered: { hex: '#7dd71d', mulitiplier: 1200 },
    deaths: { hex: '#c0c0c0', mulitiplier: 2000 },
};

export default function Map({ center, zoom, countries, type = 'cases' }) {
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
                const {
                    country,
                    countryInfo: { lat, long, flag },
                    cases,
                    recovered,
                    deaths,
                } = countryDetails;

                return (
                    <Circle
                        key={country}
                        center={[lat, long]}
                        pathOptions={{
                            fillColor: typeColors[type].hex,
                            color: typeColors[type].hex,
                        }}
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(countryDetails[type] / 10) *
                            typeColors[type].mulitiplier
                        }
                    >
                        <Popup>
                            <div className='info-container'>
                                <div
                                    className='info-flag'
                                    style={{ backgroundImage: `url(${flag})` }}
                                />
                                <div className='info-name'>{country}</div>
                                <div className='info-confirmed'>
                                    Cases: {numeral(cases).format('0,0')}
                                </div>
                                <div className='info-recovered'>
                                    Recovered:{' '}
                                    {numeral(recovered).format('0,0')}
                                </div>
                                <div className='info-deaths'>
                                    Deaths: {numeral(deaths).format('0,0')}
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                );
            })}
        </MapContainer>
    );
}
