const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const nav = document.querySelector('.navbar');
document.documentElement.style.setProperty(
  '--nav-height',
  nav.offsetHeight + 'px'
);

async function gambling(caseName) {
  let hugeHardCoding = Array.from({ length: 100 });
  let itemCount = 3;

  for (let i = 0; i < 100; i++) {
    let randomNumber = Math.floor(Math.random() * itemCount) + 1;
    hugeHardCoding[i] = randomNumber;
  }


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


    let gamblingPicture = `${caseName}${item}.png`;
    document.getElementById("gamblingCurrent").src = gamblingPicture;

    await sleep(100);
  }
  console.log(`${position} final`)
  return position;
}


// gambling();