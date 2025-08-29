import React from 'react'
import DristiHeroSection from '../sections/DristiHeroSection'
import DrishtiHero from '../sections/DrishthiHero'
import PerspectiveSection from '../sections/PerspectiveSection'
import DrishtiSection from '../sections/DrishtiSection'
import Speaker from '../sections/Speaker'
import SectionHeader from '../sections/SectionHeader'

const ThemePage = () => {
  return (
    <>
    
      <DristiHeroSection />
      <DrishtiHero />
      <SectionHeader></SectionHeader>
      <Speaker/>

      <DrishtiSection />
      <PerspectiveSection />
      
    </>
  )
}

export default ThemePage
