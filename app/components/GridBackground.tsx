"use client";
import React, { useState, useEffect } from 'react';

const MIN_DISTANCE = 2.29;

const GridBackground = () => {
  const [gridDimensions, setGridDimensions] = useState({
    gridRows: 0,
    gridColumns: 0,
  });

  const [currentCoordinates, setCurrentCoordinates] = useState({
    x: 0,
    y: 0
  })

  const isCloseToCurrentCoordinates = (coords: {x: number, y: number }) => {
    const distance = Math.sqrt(Math.pow(currentCoordinates.x - coords.x,2) + Math.pow(currentCoordinates.y - coords.y, 2));


    if (distance < MIN_DISTANCE) {
      return true
    }
    return false
  }

  useEffect(() => {
    const updateGridDimensions = () => {
      const gridRows = Math.floor(window.innerWidth / 75); 
      const gridColumns = Math.floor(window.innerHeight / 75); 

      setGridDimensions({
        gridRows,
        gridColumns,
      });
    };

    updateGridDimensions();

    window.addEventListener('resize', updateGridDimensions);

    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  const numbersRow = Array.from({ length: gridDimensions.gridRows });
  const numbersColumn = Array.from({ length: gridDimensions.gridColumns });

  return (
    <div className='absolute top-0 left-0 flex flex-row h-screen w-screen z-0'>
      {numbersRow.map((_, i) => (
        <div key={i} className='bg-transparent grow flex flex-col'>
          {numbersColumn.map((_, j) => (
            <div key={j} className={`bg-transparent hover:border hover:border-pink-600 rounded-xl grow 
              ${isCloseToCurrentCoordinates({x: i, y: j}) ? 'border border-pink-600 bg-pink-500 bg-opacity-10': ''} 
transition-all duration-500`}
              onMouseEnter={() => setCurrentCoordinates({x: i, y: j})}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridBackground;

