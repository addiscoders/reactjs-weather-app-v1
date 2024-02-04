import Search from '../../images/search.png';
import Clouds from '../../images/clouds.png';
import Humidity from '../../images/humidity.png';
import Wind from '../../images/wind.png';
import Clear from '../../images/clear.png';
import Drizzle from '../../images/drizzle.png';
import Mist from '../../images/mist.png';
import Rain from '../../images/rain.png';
import './Home.css';
import { useState } from 'react';
import axios from 'axios';



function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: '/src/images/clear.png',
  });

  const [name, setName] = useState('');

  function handleClick() {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1d41cb1699a11b9d25ff9276ae7676c6&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {

          let imagePath = '';

          if (res.data.weather[0].main == 'Clouds') {
            imagePath = '/src/images/clouds.png';
          } else if (res.data.weather[0].main == 'Clear') {
            imagePath = '/src/images/clear.png';
          } else if (res.data.weather[0].main == 'Rain') {
            imagePath = '/src/images/rain.png';
          } else if (res.data.weather[0].main == 'Drizzle') {
            imagePath = '/src/images/drizzle.png';
          } else if (res.data.weather[0].main == 'Mist') {
            imagePath = '/src/images/mist.png';
          } else {
            imagePath = '/src/images/clouds.png';
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
        })
        .catch((err) => console.log({ message: err.message }));
    }
  }

  return (
    <div>
      <div className="container">
        <div className="weather">
          <div className="search">
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleClick}>
              <img src={Search} alt="" />
            </button>
          </div>
          <div className="winfo">
            <img className="icon" src={data.image} alt="" />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img className="icon" src={Humidity} alt="" />
                <div className="humidity">
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img className="icon" src={Wind} alt="" />
                <div className="wind">
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// Continue from 28:15
