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
