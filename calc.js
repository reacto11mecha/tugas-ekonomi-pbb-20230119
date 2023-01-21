const NJOPTKP_CONSTANT = 10_000_000; // 10jt Rupiah

/**
 * @param {[{ name: string; luasBidangDalamMeter: number; perMeter: number }]} njopStuffs
 */
const calculateNJOP = (njopStuffs) => {
  const calculated = njopStuffs.map((stuff) => ({
    ...stuff,
    terhitung: stuff.luasBidangDalamMeter * stuff.perMeter,
  }));

  const accumulated = calculated
    .map((stuff) => stuff.terhitung)
    .reduce((c, a) => c + a);

  const reducedByNjoptkp = accumulated - NJOPTKP_CONSTANT;

  return {
    rincian: calculated,
    terakumulasi: accumulated,
    njopkp: reducedByNjoptkp,
    multiplierSetelahTerhitung: reducedByNjoptkp > 1e9 ? 0.4 : 0.2,
  };
};

const calculatePBB = (njopkp, multiplier) => ({
  // 0.005 => 0.5%

  firstStep: njopkp * 0.005,
  lastStep: njopkp * 0.005 * multiplier,
});

/**
 * @param {[{ name: string; luasBidangDalamMeter: number; perMeter: number }]} njopStuffs
 */
const generateString = (njopStuffs) => {
  const njopTerhitung = calculateNJOP(njopStuffs);

  const hasilPBB = calculatePBB(
    njopTerhitung.njopkp,
    njopTerhitung.multiplierSetelahTerhitung
  );

  const constructedNJOPString = njopTerhitung.rincian.map(
    (njop) =>
      `${njop.luasBidangDalamMeter}\tx Rp ${njop.perMeter.toLocaleString(
        "id-ID"
      )}\t= Rp ${njop.terhitung.toLocaleString("id-ID")} <= ${njop.name}`
  );

  const longetStrNjopConstructed =
    constructedNJOPString.map((e) => e.length).filter((a, b) => a - b)[0] + 5;

  const mergedNjopThing = `${constructedNJOPString.join("\n")}\n${"=".repeat(
    longetStrNjopConstructed
  )} +\n\t\t\t\t\t  Rp ${njopTerhitung.terakumulasi.toLocaleString(
    "id-ID"
  )}\n\t\t\t\t\t  Rp ${NJOPTKP_CONSTANT.toLocaleString("id-ID")}\n${"=".repeat(
    longetStrNjopConstructed
  )} -\n\t\t\t\t\t  Rp ${njopTerhitung.njopkp.toLocaleString("id-ID")}`;

  const constructedPBBString = `= Rp ${njopTerhitung.njopkp.toLocaleString(
    "id-ID"
  )} x 0.5% * ${
    njopTerhitung.multiplierSetelahTerhitung === 0.4 ? "40%" : "20%"
  }\n= ${hasilPBB.firstStep.toLocaleString("id-ID")} * ${
    njopTerhitung.multiplierSetelahTerhitung === 0.4 ? "40%" : "20%"
  }\n= Rp ${hasilPBB.lastStep.toLocaleString("id-ID")}`;

  return `${mergedNjopThing}\n\n${constructedPBBString}`;
};

module.exports = generateString;
