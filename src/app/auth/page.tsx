"use client";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton"
import SignInForm from "@/components/auth/SignInForm"
import SignUpForm from "@/components/auth/SignUpForm"
import AuthCard from "@/components/auth/AuthCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPage = () => {
  return (
    <main className='flex w-full h-screen bg-background'>
      <div className='w-full md:w-1/2 mx-auto flex items-center justify-center'>
        <Card className="w-full max-w-md h-auto">
          <CardHeader>
            <CardTitle>Auth Form</CardTitle>
            <CardDescription>
              Please SignUp or SignIn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthCard SignUpTabContent={<SignUpForm />} SignInTabContent={<SignInForm />} />
            <GoogleOAuthButton />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default AuthPage
