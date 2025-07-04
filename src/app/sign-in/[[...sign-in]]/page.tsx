import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-[#865D36]'>
      <SignIn />
    </div>
  )
}

export default SignInPage
