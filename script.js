const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const nav = document.querySelector('.navbar');
document.documentElement.style.setProperty(
  '--nav-height',
  nav.offsetHeight + 'px'
);

async function gambling(caseName) {
  let itemsArray = Array.from({ length: 100 }); // random generated item list
  let itemCount = 3; // item variety
  let velocity = 1;
  let position = 0;
  let subCoordinate = 0; // velocity is normally getting floored, this is the unfloored velocity - floored velocity (future proofing for animations)
  let debugValue = 0;
  let finalPosition = "";

  // picture path
  let gamblingPicture = '';
  let gamblingPicturePrevious2 = '';
  let gamblingPicturePrevious = '';
  let gamblingPictureNext = '';
  let gamblingPictureNext2 = '';

  // block button
  document.getElementById("gamblingButton").onclick = "";

  // create item array
  for (let i = 0; i < itemsArray.length; i++) {
    let randomNumber = Math.floor(Math.random() * itemCount) + 1;
    itemsArray[i] = randomNumber; // save item
  }


  // gambling spin
  for (let i = 0; i < itemsArray.length; i++) {
    position += velocity; // move pictures
    debugValue++;
    velocity -= 0.01; // decrease velocity

    subCoordinate = position - Math.floor(position); // unused, needed for potential smooth animation in the future

    // define item number for every position
    item = itemsArray[Math.round(position)];
    itemPrevious2 = itemsArray[Math.round(position - 2)];
    itemPrevious = itemsArray[Math.round(position - 1)];
    itemNext = itemsArray[Math.round(position + 1)];
    itemNext2 = itemsArray[Math.round(position + 2)];

    // failsafe for broken velocity
    if (velocity < 0) {
      velocity = 0;
    }

    //console.log(`item ${itemsArray[Math.round(position)]}`)


    // convert item number into path
    gamblingPicture = `/images/${caseName}${item}.png`;
    gamblingPicturePrevious2 = `/images/${caseName}${itemPrevious2}.png`;
    gamblingPicturePrevious = `/images/${caseName}${itemPrevious}.png`;
    gamblingPictureNext = `/images/${caseName}${itemNext}.png`;
    gamblingPictureNext2 = `/images/${caseName}${itemNext2}.png`;

    // insert path into html
    document.getElementById("gamblingCurrent").src = gamblingPicture;
    document.getElementById("gamblingPrevious2").src = gamblingPicturePrevious2;
    document.getElementById("gamblingPrevious").src = gamblingPicturePrevious;
    document.getElementById("gamblingNext").src = gamblingPictureNext;
    document.getElementById("gamblingNext2").src = gamblingPictureNext2;

    document.getElementById("debug").textContent = debugValue;

    await sleep(); // slowdown
  }


  finalPosition = gamblingPicture;

  // winning item scaleup
  const winningItem = document.getElementById("gamblingCurrent");
  winningItem.classList.add("bigger");

  // winning item scaledown
  setTimeout(() => {
    winningItem.classList.remove("bigger");
  }, 1000);

  // unblock button
  document.getElementById("gamblingButton").onclick = function () {
    gambling('');
  };


  console.log(`${finalPosition} final`)
  return finalPosition;
}



