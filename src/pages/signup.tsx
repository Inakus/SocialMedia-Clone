import {NextPage} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import {useCallback} from "react";
import {trpc} from "../common/trpc";
import Form from "../components/form";

const Signup: NextPage = () => {
    const signup = trpc.user.signup.useMutation();

    const router = useRouter();

    const handleSignup = async (newName: string, newEmail: string, newPassword: string) => {
        await onSubmit(newName, newEmail, newPassword);
    };

    const onSubmit = useCallback(async (name: string, email: string, password: string) => {
        try {
            const result = await signup.mutateAsync({
                username: name,
                email: email,
                password: password,
            });
            if (result.status === 201) {
                await router.push("/");
            }
        } catch (err) {
            console.error(err);
        }
    }, [signup, router,]);

    return (
        <main>
            <Form type={"SIGNUP"} giveData={handleSignup} trpcError={signup.isError}/>
        </main>
    );
};

export default Signup;
