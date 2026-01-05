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
    <div className="card shadow p-4 mt-4">
      <h2 className="card-title mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((l, i) => (
              <tr key={l.id || i}>
                <td>{i + 1}</td>
                <td>{l.team?.name || l.team || '-'}</td>
                <td>{l.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Leaderboard;
