import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventComponent from './src/EventComponent'; 


const localizer = momentLocalizer(moment);

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
        const title = window.prompt('new Event name');
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
        const newTitle = window.prompt('edit the event title', event.title);
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
            axios.delete(`http://localhost:3001/events/${event.id}`)
                .then(() => {
                    setEvents(events.filter(e => e.id !== event.id));
                    console.log(event.id)
                })
                .catch(error => console.error('Error deleting event:', error));
        
    };

    const handleViewChange = (viewType) => {
        setView(viewType);
    };

    const handleDeleteAllEvents = () => {
        axios.delete(`http://localhost:3001/events`)
            .then(() => {
                // Remove all events from the state
                setEvents([]);
            })
            .catch(error => console.error('Error deleting all events:', error));
    }

    return (
        <div style={{ width: '100%', height: '500px' }}>
        <button onClick={handleDeleteAllEvents}>delete all</button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: '100%', height: '100%', fontSize: '11px' }}
                selectable
                views={['month', 'week', 'day']}
                defaultView={view}
                onView={handleViewChange}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                components={{
                    event: props => <EventComponent {...props} onEventDelete={handleDeleteEvent} view={view} />
                }}
            />
        </div>
    );
};

export default MyCalendar;
