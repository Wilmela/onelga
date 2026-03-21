import AuthForm from '@/components/auth-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
    title:'Sign In'
}

const SignInPage = () => {
  return <AuthForm type='SignIn'/>
}

export default SignInPage