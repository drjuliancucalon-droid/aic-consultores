// Scroll-reveal ligero, sin dependencias. Anima cualquier elemento con
// [data-reveal] al entrar en el viewport (fade + slide-up), respetando
// prefers-reduced-motion. Se reproduce una sola vez por elemento.
export function initScrollReveal(root: ParentNode = document) {
  const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay ? Number(el.dataset.revealDelay) : 0;
        window.setTimeout(() => el.classList.add('is-revealed'), delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => io.observe(el));
}
