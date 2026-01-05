import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/leaderboards/`;
  }
  return 'http://localhost:8000/api/leaderboards/';
};

function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching leaderboards from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboards(results);
        console.log('Fetched leaderboards:', results);
      })
      .catch(err => console.error('Error fetching leaderboards:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboards.map((l, i) => (
          <li key={l.id || i} className="list-group-item">
            {JSON.stringify(l)}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Leaderboard;
