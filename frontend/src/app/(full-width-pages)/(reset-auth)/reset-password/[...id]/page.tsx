'use client';

import { JSX, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import {  useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast';

interface PasswordInputProps {
  id: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const toggleVisibility = (): void => setShowPassword(!showPassword)

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-md  file:border-0 file:bg-transparent file:text-md file:font-medium placeholder:text-muted-foreground  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors dark:text-white"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-white text-muted-foreground hover:text-foreground transition-colors"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}


export default  function ResetPasswordPage(){
  const {id}:{id:[string]} = useParams();
  const token=id[0];  
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const router = useRouter();
  const { resetPassword, isResettingPassword } = useAuthStore();
  


  console.log('Passwords:', { password, confirmPassword });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      // You might want to use toast here
      toast.error('Passwords do not match!');
      return;
    }
    
    if (!token) {
      toast.error('Invalid reset token!');
      return;
    }
    
    try {
      await resetPassword(token, password, confirmPassword);
      router.push('/signin');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex h-full min-h-[50vh] w-full items-center justify-center px-2 sm:px-4 my-7 ">
      <div className="mx-auto w-[90%] sm:w-[80%] max-w-md rounded-xl  shadow-lg dark:shadow-xl dark:bg-gray-900/[0.003]">
        <div className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight dark:text-white">
            Reset Password
          </h1>
          <p className="text-md dark:text-white">
            Enter your new password to reset your password.
          </p>
        </div>
        <div className="py-6 px-2 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label
                  htmlFor="password"
                  className="text-md font-medium leading-none dark:text-white "
                >
                  New Password
                </label>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="grid gap-3">
                <label
                  htmlFor="confirmPassword"
                  className="text-md font-medium leading-none dark:text-white "
                >
                  Confirm Password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="******"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isResettingPassword || !password || !confirmPassword}
                className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap cursor-pointer rounded-md bg-primary text-white px-4 py-2 text-md font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResettingPassword ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
          
          {/* Back to login link */}
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