'use client';

import { useAuthStore } from '@/store/authStore';
import { JSX, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ForgetPasswordPage(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  // const setIsModalOpen = useUserStore((state) => state.setIsModalOpen)
  const { forgetPassword, isresetLinkSending } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email.')
      return
    }
    try {
      await forgetPassword(email)
      // toast.success('Password reset email sent. Please check your inbox.')
    } catch (error: unknown) {
      console.error('Error sending password reset email', error)
      toast.error('Failed to send password reset email. Please try again.')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex h-full min-h-[40vh] w-full items-center justify-center px-2 sm:px-4 my-7 bg-background">
      <div className="mx-auto w-[80%] max-w-md rounded-xl  bg-card text-card-foreground shadow-lg dark:shadow-xl dark:bg-gray-800">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h1 className="text-2xl font-semibold leading-none tracking-tight dark:text-white ">
            Forgot Password
          </h1>
          <p className="text-md text-muted-foreground dark:text-white">
            Enter your email address to receive a password reset link.
          </p>
        </div>
        <div className="py-6 px-2 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-foreground dark:text-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@mail.com"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                className="flex h-10 w-full rounded-md border dark:text-white border-gray-100   px-3 py-2 text-md  "
                required
              />
            </div>
            <button
              type="submit"
              disabled={isresetLinkSending}
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center whitespace-nowrap text-white rounded-md bg-primary px-4 py-2 text-md disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isresetLinkSending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full  border-2 border-current border-t-transparent"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          {/* Optional: Add a back to login link */}
          <div className="mt-6 text-center">
            <Link 
              href="/signin"
              className="text-md text-muted-foreground hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline dark:text-white"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}