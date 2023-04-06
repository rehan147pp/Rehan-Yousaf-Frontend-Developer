import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Banner from '../Banner/Banner';
import SearchForm from '../SearchForm/SearchForm';
import CapsulesGrid from '../CapsulesGrid/CapsulesGrid';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';

const Home = () => {
  const authenticated = useSelector((state: AppState) => state.authenticated);

  return <>
    <NavBar></NavBar>
    <Banner></Banner>
    {authenticated && <><SearchForm></SearchForm>
    <CapsulesGrid></CapsulesGrid></>}
    {!authenticated && <p className='text-3xl text-primary font-bold mx-80 my-24'>Click the Login button to start learning about Capsules</p>}
  </>;
}

export default Home;