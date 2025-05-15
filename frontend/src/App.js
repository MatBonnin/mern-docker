import './App.css';

import React, { useState } from 'react';

import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [refresh, setRefresh] = useState(false);

  // on déclenche le rechargement de la liste après chaque CRUD
  const handleRefresh = () => setRefresh((r) => !r);

  return (
    <div className='App' style={{ padding: '2rem' }}>
      <h1>Gestion d’Items</h1>
      <ItemForm onSaved={handleRefresh} />
      <hr />
      <ItemList
        refresh={refresh}
        onDeleted={handleRefresh}
        onUpdated={handleRefresh}
      />
    </div>
  );
}

export default App;
