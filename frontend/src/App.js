import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './pages/navbar/Navbar';
import ArticleFeed from './pages/articleFeed/ArticleFeed';
import ArticleCreateForm from './pages/articleCreateForm/ArticleCreateForm';
import ArticleDetails from './pages/articleDetails/ArticleDetails';

import { ArticlesContextProvider } from './contexts/article';

function App() {
  return (
    <div className="App">
      <ArticlesContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/articles/*" element={
              <Routes>
                <Route path="" element={<ArticleFeed />} />
                <Route path="/:articleId" element={<ArticleDetails />} />
              </Routes>
            } />
            <Route path="/create" element={<ArticleCreateForm />} />
            <Route path="*" element={<Navigate to="/articles" replace />} />
          </Routes>
        </Router>
      </ArticlesContextProvider>
      <ToastContainer />
    </div >
  );
}

export default App;
