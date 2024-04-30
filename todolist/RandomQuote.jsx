import React, { useState, useEffect } from 'react';
import './src/WidgetStyle.css';

const RandomQuote = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });

    // Function to fetch a random quote
    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            setQuote({ content: data.content, author: data.author });
        } catch (error) {
            console.error('Error fetching quote:', error);
            setQuote({ content: 'Failed to fetch quote.', author: '' });
        }
    };

    // Fetch a quote when the component mounts
    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="quote-widget">
            <blockquote>
                "{quote.content}"
                <footer>— {quote.author}</footer>
            </blockquote>
            <button onClick={fetchQuote}>Get Another Quote</button>
        </div>
    );
};

export default RandomQuote;
