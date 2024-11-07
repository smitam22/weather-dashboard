import React from 'react';
import './skeletonLoader.css'; 


type SkeletonLoaderProps = {
    width?: string;
    height?: string;
  }; 

  const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height }) => {
    const styles = {
      width: width || '100%', // default width to 100%
      height: height || '20px', // default height
    };
  
    return <div className="skeleton-loader" style={styles}></div>;
  };

export default SkeletonLoader;
