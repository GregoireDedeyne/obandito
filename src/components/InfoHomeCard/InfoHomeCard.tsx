import { NavLink } from 'react-router-dom';

export function InfoHomeCard({ title, description }) {
  return (
    <div className="card w-2/5 h-3/4  text-black">
      <div className="card-body">
        <h2 className="card-title text-3xl">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
