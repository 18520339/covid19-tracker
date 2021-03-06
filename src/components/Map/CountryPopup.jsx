import React from 'react';
import { Popup } from 'react-leaflet';
import numeral from 'numeral';

export default function CountryPopup({ countryDetails }) {
    const { country, countryInfo, cases, recovered, deaths } = countryDetails;
    return (
        <Popup autoPan={false}>
            <div className='popup__container'>
                <div
                    className='popup__flag'
                    style={{ backgroundImage: `url(${countryInfo.flag})` }}
                />
                <div className='popup__name'>{country}</div>
                <div className='popup__confirmed'>
                    Cases: {numeral(cases).format('0,0')}
                </div>
                <div className='popup__recovered'>
                    Recovered: {numeral(recovered).format('0,0')}
                </div>
                <div className='popup__deaths'>
                    Deaths: {numeral(deaths).format('0,0')}
                </div>
            </div>
        </Popup>
    );
}
