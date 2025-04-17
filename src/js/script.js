async function loadExtensions() {
  const response = await fetch('src/data.json');
  const data = await response.json();
  return data;
}

function createElement(tag, classNames = [], attributes = {}) {
  const el = document.createElement(tag);

  // Adiciona classes
  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (typeof classNames === 'string') {
    el.className = classNames;
  }

  // Adiciona atributos
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  return el;
}

function createCard(extensao) {
  // Card container
  const card = createElement('div', [
    'p-4',
    'mb-3',
    'rounded-xl',
    'bg-[hsl(217,61%,90%,10%)]',
    'border',
    'border-[hsl(226,11%,37%)]'
  ]);

  // Top section
  const topSection = createElement('div', [
    'flex',
    'flex-row',
    'justify-between',
    'items-start',
    'gap-3'
  ]);

  const logo = createElement('img', [], {
    src: extensao.logo,
    alt: extensao.name,
    draggable: 'false'
  });

  const textContainer = document.createElement('div');

  const title = createElement('h2', [
    'font-bold',
    'text-[hsl(0,0%,93%)]',
    'text-xl',
    'mb-1.5'
  ]);
  title.textContent = extensao.name;

  const description = createElement('p', [
    'font-normal',
    'text-[hsl(0,0%,78%)]',
    'leading-5.5',
    'pr-5'
  ]);
  description.textContent = extensao.description;

  textContainer.appendChild(title);
  textContainer.appendChild(description);

  topSection.appendChild(logo);
  topSection.appendChild(textContainer);

  // Bottom section
  const bottomSection = createElement('div', [
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'mt-5'
  ]);

  const removeButton = createElement('button', [
    'border',
    'border-[hsl(226,11%,37%)]',
    'text-[hsl(0,0%,93%)]',
    'rounded-full',
    'px-4',
    'py-2',
    'text-sm',
    'cursor-pointer'
  ]);
  removeButton.textContent = "Remove";

  // Toggle switch
  const label = createElement('label', [
    'relative',
    'inline-block',
    'w-9',
    'h-5',
    'cursor-pointer'
  ]);

  const input = createElement('input', ['sr-only', 'peer'], {
    type: 'checkbox'
  });
  if (extensao.isActive) input.checked = true;

  const background = createElement('div', [
    'bg-gray-600',
    'peer-checked:bg-[hsl(3,86%,64%)]',
    'w-full',
    'h-full',
    'rounded-full',
    'transition-colors',
    'duration-300'
  ]);

  const slider = createElement('div', [
    'absolute',
    'left-0.5',
    'top-0.5',
    'bg-white',
    'w-4',
    'h-4',
    'rounded-full',
    'transition-transform',
    'duration-300',
    'peer-checked:translate-x-4'
  ]);

  label.appendChild(input);
  label.appendChild(background);
  label.appendChild(slider);

  bottomSection.appendChild(removeButton);
  bottomSection.appendChild(label);

  // Juntando tudo no card
  card.appendChild(topSection);
  card.appendChild(bottomSection);

  return card;
}

async function renderCards() {
  const container = document.getElementById('container');
  const extensoes = await loadExtensions();

  extensoes.forEach(extensao => {
    const card = createCard(extensao);
    container.appendChild(card);
  });
}

renderCards();
