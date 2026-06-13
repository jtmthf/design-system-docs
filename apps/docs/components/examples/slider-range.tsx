"use client";

import { Slider } from "@workspace/ui/components/slider";

export default function SliderRange() {
  return (
    <div className="w-64">
      <Slider defaultValue={[20, 70]} />
    </div>
  );
}
