export function Card({ image, alt, name, description }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4">
        <img className="w-full" src={image} alt={alt} />
        <div className="px-4 py-4">
          <div className="font-bold text-xl mb-1">{name}</div>
          <p className="text-gray-700 text-base line-clamp-1 overflow-hidden overflow-ellipsis ">
            {description}
          </p>
        </div>
      </div>
    );
  }