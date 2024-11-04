import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (user?.unsafeMetadata.role) {
      navigate(
        user?.unsafeMetadata.role === "candidate" ? "/jobs" : "/postjobs"
      );
    }
  }, [user]);

  if (!isLoaded)
    return <BarLoader color="#36d7b7" width={"100%"} className="mb-4" />;

  const handleRole = async (role) => {
    await user.update({ unsafeMetadata: { role } }).then(() => {
      navigate(role === "candidate" ? "/JobListing" : "/postjobs");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a......
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mt-16 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl rounded-2xl"
          onClick={() => handleRole("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl rounded-2xl"
          onClick={() => handleRole("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
