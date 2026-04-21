/* DramaFx site — tiny interactions */

// year
document.getElementById('yr').textContent = new Date().getFullYear();

// nav scroll state + mobile toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('.nav__links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('is-open'))
);

// reveal on scroll
const fxTargets = document.querySelectorAll(
  '.section__header, .record__grid li, .poster, .leader, .director, .stage, .promise, .clients__col, .quote, .ccard, .brief, .contact__title, .contact__lede'
);
fxTargets.forEach(el => el.classList.add('fx'));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

fxTargets.forEach(el => io.observe(el));

// stagger inside grids
document.querySelectorAll('.record__grid, .leaders, .directors, .clients, .contact__grid').forEach(group => {
  [...group.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 70}ms`;
  });
});

// brief form — local simulation
const form = document.getElementById('briefForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  form.classList.add('is-sent');
  // in production: POST to /api/brief or mail endpoint
});

// poster-row: pause when off-screen to save CPU
const posterRow = document.querySelector('.poster-row__track');
if (posterRow) {
  const pio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      posterRow.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
    });
  });
  pio.observe(posterRow);
}
