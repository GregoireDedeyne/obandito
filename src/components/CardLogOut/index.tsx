export function Card({ image, alt, name, style }) {
  return (
    <div className="flex flex-col justify-center bg-white rounded-xl shadow max-w-[302px]">
      <div className="flex overflow-hidden relative flex-col px-5 pt-20 pb-5 w-full h-4/5 aspect-[0.74]">
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="object-cover absolute inset-0 w-full h-full rounded-xl"
        />
        <div className="flex relative flex-col px-4 py-4 mt-52 w-full bg-white rounded-xl">
          <h2 className="text-xl font-medium leading-6 text-neutral-700">
            {name}
          </h2>
          <p className="mt-1 text-sm leading-5 text-neutral-600">{style}</p>
        </div>
      </div>
    </div>
  );
}
