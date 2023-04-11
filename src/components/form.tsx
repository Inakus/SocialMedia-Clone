import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";

import { IForm } from "../interface/interface";

const Form = ({ type, giveData, trpcError }: IForm) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState(false);

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    giveData(name, email, password);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    giveData(email, password);
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

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

  if (type === "LOGIN") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center sm:px-20">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Type your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Type your email here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered "
                  />
                  <label className="label">
                    <Link href="/signup">
                      <a className="label-text-alt link link-hover">
                        {"Don't have account? Register now."}
                      </a>
                    </Link>
                  </label>
                </div>
                {trpcError && (
                  <span className="text-red-500">Something went wrong</span>
                )}
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "SIGNUP") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center sm:px-20">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSignup}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type your username here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Type your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Type your email here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered "
                  />
                  <label className="label">
                    <Link href="/signin">
                      <a className="label-text-alt link link-hover">
                        Already have account? Log in.
                      </a>
                    </Link>
                  </label>
                </div>
                {trpcError && (
                  <span className="text-red-500">Account already exists</span>
                )}
                <div className="form-control mt-6">
                  <button disabled={error} className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Form;
