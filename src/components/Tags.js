import React from 'react';
import Chip from '@material-ui/core/Chip';


export default function Tags(props) {
    return (
        <div>
            <p>Tags:</p>
            <div>{props.tags.map((tag) => (
                <Chip key={tag} label={tag} />
            ))}</div></div>)
}