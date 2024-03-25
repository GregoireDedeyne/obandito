import { NavLink } from 'react-router-dom';

export function PrimaryButton({ text, href, onClick }: { text: string; href: string }) {
  return (
    <NavLink to={href}>
      <button onClick={onClick} className="btn py-2 px-5 rounded-lg bg-slate-900 text-white border-2 border-color-primary transition duration-150 hover:bg-color-secondary hover:text-color-primary hover:border-color-primary hover:border-2">
        {text}
      </button>
    </NavLink>
  );
}
