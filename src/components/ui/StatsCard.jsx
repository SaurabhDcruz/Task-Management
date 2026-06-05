import React from 'react';

const StatsCard = React.memo(function StatsCard({ label, value, accent, icon }) {
  return (
    <div className="stats-card card">
      <div className="stats-card-header">
        <span className="stats-icon">{icon}</span>
        <span className="stats-label">{label}</span>
      </div>
      <h2 className="stats-value" style={{ color: accent }}>
        {value}
      </h2>
    </div>
  );
});

export default StatsCard;
