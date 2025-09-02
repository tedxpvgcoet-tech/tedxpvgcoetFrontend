import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
import PerspectiveSection from '../sections/PerspectiveSection'
import DrishtiSection from '../sections/DrishtiSection'
import Speaker from '../sections/Speaker'
import Booknow from '../sections/Booknow'
import DrishtiVideo from '../sections/DrishtiVideo'

const ThemePage = () => {
  return (
    <>
      <Booknow/>
      <DrishtiVideo/>
      <DrishtiSection />
      <Speaker/>
      <PerspectiveSection />
      
    </>
  )
}

export default ThemePage
