import { NextPage } from "next";
import Form from "../components/form";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";

const SignIn: NextPage = () => {
  const [error, setError] = useState<boolean>(false);

  const handleLogin = async (newEmail: string, newPassword: string) => {
    await onSubmit(newEmail, newPassword);
  };
  const onSubmit = useCallback(async (email: string, password: string) => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard/home",
      });
    } catch (err) {
      setError(true);
      console.error(err);
    }
  }, []);
  return (
    <main>
      <Form type={"LOGIN"} giveData={handleLogin} trpcError={error} />
    </main>
  );
};

export default SignIn;
