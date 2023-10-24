
  const IMAGE_URL_PREFIX = 'https://assets.codepen.io/1478440/';
const MIME_TYPE = '.jpg';
const IMAGE_DISPLAY_TIME = 2500;
const gallery = document.getElementById('gallery');
const gridItems = Array.prototype.slice.call(document.getElementsByClassName('flip-inner'));
const activeImages = [];
const vBirds = [ 'goldeneagle01', 'hummingbird01', 'kestrel01', 'lilacroller01', 'macaw01', 'osprey01', 'parrot01', 'peacock01', 'woodduck01', 'woodpecker01'];
const hBirds = [ 'beeeater01', 'bluejay01', 'bluejay02', 'cardinal01', 'cockatoo01', 'eagle01', 'eagle02', 'finch01', 'flamingo01', 'gannet01', 'hummingbird01', 'kingfisher01', 'macaw01', 'mandarinduck01', 'nuthatch01', 'owl01', 'owl02', 'parrot01', 'puffin01', 'puffin02', 'robin01', 'tit01', 'toucan01', 'warbler01' ];
let flipImagesFunc;

initImages = () => {
  const verticalElements = gridItems.filter(gi => gi.parentElement.classList.contains('vertical'));
  const horizontalElements = gridItems.filter(gi => gi.parentElement.classList.contains('horizontal'));

  const vBirdsCopy = [...vBirds];
  for (let el of verticalElements) {
    for (let img of el.getElementsByTagName('img')) {
      const bird = getRandomArrayItem(vBirdsCopy);
      const imageUrl = generateUrl(bird, true);
      const index = vBirdsCopy.indexOf(bird);
      img.src = imageUrl;
      vBirdsCopy.splice(index, 1);
      activeImages.push(bird);
    }
  }
  
  const hBirdsCopy = [...hBirds];
  for (let el of horizontalElements) {
    for (let img of el.getElementsByTagName('img')) {
      const bird = getRandomArrayItem(hBirdsCopy);
      const imageUrl = generateUrl(bird, false);
      const index = hBirdsCopy.indexOf(bird);
      img.src = imageUrl;
      hBirdsCopy.splice(index, 1);
      activeImages.push(bird);
    }
  }

  gallery.style.display = 'flex';
}

flipImage = () => {
  let gridItem = getRandomArrayItem(gridItems);

  var imgs;
  if (gridItem.dataset.rotated === 'true') {
    gridItem.style.transform = 'none';
    gridItem.dataset.rotated = 'false';
    imgs = gridItem.getElementsByClassName('back');
  }
  else {
    gridItem.style.transform = 'rotateY(180deg)';
    gridItem.dataset.rotated = 'true';
    imgs = gridItem.getElementsByClassName('front');
  }
  
  const isVertical = gridItem.parentNode.classList.contains('vertical');
  const newBird = getNewBird(isVertical);
  const newUrl = generateUrl(newBird, isVertical);
  const oldUrl = imgs[0].src;
  const oldBird = oldUrl.substring(IMAGE_URL_PREFIX.length + 2, oldUrl.length - MIME_TYPE.length);
  
  // once flipped change the backface image to a new one, in prep for the next flip
  imgs[0].src = newUrl;
  activeImages[activeImages.indexOf(oldBird)] = newBird;
}

getNewBird = isVertical => {
  let images = isVertical ? vBirds : hBirds;
  return getRandomArrayItem(images.filter(i => !activeImages.includes(i)));
}

generateUrl = (bird, isVertical) => {
  return isVertical
    ? IMAGE_URL_PREFIX.concat('v_', bird, MIME_TYPE)
    : IMAGE_URL_PREFIX.concat('h_', bird, MIME_TYPE);
}

getRandomArrayItem = array => {
  return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    window.clearInterval(flipImagesFunc);
  }
  else {
    flipImagesFunc = window.setInterval(flipImage, IMAGE_DISPLAY_TIME);
  }
});

initImages();
flipImagesFunc = setInterval(flipImage, IMAGE_DISPLAY_TIME);