import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { BsFillTrashFill } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const EventComponent = ({ event, onEventDelete }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
            <span>{event.title}</span>
            <BsFillTrashFill
                className='icon'
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the calendar from also selecting the event
                    if (window.confirm(`Are you sure you want to delete this event: ${event.title}?`)) {
                        onEventDelete(event);
                    }
                }}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3001/events');
            const mappedEvents = response.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            setEvents(mappedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('New Event name');
        if (title) {
            const newEvent = { title, start, end };
            axios.post('http://localhost:3001/events', newEvent)
                .then(response => {
                    setEvents([...events, { ...newEvent, id: response.data._id, start: new Date(start), end: new Date(end) }]);
                })
                .catch(error => console.error('Error adding new event:', error));
        }
    };

    const handleSelectEvent = event => {
        const newTitle = window.prompt('Edit the event title', event.title);
        if (newTitle) {
            event.title = newTitle;
            axios.put(`http://localhost:3001/events/${event.id}`, { ...event, title: newTitle })
                .then(response => {
                    fetchEvents();  // Refresh events to reflect the update
                })
                .catch(error => console.error('Error updating event:', error));
        }
    };

    const handleDeleteEvent = event => {
        if (window.confirm(`Are you sure you want to delete this event: ${event.title}?`)) {
            axios.delete(`http://localhost:3001/events/${event.id}`)
                .then(() => {
                    setEvents(events.filter(e => e.id !== event.id));
                })
                .catch(error => console.error('Error deleting event:', error));
        }
    };

    const handleViewChange = (viewType) => {
        setView(viewType);
    };

    return (
        <div style={{width: 300, height: 300, overflow: 'auto'}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '100%', height: '100%' }}
                selectable
                views={['month', 'week', 'day', 'agenda']}
                defaultView={view}
                onView={handleViewChange}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                components={{
                    event: props => <EventComponent {...props} onEventDelete={handleDeleteEvent} />
                }}
            />
        </div>
    );
};

export default MyCalendar;
