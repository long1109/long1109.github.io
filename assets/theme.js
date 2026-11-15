const root = document.documentElement;
const button = document.querySelector('.theme-toggle');
const preference = window.matchMedia('(prefers-color-scheme: dark)');
const storageKey = 'long-site-theme';

let theme;
try {
  const saved = localStorage.getItem(storageKey);
  if (saved === 'light' || saved === 'dark') theme = saved;
} catch {
  // The toggle still works when storage is unavailable.
}

function updateTheme() {
  const current = theme ?? (preference.matches ? 'dark' : 'light');
  root.dataset.theme = current;
  button.setAttribute('aria-pressed', String(current === 'dark'));
}

button.addEventListener('click', () => {
  theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  updateTheme();
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Keep the preference for the current page.
  }
});

preference.addEventListener('change', updateTheme);
updateTheme();
button.hidden = false;
