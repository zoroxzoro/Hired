import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import propTypes from "prop-types";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/Fetch-jobs";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import { toast } from "@/hooks/use-toast";
function ApplyJob({ user, job, applied = false, fetchJob }) {
  const schema = z.object({
    experience: z
      .number()
      .min(1, { message: "Minimum year of experience is 1" }),
    skills: z.string().min(1, { message: "Please enter some skills" }),
    education: z.enum(["Intermediate", "Graduate", "Post-Graduate"], {
      message: "Please select an education level",
    }),
    resume: z
      .any()
      .refine(
        (file) =>
          file[0] &&
          (file[0].type === "application/pdf" ||
            file[0].type === "application/msword"),
        { message: "Only Pdf and Docx files are allowed" }
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const ApplySubmit = async (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      toast({
        title: "Success",
        description: "Job Applied Successfully",
      });
      fetchJob();
      reset();
    });
  };
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below</DrawerDescription>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit(ApplySubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            placeholder="Year of Experience"
            type="number"
            className="flex-1 rounded-md h-full"
            {...register("experience", { valueAsNumber: true })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors?.experience?.message}</p>
          )}
          <Input
            placeholder="Skills (comma separated)"
            type="text"
            className="flex-1"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup defaultValue="Intermediate" {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="Intermediate" />
                  <Label htmlFor="Intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="Graduate" />
                  <Label htmlFor="Graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post-Graduate" id="Post-Graduate" />
                  <Label htmlFor="Post-Graduate">Post-Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex-1 rounded-md h-full file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

ApplyJob.propTypes = {
  user: propTypes.object,
  job: propTypes.shape({
    title: propTypes.string,
    isOpen: propTypes.bool,
    company: propTypes.shape({
      name: propTypes.string,
      logo_url: propTypes.string,
    }),
  }),
  applied: propTypes.bool,
  fetchJob: propTypes.func,
};

export default ApplyJob;
