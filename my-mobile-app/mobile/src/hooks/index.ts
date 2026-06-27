import { useState, useEffect } from 'react';

// Custom hook for managing a counter
export const useCounter = (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => prevCount - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
};

// Custom hook for fetching data
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};