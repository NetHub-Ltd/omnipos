// "use client";

// import { useSearchParams } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { KeyRound, ArrowRight } from "lucide-react";

// /**
//  * CLIENT COMPONENT: High-performance, conversion-focused login trigger.
//  * Designed according to Fitts's Law for rapid touch-target acquisition.
//  */
// export default function LoginButton() {
//   const searchParams = useSearchParams();

//   // UX Logic: Persistent context navigation via callbackUrl
//   const callbackUrl = searchParams.get("callbackUrl") || "/terminal";

//   const handleLogin = async () => {
//     await signIn("keycloak", { callbackUrl });
//   };

//   return (
//     <button
//       onClick={handleLogin}
//       className="group relative flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
//       aria-label="Sign in with NetHub"
//     >
//       <KeyRound size={18} aria-hidden="true" />
//       <span>Sign In with NetHub</span>
//       <ArrowRight
//         size={18}
//         className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
//         aria-hidden="true"
//       />
//     </button>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { KeyRound, ArrowRight } from "lucide-react";

/**
 * CLIENT COMPONENT: High-performance, conversion-focused login trigger.
 *
 * Logic: Uses Next-Auth to initiate OAuth flow.
 * UX: Optimized for Fitts's Law with a substantial 56px height.
 */
export default function LoginButton() {
  const searchParams = useSearchParams();

  // UX Logic: Persistent context navigation.
  // Redirects user back to their intended destination post-auth.
  const callbackUrl = searchParams.get("callbackUrl") ?? "/terminal";

  const handleLogin = async () => {
    try {
      await signIn("keycloak", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Authentication Initiation Failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      type="button"
      className="group relative flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label="Sign in with NetHub"
    >
      <KeyRound size={18} aria-hidden="true" />
      <span className="relative z-10">Sign In with NetHub</span>
      <ArrowRight
        size={18}
        className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
        aria-hidden="true"
      />
    </button>
  );
}