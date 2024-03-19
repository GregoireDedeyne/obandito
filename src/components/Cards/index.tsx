import { Card } from '../Card'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [{
    name: "aaa",
    url: "https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg",
    alt: "aaa",
    description: "description"
},{
    name: "bbb",
    url: "https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=",
    alt: "bbb",
    description: "description"
},{
    name: "bbb",
    url: "https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg",
    alt: "bbb",
    description: "erztytzer eyruyyter ytuyyertuyyrytu yiyrtuyiyrt uyi"
},{
    name: "bbb",
    url: "https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=",
    alt: "bbb",
    description: "description"
},{
    name: "bbb",
    url: "https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg",
    alt: "bbb",
    description: "description"
}];

export function Cards() {

    var settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };

  return (
    <Slider {...settings}>
      {data.map((card) => (
        <div>
        <Card key={card.url} image={card.url} alt={card.alt} name={card.name} description={card.description} />
        </div>
      ))}
      </Slider>
  );
}