import './App.css';
import { useState, useEffect } from 'react';

const Nav = ({ topics, onChangeMode }) => {
  return (
    <nav>
      <ol>
        {topics.map(topic => (
          <li key={topic.id}>
            <a href={`/read/${topic.id}`} className="cheese-hover-center" onClick={(event) => {
              event.preventDefault();
              onChangeMode(topic.id);
            }}>{topic.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const Header = ({ title, onChangeMode }) => {
  return (
    <header>
      <h1><a href="/" className="cheese-hover-center" onClick={(event) => {
        event.preventDefault();
        onChangeMode();
      }}>{title}</a></h1>
    </header>
  );
};

const Article = ({ title, body }) => {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
};

const Create = ({ onCreate }) => {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  );
};

const Update = ({ title: initialTitle, body: initialBody, onUpdate }) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        onUpdate(title, body);
      }}>
        <p><input type="text" name="title" value={title} onChange={(event) => {
          setTitle(event.target.value);
        }} /></p>
        <p><textarea name="body" value={body} onChange={(event) => {
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  );
};

function App() {
  const initialTopics = [
    { id: 1, title: 'Valencia Orange', body: 'A sweet and juicy orange variety, perfect for juicing.' },
    { id: 2, title: 'Navel Orange', body: 'Known for its easy-to-peel skin and sweet flavor.' },
    { id: 3, title: 'Blood Orange', body: 'A deep red orange with a rich, berry-like flavor.' },
    { id: 4, title: 'Mandarin Orange', body: 'Small, sweet, and easy to peel — loved by kids.' },
    { id: 5, title: 'Seville Orange', body: 'A bitter orange used mainly for marmalade and cooking.' },
    { id: 6, title: 'Cara Cara Orange', body: 'A pink-fleshed navel orange with a sweet, complex taste.' },
    { id: 7, title: 'Tangerine', body: 'A bright and tangy orange often eaten as a snack.' },
    { id: 8, title: 'Satsuma Orange', body: 'Seedless and easy to peel, perfect for winter snacking.' },
    { id: 9, title: 'Clementine', body: 'A hybrid between a mandarin and a sweet orange — juicy and seedless.' },
    { id: 10, title: 'Bergamot Orange', body: 'Known for its fragrance, used in Earl Grey tea.' },
  ];

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState(initialTopics);
  const [nextId, setNextId] = useState(11);

  // ✅ 앱 시작할 때 localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedTopics = localStorage.getItem('topics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
  }, []);

  // ✅ topics가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleHeaderClick = () => {
    setMode('WELCOME');
  };

  const handleNavClick = (_id) => {
    setMode('READ');
    setId(_id);
  };

  const handleCreateClick = (event) => {
    event.preventDefault();
    setMode('CREATE');
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();
    setMode('UPDATE');
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    const newTopics = topics.filter(topic => topic.id !== id);
    setTopics(newTopics);
    setMode('WELCOME');
  };

  const handleCreate = (_title, _body) => {
    const newTopic = { id: nextId, title: _title, body: _body };
    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    setId(nextId);
    setNextId(nextId + 1);
    setMode('READ');
  };

  const handleUpdate = (_title, _body) => {
    const updatedTopics = topics.map(topic =>
      topic.id === id ? { ...topic, title: _title, body: _body } : topic
    );
    setTopics(updatedTopics);
    setMode('READ');
  };

  const renderCreateLink = () => (
    <li>
      <a href="/create" className="cheese-hover-center" onClick={handleCreateClick}>Create</a>
    </li>
  );

  const renderUpdateAndDeleteLink = () => (
    <>
      <li>
        <a href={`/update/${id}`} className="cheese-hover-center" onClick={handleUpdateClick}>Update</a>
      </li>
      <li>
        <a href={`/delete/${id}`} className="cheese-hover-center" onClick={handleDeleteClick}>Delete</a>
      </li>
    </>
  );

  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') {
    content = <Article 
      title="🍊WELCOME TO ORANGE WORLD🍊" 
      body="All the oranges in the world meet here! Share your own orange today 🍊" 
    />;
  } else if (mode === 'READ') {
    const topic = topics.find(t => t.id === id);
    content = <Article title={topic.title} body={topic.body} />;
    contextControl = renderUpdateAndDeleteLink();
  } else if (mode === 'CREATE') {
    content = <Create onCreate={handleCreate} />;
  } else if (mode === 'UPDATE') {
    const topic = topics.find(t => t.id === id);
    content = <Update title={topic.title} body={topic.body} onUpdate={handleUpdate} />;
  }

  return (
    <div>
      <Header title="Welcome to the 🍊 Free Orange Nation ✨" onChangeMode={handleHeaderClick} />
      <Nav topics={topics} onChangeMode={handleNavClick} />
      {content}
      <ul>
        {renderCreateLink()}
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
