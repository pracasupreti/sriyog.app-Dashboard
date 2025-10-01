// "use client";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { user, isLoading, isAuthenticated } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push('/signin');
//     }
//   }, [isAuthenticated, isLoading, router]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-12 h-12 border-4 border-[#8B1C1C] border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// }
"use client";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !user) {
      router.replace('/signin'); // Redirect to /signin if not authenticated
    }
  }, [isAuthenticated, isLoading, router, user]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="flex flex-col items-center space-y-4">
  //         <div className="w-12 h-12 border-4 border-[#8B1C1C] border-t-transparent rounded-full animate-spin"></div>
  //         <p className="text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!isAuthenticated) {
    // Redirect happens in useEffect above, so just return null here
    return (
      <div className="h-screen w-full bg-red-200">
        <Loader className="w-12 h-12 animatespin" />
      </div>
    )
  }

  return <>{children}</>;
}