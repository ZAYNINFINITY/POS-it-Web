"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero.js"), { ssr: false, loading: () => null });

export default function HeroClient(props) {
  return <Hero {...props} />;
}
