import {NextPage} from "next";
import {signOut, useSession} from "next-auth/react";
import {requireAuth} from "../../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
    return {props: {}};
});

const Home: NextPage = () => {
    const {data} = useSession()

    return (<>
            <h1>Hello {data?.user.username}</h1>
            <button className="btn" onClick={() => signOut({callbackUrl: "/"})}>Log out</button>
        </>
    )
}

export default Home