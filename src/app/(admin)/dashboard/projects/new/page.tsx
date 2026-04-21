import ProjectForm from '@/components/project-form'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Admin | News",
};
const NewProjectPage = () => {
  return (
    <div><ProjectForm type='Create'/></div>
  )
}

export default NewProjectPage