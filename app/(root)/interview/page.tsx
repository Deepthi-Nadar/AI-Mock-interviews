import InterviewForm from "@/components/InterviewForm";
import Nav from "@/components/Nav";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <Nav />
      <h3>Interview creation</h3>

      <InterviewForm userId={user?.id!} />
    </>
  );
};

export default Page;
