"use client";

import { Slider } from "@workspace/ui/components/slider";

export default function SliderDisabled() {
  return (
    <div className="w-64">
      <Slider defaultValue={[60]} disabled />
    </div>
  );
}
