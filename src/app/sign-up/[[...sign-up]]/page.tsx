import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignupPage = () => {
  return (
    <div className='flex justify-center items-center h-[110vh] bg-[#865D36]'>
      <SignUp /> 
    </div>
  )
}

export default SignupPage
