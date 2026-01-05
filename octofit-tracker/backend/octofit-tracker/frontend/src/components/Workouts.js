import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/workouts/`;
  }
  return 'http://localhost:8000/api/workouts/';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching workouts from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="card-title mb-3">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={w.id || i}>
                <td>{i + 1}</td>
                <td>{w.name}</td>
                <td>{w.description}</td>
                <td>{w.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Workouts;
