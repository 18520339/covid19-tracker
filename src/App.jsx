import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';

import { Header, InfoBox, Map, Table, LineGraph } from './components';
import 'leaflet/dist/leaflet.css';
import './App.css';

const baseUrl = `https://disease.sh/v3/covid-19`;
export default function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('worldwide');
    const [countryDetails, setCountryDetails] = useState({});
    const [casesType, setCasesType] = useState('cases');

    const [mapZoom, setMapZoom] = useState(3);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });

    const onCountryChange = event => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);

        let endpoint;
        if (countryCode === 'worldwide') endpoint = `${baseUrl}/all`;
        else endpoint = `${baseUrl}/countries/${countryCode}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setCountryDetails(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    useEffect(() => {
        fetch(`${baseUrl}/all`)
            .then(response => response.json())
            .then(data => setCountryDetails(data));
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/countries`)
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    return (
        <div className='app'>
            <div className='app__left'>
                <Header
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onChang={onCountryChange}
                />
                <div className='app__stats'>
                    <InfoBox
                        active={casesType === 'cases'}
                        isRed={true}
                        title='Coronavirus Cases'
                        cases={countryDetails.todayCases}
                        total={countryDetails.cases}
                        onClick={() => setCasesType('cases')}
                    />
                    <InfoBox
                        active={casesType === 'recovered'}
                        isRed={false}
                        title='Recovered'
                        cases={countryDetails.todayRecovered}
                        total={countryDetails.recovered}
                        onClick={() => setCasesType('recovered')}
                    />
                    <InfoBox
                        active={casesType === 'deaths'}
                        isRed={true}
                        title='Deaths'
                        cases={countryDetails.todayDeaths}
                        total={countryDetails.deaths}
                        onClick={() => setCasesType('deaths')}
                    />
                </div>
                <Map
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                    countries={countries}
                />
            </div>
            <Card className='app__right'>
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={countries} />
                    <h3 className='app__graph-title'>
                        Worldwide new {casesType}
                    </h3>
                    <LineGraph casesType={casesType} />
                </CardContent>
            </Card>
        </div>
    );
}
