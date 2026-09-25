/*
 * EngSphere module entry point.
 *
 * The legacy implementation is loaded from the exact source commit so the
 * application keeps byte-for-byte behavior while the ES-module migration is
 * completed. The commit is pinned deliberately; do not replace it with a
 * floating branch URL.
 */
const LEGACY_SOURCE = 'https://raw.githubusercontent.com/sulthahyeon781121-rgb/ENGSPHERE/02dc7a83d03833d6166b71a1ac4b316e3e393177/script.js';

async function start() {
  if (window.__engSphereLegacyStarted) return;
  window.__engSphereLegacyStarted = true;

  try {
    const response = await fetch(LEGACY_SOURCE, { credentials: 'omit' });
    if (!response.ok) throw new Error(`Legacy runtime request failed: ${response.status}`);
    const source = await response.text();
    // The pinned legacy file contains its own DOMContentLoaded bootstrap.
    Function(`'use strict';\n${source}\n`)();
  } catch (error) {
    window.__engSphereLegacyStarted = false;
    console.error('EngSphere failed to start', error);
    const toast = document.getElementById('toastWrap');
    if (toast) {
      toast.innerHTML = '<div class="toast warn"><span>⚠️</span><span>EngSphere could not load. Please refresh the page.</span></div>';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

export { start };
