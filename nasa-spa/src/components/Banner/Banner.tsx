import React from 'react';

const Banner = () => {
  return <>
    <div className='flex flex-row justify-between mx-80 my-10 h-96 mt-24'>
      <div className='w-2/4 h-full'>
        <h1 className='text-6xl font-semibold text-primary'>Main Header</h1>
        <h3 className='text-3xl font-medium text-accent mt-6'>Subheader</h3>
        <p className='text-xl font-medium text-accent mt-6'>Lorem ipsum dolor sit amet</p>
        <p className='text-xl font-medium text-accent mt-2'>Donec vestibulum blandit</p>
        <p className='text-xl font-medium text-accent mt-2'>Pellentesque ultricies </p>
        <div className='flex flex-row py-5 mt-2 gap-4'>
          <button className='text-xl text-white border-primary rounded-3xl border-2 px-8 py-2 bg-primary font-medium'>Button</button>
          <button className='text-accent border-secondary rounded-3xl border-2 px-10 py-1 text-xl font-medium'>Button</button>
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