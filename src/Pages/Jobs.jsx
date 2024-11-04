import { getApplications } from "@/api/apiApplication";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ApplicationCard";
import ApplyJob from "@/components/Apply-job";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/Fetch-jobs";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const {
    loading: loadingApplications,
    data: Applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
      fnApplications(); // Fetch applications when the component mounts
    }
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJobs());
    toast({
      title: "Hiring Status Updated",
      description: "Hiring status has been updated successfully",
      variant: "success",
      className: "bg-gray-600",
    });
  };

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {jobs?.title}
        </h1>
        <img src={jobs?.company?.logo_url} className="h-12" alt={jobs?.title} />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon /> {jobs?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {Applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {jobs?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${jobs?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (jobs?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold gradient-title">
        About the job
      </h2>
      <p className="sm:text-lg">{jobs?.description}</p>

      <h2>What we are looking for</h2>
      <ReactMarkdown className="bg-transparent sm:text-lg">
        {jobs?.requirements || ""}
      </ReactMarkdown>

      {/* Apply for the job */}
      {jobs?.recruiter_id !== user?.id && (
        <ApplyJob
          job={jobs}
          user={user}
          fetchJob={fnJobs}
          applied={Applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {/* Render applications list if the user is the recruiter */}
      {Applications && jobs?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {Applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;
