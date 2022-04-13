export function random(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
