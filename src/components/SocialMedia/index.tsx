interface SocialMediaProps {
  logo: string;
  link: string;
  alt: string;
}

export default function SocialMedia({ logo, link, alt }: SocialMediaProps) {
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
