import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import WelcomePage from './pages/WelcomePage'
import ReadPage from './pages/ReadPage'
import CreatePage from './pages/CreatePage'
import UpdatePage from './pages/CreatePage'
import initialTopics from './initialTopics'

function App() {
  const [topics, setTopics] = useState(initialTopics);

  useEffect(() => {
    const savedTopics = localStorage.getItem('topics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleCreate = (id, title, body) => {
    const newTopic = { id, title, body };
    setTopics([...topics, newTopic]);
  };

  const handleUpdate = (id, title, body) => {
    const updatedTopics = topics.map(topic =>
      topic.id === id ? { ...topic, title, body } : topic
    );
    setTopics(updatedTopics);
  };

  return (
    <Router>
      <div>
        <Header />
        <Nav topics={topics} />
        <ul>
          <li><Link to="/create" className="cheese-hover-center">Create</Link></li>
        </ul>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/read/:id" element={<ReadPage topics={topics} />} />
          <Route path="/create" element={<CreatePage onCreate={handleCreate} />} />
          <Route path="/update/:id" element={<UpdatePage topics={topics} onUpdate={handleUpdate} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
