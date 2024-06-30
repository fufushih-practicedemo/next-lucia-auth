import SignInForm from "@/components/SignInForm"
import SignUpForm from "@/components/SignUpForm"
import TabSwitcher from "@/components/TabSwitcher"

const AuthPage = () => {
  return (
    <div className='relative flex w-full h-screen bg-background'>
      <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <TabSwitcher SignUpTabContent={<SignUpForm />} SignInTabContent={<SignInForm />} />
        <div className="h-4"></div>
      </div>
    </div>
  )
}

export default AuthPage
