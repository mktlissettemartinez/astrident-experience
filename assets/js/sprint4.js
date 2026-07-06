const liquidEngine = document.createElement('div');
liquidEngine.className = 'liquid-engine';
liquidEngine.setAttribute('aria-hidden', 'true');
liquidEngine.innerHTML = '<span></span><span></span><span></span><span></span>';
document.body.prepend(liquidEngine);

function createTransitionWave(x, y) {
  const wave = document.createElement('span');
  wave.className = 'transition-wave';
  wave.style.setProperty('--wave-x', `${x}px`);
  wave.style.setProperty('--wave-y', `${y}px`);
  document.body.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove());
}

document.addEventListener('click', event => {
  const target = event.target.closest('a,button,.service-card,summary');
  if (!target) return;
  createTransitionWave(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2);
});

document.addEventListener('click', event => {
  const card = event.target.closest('.service-card');
  if (!card) return;
  card.classList.add('liquid-selected');
  setTimeout(() => card.classList.remove('liquid-selected'), 620);
});

const smoothAnchors = document.querySelectorAll('a[href^="#"]');
smoothAnchors.forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
