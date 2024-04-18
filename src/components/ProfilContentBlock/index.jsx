import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';

/**
 * Component for the profile content block.
 * @param {string} title - Title of the content block.
 * @param {string} spotify - Spotify link.
 * @param {string} youtube - YouTube link.
 * @param {string} description - Description of the content block.
 */

export default function ProfilContentBlock({
  title,
  spotify,
  youtube,
  description,
}) {
  if (title === 'Présentation') {
    if (description) {
      return (
        <div className="bloc-white mb-[50px]">
          <div className="flex items-center">
            <h2 className="text-black">{title}</h2>
          </div>
          <p>{description}</p>
        </div>
      );
    } else {
      return (
        <div className="bloc-white mb-[50px]">
          <div className="flex items-center">
            <h2 className="text-black">{title}</h2>
          </div>
          <p>Il n'y a pas de description.</p>
        </div>
      );
    }
  } else if (title === 'Musiques & clips') {
    if (spotify || youtube) {
      return (
        <div className="bloc-white md:mb-[50px]">
          <div className="flex items-center">
            <h2 className="text-black">{title}</h2>
          </div>
          <div className="my-4">
            {spotify && (
              <SpotifyPlayer
                uri={spotify}
                size={{ width: '100%', height: 600 }}
              />
            )}
          </div>
          {youtube && (
            <ReactPlayer
              url={youtube}
              width="100%"
              height={500}
              controls={true}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="bloc-white mb-[50px]">
          <div className="flex items-center">
            <h2 className="text-black">{title}</h2>
          </div>
          <span>L'artiste n'a pas partagé de musique</span>
        </div>
      );
    }
  }
}
