export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' }[char]));
export const capitalize = value => value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
export const topicLabel = topic => ({ tenses:'Tenses', tobe:'To Be', vocabulary:'Vocabulary', grammar:'Grammar', mixed:'Mixed' }[topic] || capitalize(topic) || 'General');

export function toast(message, warning = false) {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const node = document.createElement('div');
  node.className = `toast${warning ? ' warn' : ''}`;
  node.innerHTML = `<span>${warning ? '⚠️' : '✨'}</span><span>${escapeHtml(message)}</span>`;
  wrap.append(node);
  setTimeout(() => node.remove(), 3000);
}

export function bind(selector, event, handler) {
  document.querySelectorAll(selector).forEach(element => element.addEventListener(event, handler));
}
