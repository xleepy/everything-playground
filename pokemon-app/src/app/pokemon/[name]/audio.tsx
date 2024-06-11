"use client";

import { useEffect, useRef } from "react";

type AudioProps = {
  label: string;
  source: string;
  initialVolume?: number;
};

export const Audio = ({ label, source, initialVolume = 0.05 }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const { current } = audioRef;
    if (!current) {
      return;
    }
    current.volume = initialVolume;
  }, [initialVolume]);

  return (
    <figure>
      <figcaption>Listen to the {label}</figcaption>
      <audio ref={audioRef} controls src={source} />
    </figure>
  );
};
