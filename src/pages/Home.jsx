import React from 'react';

import { Helmet } from 'react-helmet';
import Banner from '../component/Banner';



import AboutSection from '../component/About';

import Category from '../component/Category';
import Feathers from '../component/Feathers';

import ReaderStories from '../component/Benifits';




const Home = () => {
  return (
    <div>

      <Helmet>
        <title>Home | Library-Manage</title>
        <meta name="description" content="Learn more about MyApp and what we do." />
        <meta property="og:title" content="About Us - MyApp" />
      </Helmet>
      <Banner></Banner>

      <Category></Category>
      

      
      <Feathers></Feathers>
      <AboutSection></AboutSection>
      <ReaderStories></ReaderStories>
     
      
      
    </div>
  );
};

export default Home;