"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

const slides = ["One", "Two", "Three", "Four", "Five"];

export default function CarouselMultipleSlides() {
  return (
    <div className="w-full max-w-sm px-12">
      <Carousel opts={{ slidesToScroll: 2 }}>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label} className="basis-1/2">
              <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-xl font-semibold">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
