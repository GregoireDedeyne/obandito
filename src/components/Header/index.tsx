export function Header () {
  return <div className="navbar bg-color-primary">
  <div className="navbar-start">
    
    <a className="btn btn-ghost text-xl text-white hover:bg-color-secondary hover:text-black	">O'Bandito</a>
  </div>
  <div className="navbar-center hidden lg:flex text-white">
    <ul className="menu menu-horizontal px-1 ">
      <li className="	hover:bg-color-secondary hover:text-black rounded-lg "> <a>Evènements</a></li>
      <li className="	hover:bg-color-secondary hover:text-black rounded-lg"> <a>Groupes</a> </li>
      <li className="	hover:bg-color-secondary hover:text-black hover:rounded-lg"> <a>à propos</a> </li>
    </ul>
  </div>
  <div className="navbar-end">
    {/* Ajouter les boutons connexions et s'incrire */}
  </div>
</div> }