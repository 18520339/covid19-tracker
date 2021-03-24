import React from 'react';
import numeral from 'numeral';
import './Table.css';

export default function Table({ countries }) {
    return (
        <table>
            <tbody>
                {[...countries]
                    .sort((a, b) => b.cases - a.cases)
                    .map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong>
                                    {numeral(cases).format('000,000')}
                                </strong>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
