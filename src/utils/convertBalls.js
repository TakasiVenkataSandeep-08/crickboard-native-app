export const convertBall = (ball) => {
  let nextBall = ball + 0.1;
  if ((nextBall % 1).toFixed(1) > 0.5) {
    const num = ball - 0.5;
    return (num + 1).toFixed(1);
  } else {
    return nextBall.toFixed(1);
  }
};
