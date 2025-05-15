import React, { useEffect, useState } from 'react';

import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/items';

export default function ItemList({ refresh, onDeleted, onUpdated }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, [refresh]);

  const deleteItem = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => onDeleted())
      .catch(console.error);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setEditValue(item.name);
  };

  const saveEdit = (id) => {
    axios
      .put(`${API}/${id}`, { name: editValue })
      .then(() => {
        setEditing(null);
        onUpdated();
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Liste des items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editing === item._id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(item._id)}>✔️</button>
                <button onClick={() => setEditing(null)}>✖️</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => startEdit(item)}>✏️</button>
                <button onClick={() => deleteItem(item._id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
