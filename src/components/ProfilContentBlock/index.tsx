import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
export default function ProfilContentBlock({
  title,
  spotify,
  youtube,
  description,
}) {
  if (title === 'Présentation') {
    return (
      <div className="bloc-white mb-[50px]">
        <div className="flex items-center">
          <h2 className="text-black">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    );
  } else if (title === 'Musiques & clips') {
    return (
      <div className="bloc-white mb-[50px]">
        <div className="flex items-center">
          <h2 className="text-black">{title}</h2>
        </div>
        <div className="my-4">
          <SpotifyPlayer uri={spotify} size={{ width: '100%', height: 600 }} />
        </div>
        <ReactPlayer url={youtube} width="100%" height={500} controls={true} />
      </div>
    );
  }
}
