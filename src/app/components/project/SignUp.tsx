"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Autocomplete, Grid, TextField } from "@mui/material";
import countryList from "@/app/data/countryList";
import { useSession } from "next-auth/react";

// Functional component for SignUpForm
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState(countryList[229]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    // 로그인 상태 확인
    if (status === "authenticated") {
      // 이미 로그인 되어 있으면 홈페이지로 리디렉트
      router.push("/");
    }
  }, [session, status, router]);

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const requestData = {
      address_info: {
        firstname: firstname,
        lastname: lastname,
        country: country,
        address: address,
        city: city,
        state: state,
        postal_code: postal_code,
        phone: phone,
      },
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          requestData,
        }),
      });

      if (res.status === 200) {
        router.push("/signin");
      } else {
        setError("Something went wrong!");
      }
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center space-y-10 p-24">
      <h1 className="text-4xl font-semibold">Sign Up</h1>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-800">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm text-gray-800"
                >
                  firstname
                </label>
                <input
                  type="firstname"
                  id="firstname"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm text-gray-800"
                >
                  lastname
                </label>
                <input
                  type="lastname"
                  id="lastname"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm text-gray-800"
                >
                  Country
                </label>
                <select
                  id="country"
                  required
                  value={country.label}
                  onChange={(e) => {
                    const selectedCountry = countryList.find(
                      (c) => c.label === e.target.value
                    );
                    if (selectedCountry) {
                      setCountry(selectedCountry);
                    } else {
                      setCountry({ label: "", value: "" }); // 선택한 국가가 없을 경우 빈 객체로 설정
                    }
                  }}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {countryList.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-800"
                >
                  address
                </label>
                <input
                  type="address"
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <div>
                <label htmlFor="city" className="block text-sm text-gray-800">
                  city
                </label>
                <input
                  type="city"
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div>
                <label htmlFor="state" className="block text-sm text-gray-800">
                  state
                </label>
                <input
                  type="state"
                  id="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item sm={6} xs={12}>
              <div>
                <label
                  htmlFor="postal_code"
                  className="block text-sm text-gray-800"
                >
                  postal_code
                </label>
                <input
                  type="postal_code"
                  id="postal_code"
                  required
                  value={postal_code}
                  onChange={(e) => setpostal_code(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-800">
                  phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </div>
            </Grid>
          </Grid>

          <div className="mt-4 text-gray-800 flex justify-center items-center">
            <button
              type="submit"
              className="transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-gray-800 flex justify-center items-center">
          <Link href="/signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
