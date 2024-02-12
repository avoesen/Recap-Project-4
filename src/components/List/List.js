import "./List.css"

export default function List({ activities , condition, temperature, weather, onDeleteActivity }) {
  const message = weather? "go outside the API is trolling you":"stay inside and do something like:";
  return (
    <>
      <h1>{condition} {temperature}°C</h1>
      <p>{message}</p>
      <ul>
        {activities.map((activity) => (
            <li key={activity.id}>
                <p className="activity-list">{activity.name}</p>
                <button type="button" onClick={() => onDeleteActivity(activity.id)}>
                {" "}
                +{" "}
                </button>
            </li>
            ))}
    </ul>
    </>
    )}; 