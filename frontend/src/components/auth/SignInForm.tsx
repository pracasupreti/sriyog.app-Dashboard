"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader, LogIn, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
	const SignInForm = () => {
		const [showPassword, setShowPassword] = useState(false);
		const [password, setPassword] = useState('');
		const [email, setEmail] = useState('');
		const [isSubmitting, setIsSubmitting] = useState(false);
		const { login } = useAuthStore();
		// const router = useRouter();

		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsSubmitting(true);
			
			try {
				const result = await login(email, password);
				if (result.success) {
					// router.replace("/");
					setIsSubmitting(false)
				} else {
					setIsSubmitting(false);
				}
			} catch (error) {
				console.error('Login error:', error);
				setIsSubmitting(false);
			}
		}

		// Only show loading during actual submission, not initial load
		const showLoading = isSubmitting;
		return (
			<div className="min-h-screen w-full flex items-center justify-center ">
				<div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center" style={{ minWidth: 320 }}>
				{/* Logo Placeholder */}
				<div className="w-12 h-12 rounded-full bg-[#8B1C1C] flex items-center justify-center mb-4">
					{/* Replace src with your logo later */}
					<Image
						src="/images/defaultlogo.png"
						alt="Logo"
						width={32}
						height={32}
						className="w-8 h-8 object-contain"
					/>
				</div>
				<h2 className="text-lg font-bold text-center mb-1">Admin Login</h2>
				<p className="text-center text-gray-600 mb-4 text-sm">Sign in to SRIYOG App Dashboard</p>
							<form className="w-full" onSubmit={handleSubmit}>
								<div className="mb-4">
									<label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
							<span>
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a.5.5 0 0 1-.757.429l-6.243-3.746-6.243 3.746A.5.5 0 0 1 4 19.5v-15Z" stroke="#8B1C1C" strokeWidth="1.5"/><path d="M8 7h8M8 11h8" stroke="#8B1C1C" strokeWidth="1.5" strokeLinecap="round"/></svg>
							</span>
							eMail Address
						</label>
						<input
							type="email"
							placeholder="Enter your admin eMail"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1C1C]"
							required
						/>
					</div>
									<div className="mb-2">
										<label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
							<span>
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
									<path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="#8B1C1C" strokeWidth="1.5"/>
									<path d="M17 10V7a5 5 0 1 0-10 0v3" stroke="#8B1C1C" strokeWidth="1.5"/>
									<rect x="5" y="10" width="14" height="10" rx="2" stroke="#8B1C1C" strokeWidth="1.5"/>
								</svg>
							</span>
							Security Key
						</label>
						<div className="relative mt-2">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your Security Key"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1C1C] pr-10"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 hover:bg-gray-100 rounded"
								onClick={() => setShowPassword(!showPassword)}
								aria-label="Toggle Security Key visibility"
							>
								{showPassword ? (
									<Eye size={18} className="text-[#8B1C1C]" />
								) : (
									<EyeOff size={18} className="text-[#8B1C1C]" />
								)}
							</button>
						</div>
					</div>
					<div className="flex justify-end mb-4">
						<Link href="#" className="text-sm text-gray-700 hover:underline">Forgot Password!!</Link>
					</div >
					<div className="flex items-center justify-end">
						<button
							type="submit"
							disabled={showLoading}
							className="w-fit flex items-center justify-end px-4 gap-2 bg-[#8B1C1C] hover:bg-[#a83232] disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg text-base transition-colors mb-1 disabled:cursor-not-allowed"
						>
							{showLoading ? (
								<Loader className="w-5 h-5 animate-spin" />
							) : (
								<LogIn className="w-5 h-5" />
							)}
							{showLoading ? 'Signing in...' : 'Login'}
						</button>
					</div>

							</form>
							<div className="mt-3 text-center text-xs text-gray-700">
								Don’t have an account ?{' '}
								<Link href="#" className="text-[#8B1C1C] font-semibold hover:underline">Sign Up Here</Link>
							</div>
						</div>
					</div>
				);
			};

			export default SignInForm;
