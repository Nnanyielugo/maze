import React from 'react';
import mario from '../../assets/mario.png';
import mushroom from '../../assets/mushroom.png';

const style = ({ size, cell }) => {
    const dim = size + 'px';
    let style = {
        width: dim,
        height: dim,
        backgroundSize: 'contain',
        border: '1px solid black',
        transition: 'all 0.1s ease'
    };
    if(cell.value === 'mushroom'){
        style.backgroundImage = `url(${mushroom})`;
    } 
    if(cell.value === 'mario') {
        style.backgroundImage = `url(${mario})`;        
    }

    return style;
};

export default (props) => <td style={style(props)}/>