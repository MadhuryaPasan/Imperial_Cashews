"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowBigDown,
  ChartBarIncreasingIcon,
  Database,
  Dot,
  Fingerprint,
  IdCard,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";

const whyYouChooseus = () => {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images = {
    "item-1": {
      image:
        "https://images.pexels.com/photos/16032282/pexels-photo-16032282/free-photo-of-yellow-cashew-apples-on-a-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Database visualization",
    },
    "item-2": {
      image:
        "https://images.pexels.com/photos/7717492/pexels-photo-7717492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Security authentication",
    },
    "item-3": {
      image:
        "https://images.pexels.com/photos/7844012/pexels-photo-7844012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Identity management",
    },
    "item-4": {
      image:
        "https://images.pexels.com/photos/7844012/pexels-photo-7844012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Identity management",
    },
  };

  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]"></div>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-bold lg:text-6xl">
            Why Choose Us
          </h2>
          <p className="text-lg opacity-80">
            We take pride in delivering the highest quality cashew nuts with
            exceptional service.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-lg">
                  <Dot />
                  100% Natural
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[15px] opacity-80">
                Our cashews are grown naturally without harmful chemicals or
                pesticides.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-lg">
                  <Dot />
                  Quality Guaranteed
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[15px] opacity-80">
                Every batch is carefully inspected to ensure premium quality and
                freshness.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-lg">
                  <Dot />
                  Fast Delivery
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[15px] opacity-80">
                We ship within 24 hours to ensure you receive the freshest
                cashews possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]"></div>
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-id`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  <img
                    src={images[activeItem].image}
                    className="size-full object-cover object-left-top dark:mix-blend-lighten"
                    alt={images[activeItem].alt}
                    width={1207}
                    height={929}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <BorderBeam
              duration={6}
              size={200}
              className="from-transparent via-yellow-700 to-transparent dark:via-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default whyYouChooseus;
