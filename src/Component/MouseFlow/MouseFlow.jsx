import React, { useEffect } from 'react';
import './MouseFlow.css'
const MouseFlow = () => {
  useEffect(() => {
    const circle = document.querySelector('.circle');
    const circle2 = document.querySelector('.circle2');

    document.addEventListener('mousemove', (e) => {
      // Update the circle's position to follow the mouse cursor
      circle.style.left = e.pageX - circle.clientWidth / 2 + 'px';
      circle.style.top = e.pageY - circle.clientHeight / 2 + 'px';
      circle2.style.left = e.pageX - circle2.clientWidth / 2 + 'px';
      circle2.style.top = e.pageY - circle2.clientHeight / 2 + 'px';
    })

  }, [])
  return (
    <div>

      <div class="circle"></div>
      <div class="circle2"></div>
     
   </div>
  );
};

export default MouseFlow;