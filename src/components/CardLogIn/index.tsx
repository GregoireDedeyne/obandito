export function CardLogIn({ image, alt, name, description, link }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl mx-4 bg-white">
      <img className="w-full" src={image} alt={alt} />
      <div className="px-4 py-4">
        <div className="font-bold text-xl mb-1">{name}</div>
        <p className="text-gray-700 text-base line-clamp-1 overflow-hidden overflow-ellipsis ">
          {description}
        </p>
        <a href={link}>
          <button className="btn"> Voir plus</button>
        </a>
      </div>
    </div>
  );
}
