import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
import PerspectiveSection from '../sections/PerspectiveSection'
import DrishtiSection from '../sections/DrishtiSection'
import Speaker from '../sections/Speaker'
import Booknow from '../sections/Booknow'


const ThemePage = () => {
  return (
    <>
    
      <DristiHeroSection />
      <Booknow/>
      <DrishtiHero />
      <Speaker/>
      <DrishtiSection />
      <PerspectiveSection />
      
    </>
  )
}

export default ThemePage
