import { useRouter } from "next/router";
import { requireAuth } from "../../../common/requireAuth";

import Navbar from "../../../components/navbar";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <main>
      <Navbar></Navbar>
    </main>
  );
};

export default Profile;
