import React, { useState } from 'react';

const EventModal = ({ event, onClose, onSave, onDelete }) => {
    const [title, setTitle] = useState(event.title);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(event.id, title);
                }}>
                    <label>
                        Event Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => onDelete(event.id)}>Delete Event</button>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
