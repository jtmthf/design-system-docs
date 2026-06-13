"use client";

import { Slider } from "@workspace/ui/components/slider";

export default function SliderDemo() {
  return (
    <div className="w-64">
      <Slider defaultValue={[40]} />
    </div>
  );
}
