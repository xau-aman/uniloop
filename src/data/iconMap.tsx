import React from "react";
import {
  IconCode, IconPalette, IconCpu, IconTheater, IconTrophy,
  IconMusic, IconRocket, IconCamera, IconMegaphone, IconBarChart,
  IconMic, IconTarget, IconRun, IconCalendar, IconActivity,
} from "../components/Icons";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  code: IconCode,
  palette: IconPalette,
  cpu: IconCpu,
  theater: IconTheater,
  trophy: IconTrophy,
  music: IconMusic,
  rocket: IconRocket,
  camera: IconCamera,
  megaphone: IconMegaphone,
  barchart: IconBarChart,
  mic: IconMic,
  target: IconTarget,
  run: IconRun,
  calendar: IconCalendar,
  activity: IconActivity,
};

export const getIcon = (key: string, size = 24, className?: string) => {
  const Icon = iconMap[key];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
};
