import styled from "styled-components";

function Feed() {
  let links = [
    "https://www.fulcrumgallery.com/product-images/P1020565-10/breath-of-gaia.jpg",
    "https://psychologie.com.br/wp-content/uploads/2020/10/1-3.jpg",
    "https://drive.google.com/uc?export=view&id=1ylQycUOc7yMGmErKQ_P9FP4K2CcZjK9h",
    "https://drive.google.com/uc?export=view&id=1ruJpObp8WikCxe_h0ZBeObq557CdgU2b",
    "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
    "https://cdn.unenvironment.org/2022-03/field-ge4d2466da_1920.jpg",
    "https://static.educalingo.com/img/en/800/nature.jpg",
    "https://img.freepik.com/free-photo/beautiful-scenery-road-forest-with-lot-colorful-autumn-trees_181624-30942.jpg?w=2000",
    "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
    "http://sinpolrn.org.br/wp-content/uploads/2019/09/nature-1.jpg",
    "https://images.squarespace-cdn.com/content/v1/5c69df27ca525b3b56a5cce6/1553776779529-IF27XV130PBNE5RZU3F9/JackBrauer-WanakaSunrise.jpg",
    "https://wikiimg.tojsiabtv.com/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
    "https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg",
    "http://d2ouvy59p0dg6k.cloudfront.net/img/people_and_nature_701917.jpg",
    "https://www.eea.europa.eu/themes/biodiversity/state-of-nature-in-the-eu/state-of-nature-2020-subtopic/image_print",
    "https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWoknYCckV17nqFV8Lo-HyxEPZ_syVkg5KvA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkXhkKwZuQOaCaL82eS3__jUP6INaaykJHg&usqp=CAU",
    "https://www-cdn.eumetsat.int/files/styles/16_9_large/s3/2020-06/ASpot_Weather.jpg?h=d1cb525d&itok=lvYWh_W8",
    "https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/wolfgang-hasselmann-br-gllg7bs-unsplash-2_ver_1.jpg",
    "https://res.cloudinary.com/dtpgi0zck/image/upload/s--w8nugAik--/c_fill,h_580,w_860/v1/EducationHub/photos/lightning-grand-canyon.jpg",
  ];
  return (
    <Main>
      {links.map((link, index) => {
        return <img src={link} key={index} alt=""></img>;
      })}
    </Main>
  );
}

export default Feed;

const Main = styled.main`
  width: 100%;
  padding-bottom: 50px;
  line-height: 0;
  -webkit-column-count: 5;
  -webkit-column-gap: 0px;
  -moz-column-count: 5;
  -moz-column-gap: 0px;
  column-count: 5;
  column-gap: 0px;
  img {
    width: 100% !important;
    height: auto !important;
  }
  @media (max-width: 1200px) {
    #photos {
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }

  @media (max-width: 1000px) {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }

  @media (max-width: 800px) {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }

  @media (max-width: 400px) {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }
`;
