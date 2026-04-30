// Schema mirrors what we'll request from DataGolf later so we can swap source
// without touching the components. Coordinates are in yards relative to the
// front-center of the green at (0, 0). +y = toward back of green, +x = right.

export type ShotOutcome = "birdie" | "par" | "bogey" | "double+" | "water";

export interface Shot {
  id: string;
  player: string;
  year: number;
  pin: "sunday" | "thursday" | "friday" | "saturday";
  // Landing position of the approach shot, in yards from green-front-center.
  landing: { x: number; y: number };
  // Tee position relative to same origin. Negative y = behind/short of green.
  tee: { x: number; y: number };
  outcome: ShotOutcome;
  carryYds: number;
  club: string;
}

export interface StrokesGained {
  offTheTee: number;
  approach: number;
  aroundGreen: number;
  putting: number;
  total: number;
}

export interface HoleData {
  holeId: string;
  course: string;
  holeNumber: number;
  par: number;
  yardage: number;
  greenWidthYds: number;
  greenDepthYds: number;
  shots: Shot[];
  fieldStrokesGained: StrokesGained; // PGA Tour field average for this hole
}
