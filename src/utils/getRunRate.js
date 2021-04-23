export const getRunRate = (score, overs) => {
  const oversStringArray = overs.toString().split(".");
  const currentOvers =
    oversStringArray.length === 1
      ? parseInt(oversStringArray[0])
      : parseFloat(
          parseInt(oversStringArray[0]) + parseInt(oversStringArray[1]) / 6
        );
  const runRate = score / currentOvers;
  return runRate.toFixed(2);
};
