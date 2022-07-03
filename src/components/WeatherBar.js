import styled from "styled-components";

function WeatherBar(props) {
  const ICONURL = "http://openweathermap.org/img/wn/";
  const weatherColor = {
    "clear sky": "#0000FF",
    "few clouds": "#A9A9A9",
    "scattered clouds": "#FFFFFF",
    "broken clouds": "#545454",
    "shower rain": "#BFE6FF",
    rain: "#009DFF",
    thunderstorm: "#663A82",
    snow: "#E0FFFF",
    mist: "#B3AFAF",
  };
  return (
    <Nav>
      <div onClick={() => props.color(weatherColor["clear sky"])}>
        <img src={`${ICONURL}01d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["few clouds"])}>
        <img src={`${ICONURL}02d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["scattered clouds"])}>
        <img src={`${ICONURL}03d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["broken clouds"])}>
        <img src={`${ICONURL}04d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["shower rain"])}>
        <img src={`${ICONURL}09d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["rain"])}>
        <img src={`${ICONURL}10d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["thunderstorm"])}>
        <img src={`${ICONURL}11d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["snow"])}>
        <img src={`${ICONURL}13d@2x.png`}></img>
      </div>
      <div onClick={() => props.color(weatherColor["mist"])}>
        <img src={`${ICONURL}50d@2x.png`}></img>
      </div>
    </Nav>
  );
}

export default WeatherBar;

const Nav = styled.nav`
  background-color: var(--white-base);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 50px;

  position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 10;

  div {
    height: 50px;
    width: 100%;
    color: var(--black-base);
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      width: 40%;
      height: auto;
    }
  }
`;
