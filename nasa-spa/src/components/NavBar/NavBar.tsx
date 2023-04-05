import React from 'react';

const NavBar = () => {
  return <>
    <div className='flex flex-row justify-between mx-80 my-10'>
      <div className='text-3xl text-accent inline-block font-medium flex flex-row items-center'>My NASA</div>
      <div className='inline-block'>
        <ul className='flex flex-row text-accent h-full py-3'>
          <li className='text-2xl text-accent mx-16 font-medium'>Link 1</li>
          <div className='inline-block w-0.5 h-full bg-secondary'></div>
          <li className='text-2xl text-accent mx-16 font-medium'>Link 2</li>
          <div className='inline-block w-0.5 h-full bg-secondary'></div>
          <li className='text-2xl text-accent mx-16 font-medium'>Link 3</li>
        </ul>
      </div>
      <div className='inline-block flex items-center'>
        <button className='text-accent border-secondary rounded-3xl border-2 px-10 py-1 text-2xl font-semibold'>Button</button>
      </div>
    </div>
    <div className='h-0.5 w-full bg-secondary'></div>
  </>
}

export default NavBar;