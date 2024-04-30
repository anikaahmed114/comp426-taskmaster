import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const EventComponent = ({ event, onEventDelete, view }) => {
    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (window.confirm(`are you sure you want to delete this event: ${event.title}?`)) {
            onEventDelete(event);
        }
    };


    return (
        <div style={{display: 'flex', alignItems: 'center', fontSize: '10px'}}>
            <span>{event.title}</span>
            <BsFillTrashFill
                className='icon'
                onClick={handleDeleteClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default EventComponent;

