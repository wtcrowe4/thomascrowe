import type { HoleData } from "@/lib/types";

// Illustrative shot data for TPC Sawgrass No. 17 (Players Championship).
// Distances and dispersion patterns are realistic but not real Shotlink rows —
// swap this file for a DataGolf-backed loader when the API key is wired up.
// Origin: front-center of green. +x = right looking down the shot line.
// Green is roughly 26 yds wide x 28 yds deep. Tee plays ~137 yds.

export const sawgrass17: HoleData = {
  holeId: "tpc-sawgrass-17",
  course: "TPC Sawgrass — Stadium Course",
  holeNumber: 17,
  par: 3,
  yardage: 137,
  greenWidthYds: 26,
  greenDepthYds: 28,
  fieldStrokesGained: {
    offTheTee: 0.0,
    approach: -0.18,
    aroundGreen: 0.04,
    putting: 0.02,
    total: -0.12,
  },
  shots: [
    // Tight Sunday pin (front-right) — clustered short and right
    { id: "s1", player: "Scheffler", year: 2024, pin: "sunday", landing: { x: 4, y: 6 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 134, club: "PW" },
    { id: "s2", player: "McIlroy", year: 2024, pin: "sunday", landing: { x: 6, y: 4 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 136, club: "PW" },
    { id: "s3", player: "Schauffele", year: 2024, pin: "sunday", landing: { x: 2, y: 9 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 137, club: "PW" },
    { id: "s4", player: "Cantlay", year: 2024, pin: "sunday", landing: { x: 8, y: 2 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 132, club: "GW" },
    { id: "s5", player: "Rahm", year: 2024, pin: "sunday", landing: { x: -3, y: 7 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 135, club: "PW" },
    { id: "s6", player: "Spieth", year: 2024, pin: "sunday", landing: { x: 14, y: -3 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 130, club: "GW" },
    { id: "s7", player: "Hovland", year: 2024, pin: "sunday", landing: { x: 5, y: 11 }, tee: { x: 0, y: -137 }, outcome: "bogey", carryYds: 140, club: "PW" },
    { id: "s8", player: "Morikawa", year: 2024, pin: "sunday", landing: { x: 3, y: 5 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 135, club: "PW" },
    { id: "s9", player: "Finau", year: 2024, pin: "sunday", landing: { x: -8, y: 14 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 142, club: "9I" },
    { id: "s10", player: "Theegala", year: 2024, pin: "sunday", landing: { x: 1, y: 8 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 137, club: "PW" },
    // Center-back pin spread (Thursday) — wider dispersion, more long misses
    { id: "t1", player: "Im", year: 2023, pin: "thursday", landing: { x: 0, y: 13 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 140, club: "PW" },
    { id: "t2", player: "Henley", year: 2023, pin: "thursday", landing: { x: -4, y: 18 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 145, club: "9I" },
    { id: "t3", player: "Pereira", year: 2023, pin: "thursday", landing: { x: 11, y: 9 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 138, club: "PW" },
    { id: "t4", player: "Niemann", year: 2023, pin: "thursday", landing: { x: 2, y: 16 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 143, club: "PW" },
    { id: "t5", player: "Burns", year: 2023, pin: "thursday", landing: { x: -10, y: 5 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 134, club: "PW" },
    // Front-left pin (Friday) — biggest carnage zone, lots of water
    { id: "f1", player: "JT", year: 2022, pin: "friday", landing: { x: -5, y: 3 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 132, club: "GW" },
    { id: "f2", player: "Scott", year: 2022, pin: "friday", landing: { x: -12, y: -2 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 128, club: "GW" },
    { id: "f3", player: "Kuchar", year: 2022, pin: "friday", landing: { x: -3, y: 6 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 134, club: "PW" },
    { id: "f4", player: "Smith", year: 2022, pin: "friday", landing: { x: 0, y: 9 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 137, club: "PW" },
    { id: "f5", player: "Day", year: 2022, pin: "friday", landing: { x: -7, y: 4 }, tee: { x: 0, y: -137 }, outcome: "double+", carryYds: 131, club: "GW" },
    { id: "f6", player: "Reed", year: 2022, pin: "friday", landing: { x: -15, y: 0 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 130, club: "PW" },
    // Saturday back pin — long is dead, big spread
    { id: "sa1", player: "Conners", year: 2024, pin: "saturday", landing: { x: 3, y: 22 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 148, club: "9I" },
    { id: "sa2", player: "Fitz", year: 2024, pin: "saturday", landing: { x: -2, y: 25 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 150, club: "9I" },
    { id: "sa3", player: "Aberg", year: 2024, pin: "saturday", landing: { x: 7, y: 30 }, tee: { x: 0, y: -137 }, outcome: "water", carryYds: 154, club: "9I" },
    { id: "sa4", player: "Detry", year: 2024, pin: "saturday", landing: { x: -1, y: 19 }, tee: { x: 0, y: -137 }, outcome: "par", carryYds: 145, club: "PW" },
    { id: "sa5", player: "Straka", year: 2024, pin: "saturday", landing: { x: 5, y: 24 }, tee: { x: 0, y: -137 }, outcome: "birdie", carryYds: 149, club: "9I" },
  ],
};
