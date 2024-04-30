import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const EventComponent = ({ event, onEventDelete }) => {
    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (window.confirm(`Are you sure you want to delete this event: ${event.title}?`)) {
            onEventDelete(event);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
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
