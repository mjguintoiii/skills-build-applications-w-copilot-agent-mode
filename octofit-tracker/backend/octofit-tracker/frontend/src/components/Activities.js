import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/activities/`;
  }
  return 'http://localhost:8000/api/activities/';
};

function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="card-title mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Workout</th>
              <th>Duration (min)</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={a.id || i}>
                <td>{i + 1}</td>
                <td>{a.user?.name || a.user || '-'}</td>
                <td>{a.workout?.name || a.workout || '-'}</td>
                <td>{a.duration_minutes}</td>
                <td>{a.score}</td>
                <td>{a.date ? new Date(a.date).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Activities;
