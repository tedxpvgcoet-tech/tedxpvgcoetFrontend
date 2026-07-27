import React from 'react'
import PerspectiveSection from '../sections/Common/PerspectiveSection'
import DrishtiSection from '../sections/Events/Drishti/DrishtiSection'
import Speaker from '../sections/Forms/Speaker'
import Booknow from '../sections/Booknow'
import DrishtiVideo from '../sections/Events/Drishti/DrishtiVideo'

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
