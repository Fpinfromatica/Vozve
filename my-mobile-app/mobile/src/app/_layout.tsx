import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="app-layout">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;