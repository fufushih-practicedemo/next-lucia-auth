import React from 'react'
import { Button } from '@/components/ui/button'
import { RiGoogleFill } from '@remixicon/react';

const GoogleOAuthButton = () => {
  return (
    <Button onClick={() => {
      
    }}>
      <RiGoogleFill className='size-4 mr-2' /> Login with Google
    </Button>
  )
}

export default GoogleOAuthButton
