import PropTypes from 'prop-types';

function TodayForecast({propData}){

    return(
        <>
         {propData?.forecast?.forecastday[0]?.hour.map((cast, index) => (
           <div key={index} className='hourlyData'>
              <p className='castTime'>{cast?.time.split(" ")[1]}</p>
              <p className='castTemp'>{cast?.temp_c}</p>
              <img src={cast?.condition?.icon} alt="weather-icon" />
              <p className='castText'>{cast?.condition?.text}</p>
           </div>
         ))}
        </>
    );
}

TodayForecast.propTypes = {
    propData: PropTypes.object.isRequired,
  };

export default TodayForecast; 