import { NavLink } from 'react-router-dom';

export function InfoHomeCard({ title, description }) {
  return (
    <div className="card w-2/5 h-3/5 bg-slate-200	opacity-45	 text-black">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <NavLink to={'/subscribe'}>
            <button className="btn">Voir plus</button>
          </NavLink>{' '}
        </div>
      </div>
    </div>
  );
}
