import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/teams/`;
  }
  return 'http://localhost:8000/api/teams/';
};

function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching teams from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="card-title mb-3">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={t.id || i}>
                <td>{i + 1}</td>
                <td>{t.name}</td>
                <td>{t.description}</td>
                <td>{Array.isArray(t.members) ? t.members.length : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Teams;
