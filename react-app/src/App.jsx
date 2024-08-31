import React, { useState } from 'react';
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.text();
      setStory(data);
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Generate Story</button>
      </form>
      {story && <p>{story}</p>}
    </div>
  );
}

export default App;
