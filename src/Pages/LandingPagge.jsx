import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BriefcaseBusiness, SquareUser } from "lucide-react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const LandingPage = () => {
  return (
    <div>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <section className="text-center">
          <h1 className=" gradient gradient-title text-center text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter py-4">
            Find Your Dream Job{" "}
            <span className="flex justify-center items-center gap-2 sm:gap-6">
              and get <img src="/logo.png" className="h-14 sm:h-20 lg:h-34" />
            </span>
          </h1>
          <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
            Find your dream job with our platform. Join our community of
            developers and get hired.
          </p>
        </section>
        <div className="flex justify-center gap-4">
          <Link to="/JobListing">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </Link>
          <Link to="/postjobs">
            <Button variant="destructive" size="xl">
              Post Jobs
            </Button>
          </Link>
        </div>
        <Carousel
          className="w-full py-10"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div>
          <img src="/banner.jpeg" alt="" className="w-full" />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center text-center">
          <div className="flex justify-center items-center">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-2xl">
                  For Job Seekers
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center mb-2">
                  <BriefcaseBusiness className="h-20 w-20" />{" "}
                  {/* Adjust size as needed */}
                </div>
                <p>Search and apply for jobs that match your qualifications.</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-2xl">
                  For Employers
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center mb-2">
                  <SquareUser className="h-20 w-20" />{" "}
                  {/* Adjust size as needed */}
                </div>
                <p>Post jobs, manage applications, and get best candidates.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <div>
          <Accordion type="multiple" className="w-full  ">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="flex justify-between items-center p-4 cursor-pointer  transition-colors rounded-md hover:underline">
                  <span className="font-medium text-gray-200">
                    {faq.question}
                  </span>

                  {/* Replace with an icon if desired */}
                </AccordionTrigger>
                <AccordionContent className="p-4  text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
