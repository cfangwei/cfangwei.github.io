const CheckerboardSize = 16;

function makeMatrix() {
  const array = new Array(CheckerboardSize);
  for (let i = 0; i < CheckerboardSize; i++) {
    array[i] = new Array(CheckerboardSize);
  }
  return array;
}

function main(id, isFirst) {
  const pieceColor = isFirst ? 'black' : 'white';
  let matrix = makeMatrix();

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < CheckerboardSize; i++) {
    const subFragment = document.createElement('div');
    subFragment.className = 'row';
    for (let j = 0; j < CheckerboardSize; j++) {
      const point = document.createElement('div');
      point.className = 'point';
      point.dataset.nid = i * CheckerboardSize + j;
      subFragment.appendChild(point);
    }
    fragment.appendChild(subFragment);
  }
  const main = document.getElementById(id);
  main.appendChild(fragment);

  main.addEventListener('click', (event) => {
    if (event.target.className === 'point') {
      const target = event.target;
      target.innerHTML = `<div class='piece ${pieceColor}'></div>`;
    }
  });
}

main('main', true);
