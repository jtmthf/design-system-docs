"use client";

import { Slider } from "@workspace/ui/components/slider";

export default function SliderStepped() {
  return (
    <div className="w-64">
      <Slider defaultValue={[30]} step={10} />
    </div>
  );
}
