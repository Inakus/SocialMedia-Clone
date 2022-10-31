import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { trpc } from "../common/trpc";

const Signup: NextPage = () => {
  const signup = trpc.user.signup.useMutation();

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState(false);

  const handleSignup = () => {
    onSubmit();
  };

  const onSubmit = useCallback(async () => {
    try {
      const result = await signup.mutateAsync({
        username: name,
        email: email,
        password: password,
      });
      if (result.status === 201) {
        setEmail("");
        setPassword("");
        setName("");
        router.push("/signin");
      }
    } catch (err) {
      console.error(err);
    }
  }, [signup, router, email, name, password]);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else if (!isValidEmail(email)) {
      setError(true);
    } else if (password.length < 4) {
      setError(true);
    } else {
      setError(false);
    }
  }, [email, name, password]);

  return (
    <main>
      {/* <div className="flex justify-center items-center flex-col gap-4 h-screen">
        <div className="form-control">
          <label className="input-group input-group-lg">
            <span>Username</span>
            <input
              type="text"
              placeholder="Type your username here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered "
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-lg">
            <span>Email</span>
            <input
              type="email"
              placeholder="Type your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered "
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-lg">
            <span>Password</span>
            <input
              type="password"
              placeholder="Type your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
            />
          </label>
        </div>
        <button
          className={error ? "cursor-not-allowed btn " : "btn btn-wide"}
          disabled={error}
          onClick={handleSignup}
        >
          Sign up
        </button>
        {signup.isError && (
          <span className="text-red-500">{signup.error.message}</span>
        )}
        <span>
          Already have account{" "}
          <Link href="/signin">
            <a className="text-blue-500 hover:text-blue-300">Sign in</a>
          </Link>
        </span>
      </div> */}
    </main>
  );
};

export default Signup;
