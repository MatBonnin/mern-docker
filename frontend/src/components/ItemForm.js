import React, { useState } from 'react';

import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/items';

export default function ItemForm({ onSaved }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    axios
      .post(API, { name })
      .then(() => {
        setName('');
        onSaved();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Nom de l'item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit'>➕ Ajouter</button>
    </form>
  );
}
