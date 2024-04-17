/**
 * Component for displaying a logo with a link.
 * @param {string} logo - The URL of the logo image.
 * @param {string} link - The URL the logo should link to.
 * @param {string} alt - The alternate text for the logo image.
 */

export default function SocialMedia({ logo, link, alt }) {
  return (
    <div className="flex justify-center">
      <span className="mx-2 text-2xl">
        <a href={link} target="_blank">
          <img className="w-[50px] h-[50px] rounded-lg" src={logo} alt={alt} />
        </a>
      </span>
    </div>
  );
}
