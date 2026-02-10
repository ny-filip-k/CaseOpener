const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const nav = document.querySelector('.navbar');
document.documentElement.style.setProperty(
  '--nav-height',
  nav.offsetHeight + 'px'
);

async function gambling() {
  let hugeHardCoding = Array.from({ length: 100 }, () => Math.random() < 0.5 ? 1 : 3);
  let velocity = 1;
  let position = 0;

  for (let i = 0; i < 20; i++) {
    position += velocity;
    velocity -= 0.01;
    console.log(`velocity ${Math.round(velocity)}`);
    console.log(`position ${Math.round(position)}`);

    item = hugeHardCoding[Math.round(position)];

    if (velocity < 0) {
      velocity = 0;
    }
    console.log(`item ${hugeHardCoding[Math.round(position)]}`)


    let gamblingPicture = `${item}.png`;
    document.getElementById("gamblingCurrent").src = gamblingPicture;

    await sleep(100);
  }
  console.log(`${position} final`)
  return position;
}


// gambling();