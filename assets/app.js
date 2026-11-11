/* Ôrbita Tattoo Studio — interações */

// Troque aqui o link de agendamento (todos os botões "Agendar" usam esta variável).
const BOOKING_URL = 'https://wa.me/5511999999999';

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Links de agendamento
  document.querySelectorAll('[data-booking]').forEach((link) => {
    link.href = BOOKING_URL;
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Rolagem suave (respeita prefers-reduced-motion)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      const target = id.length > 1 && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // Link ativo por seção
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    const probe = window.innerHeight * 0.35;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= probe) current = section;
    });
    if (atBottom) current = sections[sections.length - 1];
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();

  // Animação de entrada ao rolar
  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((item) => observer.observe(item));
});
