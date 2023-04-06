import React from 'react';

const Banner = () => {
  return <>
    <div className='flex flex-row justify-between mx-80 my-10 h-96 mt-24'>
      <div className='w-2/4 h-full'>
        <h1 className='text-6xl font-semibold text-primary'>Rockets & Capsules</h1>
        <h3 className='text-3xl font-medium text-accent mt-6'>A starry night</h3>
        <p className='text-xl font-medium text-accent mt-6'>They tells about the universe</p>
        <p className='text-xl font-medium text-accent mt-2'>They sparkle like stars in the night sky</p>
        <p className='text-xl font-medium text-accent mt-2'>They are pointy</p>
        <div className='flex flex-row py-5 mt-2 gap-4'>
          <button className='hover:bg-white hover:text-primary text-xl text-white border-primary rounded-3xl border-2 px-8 py-2 bg-primary font-medium'>Rockets</button>
          <button className='hover:bg-secondary hover:text-white text-accent border-secondary rounded-3xl border-2 px-10 py-1 text-xl font-medium'>Capsules</button>
        </div>
      </div>
      <div className='w-2/4 h-full flex justify-end items-center'>
        <img src='/rocket.png' alt='Imagine Rocket Here'></img>
      </div>
    </div>
    <div className='h-0.5 w-full bg-secondary'></div>

  </>;
}

export default Banner;