import React, { useEffect } from 'react';
import cloudImage from '../../../assets/cloud.png';
import './movingCloud.css';

const MovingCloud: React.FC = () => {
  useEffect(() => {
    const cloudImageElement = document.getElementById('cloudImage') as HTMLImageElement;
    if (cloudImageElement) {
      let position = -cloudImageElement.width; // Start off-screen to the left
      const speed = 1;
      const animateCloud = () => {
        position += speed;
        if (position > window.innerWidth) {
          position = -cloudImageElement.width;
        }
        cloudImageElement.style.transform = `translateY(-50%) translateX(${position}px)`;
        requestAnimationFrame(animateCloud);
      };
      animateCloud(); // Start the animation
    }
  }, []);

  return (
    <div className="moving-cloud">
      <img
        id="cloudImage"
        src={cloudImage}
        alt="Moving Cloud"
        style={{ height: '200px', position: 'absolute', top: '50%' }}
      />
    </div>
  );
};

export default MovingCloud;
