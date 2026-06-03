import AuthForm from '@/components/auth-form'
import { Metadata } from 'next'

export const metadata:Metadata ={
    title:'Sign In'
}

const SignInPage = () => {
  return <AuthForm type='SignIn'/>
}

export default SignInPage