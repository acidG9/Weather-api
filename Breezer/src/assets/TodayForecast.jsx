import PropTypes from 'prop-types';

function TodayForecast({propData}){

    return(
        <>
         <p>today forecast</p>
         <div className='rollerDiv'>
          {propData?.forecast?.forecastday[0]?.hour.map((cast, index) => (
            <div key={index} className='hourlyData'>
               <p>{cast?.time}</p>
               <p>{cast?.temp_c}</p>
               <p>{cast?.condition?.icon}</p>
               <p>{cast?.condition?.text}</p>
            </div>
          ))}
         </div>
        </>
    );
}

TodayForecast.propTypes = {
    propData: PropTypes.object.isRequired,
  };

export default TodayForecast; 