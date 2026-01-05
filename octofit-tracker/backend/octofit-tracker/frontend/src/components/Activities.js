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
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((a, i) => (
          <li key={a.id || i} className="list-group-item">
            {JSON.stringify(a)}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Activities;
