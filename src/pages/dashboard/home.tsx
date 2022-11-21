import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { requireAuth } from "../../common/requireAuth";
import Card from "../../components/card";

import Navbar from "../../components/navbar";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <main>
      <Navbar currentUserId={data?.user.userId}></Navbar>
      <div className="flex w-full min-h-screen pt-16">
        <div className="grid flex-grow card rounded-box place-items-center">
          content
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid flex-grow card place-items-center">
          <Card
            userName="test"
            title="Test"
            content="asdnjasdfgbjhgbfdjsaklfbhjbdfhkjs a fhds vafasdj fhusadvfg ag fadhsfghkvads df sa"
          />
          <Card
            userName="test"
            title="Test"
            content="asdnjasdfgbjhgbfdjsaklfbhjbdfhkjs a fhds vafasdj fhusadvfg ag fadhsfghkvads df sa"
          />
          <Card
            userName="test"
            title="Test"
            content="asdnjasdfgbjhgbfdjsaklfbhjbdfhkjs a fhds vafasdj fhusadvfg ag fadhsfghkvads df sa"
          />
          <Card
            userName="test"
            title="Test"
            content="asdnjasdfgbjhgbfdjsaklfbhjbdfhkjs a fhds vafasdj fhusadvfg ag fadhsfghkvads df sa"
          />
          <Card
            userName="test"
            title="Test"
            content="asdnjasdfgbjhgbfdjsaklfbhjbdfhkjs a fhds vafasdj fhusadvfg ag fadhsfghkvads df sa"
          />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid flex-grow card place-items-center">content</div>
      </div>
      {/* <Search /> */}
    </main>
  );
};

export default Home;
