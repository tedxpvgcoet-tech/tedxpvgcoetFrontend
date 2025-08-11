/*
import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
const ThemePage = () => {
  return (
    <>
    <DristiHeroSection/>
    <DrishtiHero/>
    </>
  )
}

export default ThemePage
*/
import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
import PerspectiveSection from '../sections/PerspectiveSection'
import DrishtiSection from '../sections/DrishtiSection'

const ThemePage = () => {
  return (
    <>
      <DristiHeroSection />
      <div id="learn-section">
        <DrishtiHero />
        <DrishtiSection />
        <PerspectiveSection />
      </div>
    </>
  )
}

export default ThemePage
