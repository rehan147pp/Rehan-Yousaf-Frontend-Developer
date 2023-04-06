import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, actions } from '../../store/store';

const NavBar = () => {

  const authenticated = useSelector((state: AppState) => state.authenticated);
  const dispatch = useDispatch();

  const loginButtonClickHandler = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3500/nasa-api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: 'anon',
          password: '12345'
        })
      });
      const token: { token: string } = await response.json();
      localStorage.setItem('token', token?.token);
      dispatch(actions.setAuthenticated(true));
    } catch (e) {
      console.error('error', e);
    }
  }

  const logoutButtonClickHandler = (event: MouseEvent) => {
    localStorage.removeItem('token');
    dispatch(actions.setAuthenticated(false));
  }

  return <>
    <div className='flex flex-col lg:flex-row justify-between mx-10 lg:mx-80  my-10'>
      <div className='text-3xl text-accent inline-block font-bold flex flex-row items-center'>FunNasa</div>
      <div className='inline-block'>
        <ul className='flex flex-col text-accent h-full py-3 lg:flex-row'>
          <li className='text-2xl text-accent mx-0 lg:mx-16 font-medium'>Link 1</li>
          <div className='inline-block w-0.5 h-full bg-secondary'></div>
          <li className='text-2xl text-accent mx-0 lg:mx-16 font-medium'>Link 2</li>
          <div className='inline-block w-0.5 h-full bg-secondary'></div>
          <li className='text-2xl text-accent mx-0 lg:mx-16 font-medium'>Link 3</li>
        </ul>
      </div>
      <div className='inline-block flex items-center'>
        {!authenticated && <button type='button' onClick={loginButtonClickHandler} className='text-accent border-secondary rounded-3xl border-2 px-10 py-1 text-2xl font-semibold'>Login</button>}
        {authenticated && <button type='button' onClick={logoutButtonClickHandler} className='text-accent border-secondary rounded-3xl border-2 px-10 py-1 text-2xl font-semibold'>Logout</button>}
      </div>
    </div>
    <div className='h-0.5 w-full bg-secondary'></div>
  </>
}

export default NavBar;