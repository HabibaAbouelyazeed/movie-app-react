export const runTimeFormat = (time) => {
  let hrs = Math.floor(time / 60);
  let mins = time % 60;

  return `${hrs}h ${mins}min`;
};

export const dateFormate = (date) => {
  let dateArray = new Date(date).toString().split(" ");
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
};
