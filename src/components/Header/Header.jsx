import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './Header.css';

export default function Header({ countries, selectedCountry, onChange }) {
    return (
        <div className='header'>
            <h1>COVID 19 TRACKER</h1>
            <FormControl className='header__dropdown'>
                <Select
                    variant='outlined'
                    value={selectedCountry}
                    onChange={onChange}
                >
                    <MenuItem value='worldwide'>Worldwide</MenuItem>
                    {countries.map(({ country, countryInfo }) => (
                        <MenuItem key={country} value={countryInfo.iso2}>
                            {country}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
