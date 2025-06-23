import React from 'react'
import EmployerHero from '../components/Employerslanding/EmployerHero'
import EmployerBenefits from '../components/Employerslanding/EmployerBenefits'
import EmployerHowItWorks from '../components/Employerslanding/EmployerHowItWorks'
import EmployerCTA from '../components/Employerslanding/EmployerCTA'

const EmployerLanding = () => {
  return (
    <div>
      <EmployerHero />
      <EmployerHowItWorks />
      <EmployerBenefits />
      <EmployerCTA/>
    </div>
  )
}

export default EmployerLanding
