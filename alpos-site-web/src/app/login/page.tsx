"use client";

import { AxiosError } from "axios";
import React from "react";
import { api } from "../../api";
import { AuthContext } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Button } from "@WASPtheGeek/base-components";

export default function LoginForm() {
  const [user, setInputUser] = React.useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { setUser } = React.useContext(AuthContext);
  const router = useRouter();

  const login = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setSubmitting(true);

    api
      .post("/auth/login", {
        email: user?.email,
        password: user?.password,
      })
      .then((res) => res.data.user)
      .then(setUser)
      .then(() => router.push("/admin"))
      .catch((e: AxiosError) =>
        //   todo: add handler
        setError((e.response?.data as any)?.message ?? e.message)
      )
      .finally(() => setSubmitting(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputUser({ ...user, [name]: value });
  };

  return (
    <main className="max-h-screen ">
      <form
        onSubmit={login}
        className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-2 mt-20"
      >
        <h2 className="text-5xl">Login</h2>
        <input
          type="text"
          name="email"
          disabled={submitting}
          value={user?.email}
          onChange={handleInputChange}
          className="bg-transparent border rounded-lg outline-none p-2 w-full"
          placeholder="Enter Username"
        />
        <input
          type="text"
          name="password"
          disabled={submitting}
          value={user?.password}
          onChange={handleInputChange}
          className="bg-transparent border rounded-lg outline-none p-2 w-full"
          placeholder="Enter Password"
        />
        {error && <div>{error}</div>}
        <Button
          disabled={submitting}
          type="submit"
          className="p-2 border rounded-lg hover:bg-slate-200 hover:text-black transition-colors duration-300 w-full"
        >
          Login
        </Button>
      </form>
    </main>
  );
}
