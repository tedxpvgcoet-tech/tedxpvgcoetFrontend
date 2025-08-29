import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
import PerspectiveSection from '../sections/PerspectiveSection'
import DrishtiSection from '../sections/DrishtiSection'
import Speaker from '../sections/Speaker'

const ThemePage = () => {
  return (
    <>
    
      <DristiHeroSection />
      <DrishtiHero />
      <Speaker/>

      <DrishtiSection />
      <PerspectiveSection />
      
    </>
  )
}

export default ThemePage
