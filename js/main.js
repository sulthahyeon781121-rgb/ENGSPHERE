import { state, saveState, loadState, levelForXp } from './state.js';
import { TENSES, VOCAB, BANK } from './data.js';
import { applyTheme, setView, syncProgress, renderTenses } from './ui.js';
import { bind, escapeHtml, toast, topicLabel } from './utils.js';

function renderVocabulary() {
  const grid = document.getElementById('vocabGrid'); const tabs = document.getElementById('vocabCategoryTabs');
  if (!grid || !tabs) return;
  const categories = Object.keys(VOCAB); const active = tabs.dataset.active || categories[0];
  tabs.innerHTML = categories.map(category => `<button class="pill ${category === active ? 'active' : ''}" data-vocab-cat="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  grid.innerHTML = VOCAB[active].map(item => `<div class="flashcard"><div class="flashcard-inner"><div class="flashcard-face flashcard-front"><div class="word">${escapeHtml(item.w)}</div><div class="pos">${escapeHtml(item.p)}</div></div><div class="flashcard-face flashcard-back"><div class="mean">${escapeHtml(item.m)}</div><div class="ex">${escapeHtml(item.e)}</div></div></div></div>`).join('');
  bind('[data-vocab-cat]', 'click', event => { tabs.dataset.active = event.currentTarget.dataset.vocabCat; renderVocabulary(); });
  bind('.flashcard', 'click', event => event.currentTarget.classList.toggle('flipped'));
}

function startQuiz() {
  const topic = state.selectedTopic === 'mixed' ? 'tenses' : state.selectedTopic;
  const difficulty = state.selectedDifficulty;
  const questions = (BANK[topic]?.[difficulty] || BANK[topic]?.beginner || []).slice(0, 6);
  const area = document.getElementById('quizPlayArea'); if (!area || !questions.length) return toast('No questions available for this selection.', true);
  let index = 0; let score = 0;
  const next = () => {
    const question = questions[index];
    if (!question) { state.xp += Math.max(5, score * 2); state.streak += 1; syncProgress(); area.innerHTML = `<div class="card quiz-results"><div class="score">${Math.round(score / questions.length * 100)}%</div><p>Quiz complete! +XP earned.</p></div>`; return; }
    area.innerHTML = `<div class="card quiz-stage quiz-question"><div class="quiz-progress">Question ${index + 1} of ${questions.length}</div><h3>${escapeHtml(question.q)}</h3><div class="quiz-options">${question.options.map((option, i) => `<button class="quiz-option" data-answer="${i}">${escapeHtml(option)}</button>`).join('')}</div></div>`;
    area.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => { const correct = Number(button.dataset.answer) === question.answer; if (correct) score++; toast(correct ? 'Correct!' : question.explain, !correct); index++; next(); }));
  }; next();
}

function initNavigation() {
  bind('.topnav button[data-view]', 'click', e => setView(e.currentTarget.dataset.view));
  bind('[data-goto]', 'click', e => setView(e.currentTarget.dataset.goto));
  bind('[data-msub]', 'click', e => { state.selectedMaterial = e.currentTarget.dataset.msub; document.querySelectorAll('[data-msub]').forEach(b => b.classList.toggle('active', b === e.currentTarget)); document.querySelectorAll('[id^="msub-"]').forEach(p => p.classList.toggle('hidden', p.id !== `msub-${state.selectedMaterial}`)); });
  bind('[data-topic]', 'click', e => { state.selectedTopic = e.currentTarget.dataset.topic; document.querySelectorAll('[data-topic]').forEach(b => b.classList.toggle('active', b.dataset.topic === state.selectedTopic)); });
  bind('[data-diff]', 'click', e => { state.selectedDifficulty = e.currentTarget.dataset.diff; document.querySelectorAll('[data-diff]').forEach(b => b.classList.toggle('active', b.dataset.diff === state.selectedDifficulty)); });
  document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => applyTheme(state.theme === 'light' ? 'dark' : 'light'));
}

export function initApp() {
  loadState(); applyTheme(state.theme); renderTenses(TENSES); renderVocabulary(); syncProgress(); initNavigation();
  const loggedIn = state.isLoggedIn; document.getElementById('landing')?.classList.toggle('hidden', loggedIn); document.getElementById('app')?.classList.toggle('hidden', !loggedIn); setView(loggedIn ? state.currentView : 'dashboard');
  window.__engSphereModuleLoaded = true;
}
