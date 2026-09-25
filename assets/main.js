const button = document.getElementById('menu-button');
const navigation = document.getElementById('mobile-nav');
button.hidden = false;
navigation.hidden = true;
function setMenu(open) {
  button.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open;
}
button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenu(false);
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    button.focus();
  }
});
document.addEventListener('click', event => {
  if (!button.contains(event.target) && !navigation.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 641px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});
