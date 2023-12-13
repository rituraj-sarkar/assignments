function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  process.stdout.write("\x1Bc");

  console.log(`${hours}:${minutes}:${seconds}`);

  setTimeout(updateClock, 1000);
}

updateClock();
