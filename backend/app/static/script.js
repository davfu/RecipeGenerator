function createSlider(filterTuple) {
  const filterName = filterTuple[0];
  const range = filterTuple[1];
  const step = filterTuple[2];
  const unit = filterTuple[3];

  const container = document.createElement('div');
  container.classList.add('slider-container');

  const label = document.createElement('label');
  label.setAttribute('for', `slider-${filterName}`);
  label.textContent = `${filterName}:`;

  const input = document.createElement('input');
  input.setAttribute('type', 'range');
  input.setAttribute('id', `slider-${filterName}`);
  input.setAttribute('name', `slider-${filterName.toLowerCase()}`);
  input.setAttribute('min', range[0]);
  input.setAttribute('max', range[1]);
  input.setAttribute('value', Math.floor((range[0] + range[1]) / 2));
  input.setAttribute('step', step);
  input.setAttribute('data-operator', "<=")

  const output = document.createElement('div');
  output.classList.add('output');
  output.textContent = 'At '; 

  const select = document.createElement('select');
  select.setAttribute('name', `attr-${filterName.toLowerCase()}`);
  const optionAtMost = document.createElement('option');
  optionAtMost.value = 'atMost';
  optionAtMost.textContent = 'most';
  const optionAtLeast = document.createElement('option');
  optionAtLeast.value = 'atLeast';
  optionAtLeast.textContent = 'least';

  select.appendChild(optionAtMost);
  select.appendChild(optionAtLeast);
  output.appendChild(select);

  const outputValue = document.createElement('span');
  outputValue.setAttribute('id', `slider-value-${filterName}`);
  outputValue.textContent = " " + input.value + unit;
  output.appendChild(outputValue);

  // Add an event listener to update the output value and set data attribute on input
  select.addEventListener('change', function () {
    input.setAttribute('data-operator', this.value === 'atMost' ? '<=' : '>=');
    outputValue.textContent = " " + input.value + unit;
  });

  // Add an event listener to update the output value as the slider is changed
  input.addEventListener('input', function () {
    input.setAttribute('value', input.value)
    outputValue.textContent = input.value + unit;
  });

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(output);

  document.getElementById('recipeForm').appendChild(container);
}

const filters = [
  ["Ingredients", [1, 10], 1, " Ingredients"],
  ["Calories", [0, 1800], 200, " Calories"],
  ["Protein", [0, 100], 10, " g"],
  ["Carbohydrates", [0, 110], 10, " g"],
  ["Fat", [0, 170], 10, " g"]
];

filters.forEach(createSlider);
