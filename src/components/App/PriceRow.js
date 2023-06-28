import React from 'react';

const PriceRow = ({ price, changePercentage }) => {
    const rowClass = price.currentPrice - price.lastPrice > 0 ? 'green' : 'red';

    return (
        <tr className={rowClass}>
            <td>
                <div className="shimmer-effect">{price.coinName}</div>
            </td>
            <td>{price.currentPrice}</td>
            <td>{price.currentPrice - price.lastPrice}</td>
            <td>{changePercentage}%</td>
        </tr>
    );
};

export default PriceRow;
