import './App.css';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import { useState } from 'react';

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => setReloadKey(prev => prev + 1);

  return (
    <div className="App">
      <h1>Eischen Clément - Web Atrio</h1>
      <AddPersonForm reload={reload} />
      <PersonList key={reloadKey} />
    </div>
  );
}

export default App;
