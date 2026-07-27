import React from 'react'
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
