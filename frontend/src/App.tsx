import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import store from './store/store';
import theme from './theme/theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import LivestreamPage from './pages/LivestreamPage';
import ForumsPage from './pages/ForumsPage';
import PollsPage from './pages/PollsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/livestream" element={<LivestreamPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/polls" element={<PollsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
