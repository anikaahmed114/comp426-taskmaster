import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const EventComponent = ({ event, onEventDelete, view }) => {
    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (window.confirm(`are you sure you want to delete this event: ${event.title}?`)) {
            onEventDelete(event);
        }
    };

    const eventContainerStyle = {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        borderRadius: '5px',
        margin: '5px',
        textAlign: 'justify',
        fontSize: view === 'day' ? '10px' : '12px',
        width: '70%', 
        boxSizing: 'border-box', 
        overflow: 'auto' 
    };

    const formatTitle = (title) => {
        if (view === 'day') {
            const parts = title.split(' - ');  
            return parts[0];  
        }
        return title;  
    };

    return (
        <div style={eventContainerStyle}>
            <span>{formatTitle(event.title)}</span>
            <BsFillTrashFill
                className='icon'
                onClick={handleDeleteClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default EventComponent;

