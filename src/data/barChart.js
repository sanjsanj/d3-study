// prettier-ignore
export const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const barChartData = alphabet.reduce(
  (acc, val) => ({ ...acc, [val]: Math.random().toFixed(5) }),
  {}
);

export const barChartArray = alphabet.map(letter => ({
  letter,
  frequency: Math.random().toFixed(5),
}));
