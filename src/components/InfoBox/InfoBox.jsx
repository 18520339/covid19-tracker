import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import numeral from 'numeral';
import './InfoBox.css';

export default function InfoBox({
    active,
    isRed,
    title,
    cases,
    total,
    onClick,
}) {
    const prettyPrintStat = number => {
        return number ? `+${numeral(number).format('0.0a')}` : '+0';
    };

    return (
        <Card
            className={`
                info-box 
                ${active && 'info-box--active'} 
                ${isRed && 'info-box--red'}
            `}
            onClick={onClick}
        >
            <CardContent>
                <Typography className='info-box__title' color='textSecondary'>
                    {title}
                </Typography>
                <h2
                    className={`info-box__cases ${!isRed && 'info-box--green'}`}
                >
                    {prettyPrintStat(cases)}
                </h2>
                <Typography className='info-box__total' color='textSecondary'>
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    );
}
