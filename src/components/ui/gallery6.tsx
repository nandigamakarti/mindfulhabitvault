"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GradientText } from "@/components/ui/gradient-text";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Habit Development Resources",
  demoUrl = "/blog",
  items = [
    {
      id: "item-1",
      title: "The Science of Habit Formation",
      summary: "Learn about the psychology behind habit formation and how to leverage it for lasting change.",
      url: "/blog/science-of-habits",
      image: "https://miro.medium.com/v2/resize:fit:1400/1*JEBbOEaWI25JQKOQczi_TA.png"
    },
    {
      id: "item-2",
      title: "Building Morning Routines",
      summary: "Discover how to create effective morning routines that set you up for success throughout the day.",
      url: "/blog/morning-routines",
      image: "https://www.proofhub.com/articles/wp-content/uploads/2024/04/best-morning-routine-ideas-for-a-productive-day.jpg"
    },
    {
      id: "item-3",
      title: "Breaking Bad Habits",
      summary: "Practical strategies for identifying and overcoming negative habits that hold you back.",
      url: "/blog/breaking-bad-habits",
      image: "https://horizon-health.org/app/uploads/2019/05/AdobeStock_68916283-scaled.jpeg"
    },
    {
      id: "item-4",
      title: "Habit Stacking Guide",
      summary: "Learn how to build new habits by stacking them onto existing ones for better consistency.",
      url: "/blog/habit-stacking",
      image: "https://www.wellable.co/blog/wp-content/uploads/2024/01/Habit-Loop-Final.png"
    },
    {
      id: "item-5",
      title: "Tracking Progress Effectively",
      summary: "Master the art of habit tracking to maintain motivation and measure your success.",
      url: "/blog/habit-tracking",
      image: "https://i.etsystatic.com/19226491/r/il/06bebd/3723009444/il_fullxfull.3723009444_iqfq.jpg"
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              <GradientText>{heading}</GradientText>
            </h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              View all articles
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold md:mb-3 md:text-2xl">
                    <GradientText>{item.title}</GradientText>
                  </h3>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm">
                    Read article{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 }; 