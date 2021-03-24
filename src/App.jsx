import React, { useState, useEffect } from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    Card,
    CardContent,
} from '@material-ui/core';
import numeral from 'numeral';

import { Header, InfoBox, Map, Table, LineGraph } from './components';
import 'leaflet/dist/leaflet.css';
import './App.css';

const baseUrl = `https://disease.sh/v3/covid-19`;
export default function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [casesType, setCasesType] = useState('cases');

    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    const prettyPrintStat = number => {
        return number ? `+${numeral(number).format('0.0a')}` : '+0';
    };

    const onCountryChange = event => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);

        let endpoint;
        if (countryCode === 'worldwide') endpoint = `${baseUrl}/all`;
        else endpoint = `${baseUrl}/countries/${countryCode}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    useEffect(() => {
        fetch(`${baseUrl}/all`)
            .then(response => response.json())
            .then(data => setCountryInfo(data));
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/countries`)
            .then(response => response.json())
            .then(data => {
                setTableData([...data].sort((a, b) => b.cases - a.cases));
                setMapCountries(data);
                setCountries(
                    data.map(({ country, countryInfo }) => ({
                        name: country,
                        value: countryInfo.iso2,
                    }))
                );
            });
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
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={prettyPrintStat(countryInfo.cases)}
                        onClick={() => setCasesType('cases')}
                    />
                    <InfoBox
                        active={casesType === 'recovered'}
                        isRed={false}
                        title='Recovered'
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={prettyPrintStat(countryInfo.recovered)}
                        onClick={() => setCasesType('recovered')}
                    />
                    <InfoBox
                        active={casesType === 'deaths'}
                        isRed={true}
                        title='Deaths'
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={prettyPrintStat(countryInfo.deaths)}
                        onClick={() => setCasesType('deaths')}
                    />
                </div>
                <Map
                    type={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                    countries={mapCountries}
                />
            </div>
            <Card className='app__right'>
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <h3 className='app__graph-title'>
                        Worldwide new {casesType}
                    </h3>
                    <LineGraph type={casesType} />
                </CardContent>
            </Card>
        </div>
    );
}
