import React from 'react';
import Wave from './Wave';

const WaveList = ({ waves }) => {
    return (
        <div>
            {
                waves.map((wave, i) => {
                    return (
                        <Wave
                            key={i}
                            address={waves[i].address}
                            time={waves[i].timestamp.toString()}
                            message={waves[i].message}
                        />)
                })
            }
        </div>
    );
}

export default WaveList;