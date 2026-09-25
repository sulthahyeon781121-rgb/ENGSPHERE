import { state, saveState, levelForXp, levelLabel } from './state.js';
import { escapeHtml } from './utils.js';

export function applyTheme(theme = state.theme) {
  state.theme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.toggleAttribute('data-theme', state.theme === 'light');
  document.body.toggleAttribute('data-theme', state.theme === 'light');
  const label = document.getElementById('themeStatusLabel');
  if (label) label.textContent = state.theme === 'light' ? 'Crisp Light Mode' : 'Dark Navy Mode';
  const toggle = document.getElementById('themeToggleBtn');
  if (toggle) toggle.setAttribute('aria-checked', String(state.theme === 'light'));
  saveState();
}

export function setView(name) {
  state.currentView = name;
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('hidden', view.dataset.view !== name));
  document.querySelectorAll('.topnav button[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === name));
}

export function syncProgress() {
  state.level = levelForXp(state.xp);
  const progress = state.xp % 100;
  [['bigRingFg',351.9],['progRingFg',351.9],['miniRingFg',65.9]].forEach(([id, circumference]) => {
    const element = document.getElementById(id);
    if (element) element.style.strokeDashoffset = String(circumference * (1 - progress / 100));
  });
  ['bigRingLevel','progRingLevel'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = state.level; });
  const mini = document.getElementById('miniLevelLabel'); if (mini) mini.textContent = `Lv ${state.level}`;
  ['dashStreak','progStreak','miniStreak'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = state.streak; });
  const xpText = `${progress} / 100 XP (Total: ${state.xp})`;
  ['dashXpText','progXpText'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = xpText; });
  const levelWord = document.getElementById('dashLevelWord'); if (levelWord) levelWord.textContent = levelLabel(state.level);
  saveState();
}

export function renderTenses(tenseData) {
  const grid = document.getElementById('tenseGrid'); if (!grid) return;
  grid.innerHTML = tenseData.map((tense, index) => `<div class="card tense-card"><div class="tc-top"><div><div class="tc-aspect">${escapeHtml(tense.aspect)}</div><h4>${escapeHtml(tense.name)}</h4></div><span class="chev">▼</span></div><div class="tc-formula">${escapeHtml(tense.formula)}</div><div class="tense-detail"><div class="tense-detail-inner"><ul>${tense.uses.map(use => `<li>${escapeHtml(use)}</li>`).join('')}</ul><div class="tc-examples">${tense.ex.map(example => `<div class="tc-example">${escapeHtml(example)}</div>`).join('')}</div></div></div></div>`).join('');
}
