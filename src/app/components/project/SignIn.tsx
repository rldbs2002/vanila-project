"use client";

import React, { useRef, useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import Link from "next/link";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignIn() {
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      console.log(res);
      setProviders(res);
    })();
  }, []);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    // console.log(emailRef.current);
    // console.log(passwordRef.current);

    const result = await signIn("credentials", {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGoogle = async () => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : "http://localhost:3000/api";

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
      <h1 className="text-4xl font-semibold">Sign In</h1>
      <div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-800">
            Email
          </label>

          <div className="mt-1">
            <input
              ref={emailRef}
              onChange={(e: any) => {
                emailRef.current = e.target.value;
              }}
              id="email"
              name="email"
              type="email"
              required
              autoFocus={true}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-sm text-gray-800">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              onChange={(e: any) => (passwordRef.current = e.target.value)}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            Sign In
          </button>
        </div>

        <div className="mt-4 text-gray-800">
          <Link href="/signup">
            <Typography>Want to sign up?</Typography>
          </Link>
        </div>
      </div>
      <div>
        <button
          className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: `${apiUrl}/auth/callback/google`,
            })
          }
        >
          Google SignIn
        </button>
      </div>
    </main>
  );
}

export default SignIn;
