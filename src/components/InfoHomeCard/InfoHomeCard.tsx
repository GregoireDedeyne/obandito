import React from 'react';
import { NavLink } from 'react-router-dom';

interface EventCardProps {
  imageUrl: string;
  overlayImageUrl: string;
  title: string;
  description: string;
  searchTags: string[];
  platform: string;
  timeAgo: string;
  price: number;
  offer: number;
}

export function EventCard({
  imageUrl,
  overlayImageUrl,
  title,
  description,
  searchTags,
  platform,
  timeAgo,
  price,
  offer,
}: EventCardProps) {
  return (
    <NavLink to={'/'}>
      <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg max-md:pr-5 max-md:max-w-full border-2 border-solid border-transparent hover:border-purple-800">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col grow justify-center items-center rounded-xl aspect-[0.93] w-[195px] max-md:mt-10">
              <img
                loading="lazy"
                src={imageUrl}
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <img
                loading="lazy"
                src={overlayImageUrl}
                alt={title}
                className="w-full aspect-[0.93]"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch my-auto text-base font-medium leading-6 max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h3 className="text-xl leading-6 text-slate-900 max-md:max-w-full">
                  {title}
                </h3>
                <div className="flex gap-1.5 self-start mt-1.5 text-neutral-600">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bac38671888a46129a537a5a178fc1ef9ecfcd735f21eececc50cccff3b67569?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                    alt=""
                    className="shrink-0 my-auto w-2.5 aspect-square"
                  />
                  <div>Disponible</div>
                  <div>·</div>
                  <div>Moins de {price} €</div>
                  <div>·</div>
                  <div>{offer} offre</div>
                </div>
                <p className="mt-1.5 leading-6 text-neutral-600 max-md:max-w-full">
                  {description}
                </p>
                <div className="flex gap-1.5 self-start mt-1.5 text-neutral-600">
                  <div>Recherche : </div>
                  {searchTags.map((tag, index) => (
                    <React.Fragment key={index}>
                      <div>{tag}</div>
                      {index < searchTags.length - 1 && (
                        <div className="text-neutral-600">·</div>
                      )}
                    </React.Fragment>
                  ))}
                  <div className="text-neutral-600">·</div>
                  <div>{platform}</div>
                </div>
                <div className="mt-1.5 text-zinc-500 max-md:max-w-full">
                  {timeAgo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
