import React from 'react';
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
                    {countries.map(({ name, value }) => (
                        <MenuItem key={name} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
