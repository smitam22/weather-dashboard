import React from 'react';
import SkeletonLoader from '../components/common/skeletonLoader/skeletonLoader';

const WeatherCardLoader = () => {
  return (
    <div className='weather-details-loader my-2 mx-4'>
      <div className='first-weather-card d-flex gap-3'>
        <div className='d-flex align-items-center gap-3 w-50'>
          <div className='me-4'>
            <SkeletonLoader width="156px" height="24px" />
            <br />
            <SkeletonLoader width='155px' height="82px" />
          </div>
          <SkeletonLoader width="121px" height="95px" />
          <SkeletonLoader width='142px' height="80px" />
        </div>
        <div className='d-flex align-items-center justify-content-between w-50'>
          {/* Generate 3 SkeletonLoader components */}
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} width="127px" height="70px" />
          ))}
        </div>
      </div>

      <div className='d-flex flex-wrap justify-content-between mt-3 gap-3'>
        {/* Generate 4 weather-card-loader components */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='weather-card-loader d-flex flex-column align-items-center'>
            <SkeletonLoader width="140px" height="40px" />
            <br />
            <SkeletonLoader width="140px" height="75px" />
            <br />
            <SkeletonLoader width="140px" height="40px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardLoader;
