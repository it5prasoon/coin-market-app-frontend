import React, { useEffect, useState } from 'react';
import PriceRow from './PriceRow';

const PriceTable = ({ socket }) => {
    const [latestPrices, setLatestPrices] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        // Listen for 'latestPrices' event from the backend
        socket.on('latestPrices', (data) => {
            setLatestPrices(data);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.off('latestPrices');
        };
    }, [socket]);

    const calculateChangePercentage = (currentPrice, lastPrice) => {
        const change = currentPrice - lastPrice;
        const percentage = (change / lastPrice) * 100;
        return percentage.toFixed(2); // Limiting decimal places to 2
    };

    const handleSortByName = () => {
        const sortedPrices = [...latestPrices].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.coinName.localeCompare(b.coinName);
            } else {
                return b.coinName.localeCompare(a.coinName);
            }
        });

        setLatestPrices(sortedPrices);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Sort the latestPrices array based on the sort order
    const sortedPrices = latestPrices.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.coinName.localeCompare(b.coinName);
        } else {
            return b.coinName.localeCompare(a.coinName);
        }
    });

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>
                        Name{' '}
                        <button onClick={handleSortByName}>
                            {sortOrder === 'asc' ? '▲' : '▼'}
                        </button>
                    </th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Change Percentage</th>
                </tr>
                </thead>
                <tbody>
                {sortedPrices.map((price) => (
                    <PriceRow
                        key={price._id}
                        price={price}
                        changePercentage={calculateChangePercentage(
                            price.currentPrice,
                            price.lastPrice
                        )}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
