// navbar fix
const NAV = document.querySelector('.navbar');
document.documentElement.style.setProperty(
  '--nav-height',
  NAV.offsetHeight + 'px'
);

wallet = 0;

// add/remove money
function UpdateWallet(addedMoney) {
  wallet += addedMoney;
  document.getElementById("wallet").textContent = `Wallet: ${wallet} Emeralds`;
  return wallet;
}

UpdateWallet(50);
chestActive = false;


// get URL parameter "c"
const params = new URLSearchParams(window.location.search);
const caseName = params.get("c") || "default"; // fallback to "default" if missing

// find the button
const button = document.getElementById("gamblingButton");

// run gambling with the case from URL
button.addEventListener("click", () => {
  playAnimation(caseName);
});

// delay for gambling rendering
const FRAME_DELAY = ms => new Promise(resolve => setTimeout(resolve, ms));

class ItemClass {
  constructor(name, image, index, maxDurability, currentDurability) {
    this.name = name;
    this.image = image;
    this.index = index;
    this.maxDurability = maxDurability;
    this.currentDurability = currentDurability;
  }
}

async function playAnimation(caseName) {
  if (chestActive === false) {
    chestActive = true;
    let animationPicture;
    document.getElementById("gamblingPrevious2").src = "images/0.png";
    document.getElementById("gamblingPrevious").src = "images/0.png";
    document.getElementById("gamblingNext").src = "images/0.png";
    document.getElementById("gamblingNext2").src = "images/0.png";

    for (i = 1; i < 9; i++) {
      animationPicture = `images/animation${caseName}/${i}.png`
      document.getElementById("gamblingCurrent").src = animationPicture;
      await FRAME_DELAY(30);
    } await FRAME_DELAY(1000)
    chestActive = false
    gambling(caseName);
  } return chestActive;
}


async function gambling(caseName) {
  if (chestActive === false) {
    chestActive = true;
    let listLength = 2; // item list lenth
    let itemsList = Array.from({ length: 100 * listLength }); // random generated item list
    let itemCount = 3; // item variety
    let velocity = 1;
    let position = 0;
    let subCoordinate = 0; // velocity is normally getting floored, this is the unfloored velocity - floored velocity (future proofing for animations)
    let debugValue = 0;
    let finalPosition = "";
    let unlucky = 0; // rarity decrease
    const DURABILITY = Math.random(); // random durability factor

    // go bankrupt
    if (wallet < 30) {
      return wallet;
    }

    UpdateWallet(-30); //pay 

    // picture path
    let gamblingPicture = '';
    let gamblingPicturePrevious2 = '';
    let gamblingPicturePrevious = '';
    let gamblingPictureNext = '';
    let gamblingPictureNext2 = '';

    // create item array
    for (let i = 0; i < itemsList.length; i++) {
      let randomNumber = Math.floor(Math.random() * itemCount) + 1;
      itemsList[i] = randomNumber; // save item
    }

    // rarity system
    itemsList = itemsList.map(item => {
      unlucky = Math.random();
      if (unlucky > 0.3) {
        if (item - 1 !== 0) {
          return item - 1;
        } else {
          return 1;
        }
      } return item;
    });


    // gambling spin
    for (let i = 0; i < itemsList.length; i++) {
      position += velocity; // move pictures
      debugValue++;
      velocity -= 0.01 / listLength; // decrease velocity

      // subCoordinate = position - Math.floor(position); unused, needed for smooth animation in the future

      // define item number for every position
      item = itemsList[Math.round(position)];
      itemPrevious2 = itemsList[Math.round(position - 2)];
      itemPrevious = itemsList[Math.round(position - 1)];
      itemNext = itemsList[Math.round(position + 1)];
      itemNext2 = itemsList[Math.round(position + 2)];

      // failsafe for broken velocity
      if (velocity < 0) {
        velocity = 0;
      }

      // convert item number into path
      gamblingPicture = `/images/${caseName}/${item}.png`;
      gamblingPicturePrevious2 = `/images/${caseName}/${itemPrevious2}.png`;
      gamblingPicturePrevious = `/images/${caseName}/${itemPrevious}.png`;
      gamblingPictureNext = `/images/${caseName}/${itemNext}.png`;
      gamblingPictureNext2 = `/images/${caseName}/${itemNext2}.png`;

      // insert path into html
      document.getElementById("gamblingCurrent").src = gamblingPicture;
      document.getElementById("gamblingPrevious2").src = gamblingPicturePrevious2;
      document.getElementById("gamblingPrevious").src = gamblingPicturePrevious;
      document.getElementById("gamblingNext").src = gamblingPictureNext;
      document.getElementById("gamblingNext2").src = gamblingPictureNext2;

      //document.getElementById("debug").textContent = debugValue;

      await FRAME_DELAY(16);
    }

    finalPosition = `${caseName}${item}`;

    // winning item scaleup
    const winningItem = document.getElementById("gamblingCurrent");
    winningItem.classList.add("bigger");

    // winning item scaledown
    setTimeout(() => {
      winningItem.classList.remove("bigger");
    }, 1000);

    const PRICE = Math.floor((item + 1) ** (item + 1) / DURABILITY);

    // display results
    document.getElementById("durabilityH1").textContent = `Durability: ${DURABILITY}`;
    document.getElementById("price").textContent = `Price: ${PRICE} Emeralds`

    UpdateWallet(PRICE);

    chestActive = false;
    return finalPosition;
  }
}