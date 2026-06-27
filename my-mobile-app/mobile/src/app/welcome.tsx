import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to My Mobile App!</h1>
            <p>
                This application is designed to provide you with the best experience.
                Please follow the instructions to get started.
            </p>
            <button onClick={() => alert('Get Started!')}>Get Started</button>
        </div>
    );
};

export default Welcome;