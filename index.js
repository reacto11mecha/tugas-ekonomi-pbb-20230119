const fs = require("fs");
const solveAndGenerateAnswer = require("./calc");

const questions = [
  // No 1
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 200,
      perMeter: 6e6,
    },
    {
      name: "Bangunan",
      luasBidangDalamMeter: 70,
      perMeter: 7e6,
    },
    {
      name: "Taman",
      luasBidangDalamMeter: 130,
      perMeter: 5e5,
    },
  ],

  // No 2
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 500,
      perMeter: 5e6,
    },
    {
      name: "Bangunan",
      luasBidangDalamMeter: 200,
      perMeter: 6e6,
    },
    {
      name: "Pagar",
      luasBidangDalamMeter: 300,
      perMeter: 1e6,
    },
    {
      name: "Taman",
      luasBidangDalamMeter: 100,
      perMeter: 5e5,
    },
  ],

  // No 3
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 700,
      perMeter: 1.5e6,
    },
    {
      name: "Gudang",
      luasBidangDalamMeter: 400,
      perMeter: 5e5,
    },
    {
      name: "Pagar",
      luasBidangDalamMeter: 300,
      perMeter: 7e5,
    },
  ],

  // No 4
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 700,
      perMeter: 1.5e6,
    },
    {
      name: "Gudang",
      luasBidangDalamMeter: 500,
      perMeter: 7.5e5,
    },
    {
      name: "Pagar",
      luasBidangDalamMeter: 200,
      perMeter: 1e6,
    },
  ],

  // No 5
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 250,
      perMeter: 7e5,
    },
    {
      name: "Bangunan",
      luasBidangDalamMeter: 50,
      perMeter: 10e6,
    },
    {
      name: "Taman",
      luasBidangDalamMeter: 200,
      perMeter: 6e5,
    },
  ],

  // No 6
  [
    {
      name: "Tanah",
      luasBidangDalamMeter: 50,
      perMeter: 7.5e6,
    },
    {
      name: "Bangunan",
      luasBidangDalamMeter: 40,
      perMeter: 10e6,
    },
    {
      name: "Taman",
      luasBidangDalamMeter: 10,
      perMeter: 7e5,
    },
  ],
];

const solvedQuestions = questions
  .map(solveAndGenerateAnswer)
  .map((answer, idx) => `No ${idx + 1}\n=====\n\n${answer}`)
  .join("\n\n\n");

fs.writeFileSync("result.txt", solvedQuestions);
