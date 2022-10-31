import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { trpc } from "../common/trpc";

interface IForm {
  type: Type;
}

enum Type {
  register = "REGISTER",
  login = "LOGIN",
}

const Form = ({ type }: IForm) => {
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

  if (type === "LOGIN") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
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
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link href="/signup">
                    <a className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "REGISTER") {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link href="/signin">
                    <a className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Form;
