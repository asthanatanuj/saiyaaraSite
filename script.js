// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
  }));
}

// ---------- MP4 upload placeholders (reel grid + any tagged slot) ----------
const MAX_MB = 250;

function isMp4(file) {
  return file.type === 'video/mp4' || /\.mp4$/i.test(file.name);
}

function buildSlotMarkup(label) {
  return `
    <div class="ring">▶</div>
    <div class="slot-title">${label}</div>
    <div class="slot-hint">Drag & drop or click to upload</div>
    <div class="filetag">.MP4</div>
    <div class="slot-error"></div>
  `;
}

function handleFile(container, slot, file, label, fill) {
  const errorEl = slot.querySelector('.slot-error');
  if (!isMp4(file)) {
    if (errorEl) { errorEl.textContent = 'Please upload an .mp4 file.'; errorEl.style.display = 'block'; }
    return;
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    if (errorEl) { errorEl.textContent = `Keep it under ${MAX_MB}MB.`; errorEl.style.display = 'block'; }
    return;
  }

  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = url;
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  if (fill) { video.style.width = '100%'; video.style.height = '100%'; video.style.objectFit = 'cover'; }

  container.innerHTML = '';
  container.appendChild(video);

  const replaceBtn = document.createElement('button');
  replaceBtn.className = 'replace-btn';
  replaceBtn.textContent = 'Replace video';
  replaceBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    container.innerHTML = '';
    wireUploadSlot(container, label, { fill });
  });
  container.appendChild(replaceBtn);

  if (label) {
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = label;
    container.appendChild(cap);
  }
}

function wireUploadSlot(container, label, { fill = true } = {}) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/mp4,.mp4';

  const slot = document.createElement('div');
  slot.className = 'upload-slot';
  slot.innerHTML = buildSlotMarkup(label);
  slot.appendChild(input);
  container.appendChild(slot);

  slot.addEventListener('click', () => input.click());

  slot.addEventListener('dragover', (e) => { e.preventDefault(); slot.classList.add('drag-over'); });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(container, slot, file, label, fill);
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) handleFile(container, slot, file, label, fill);
  });
}

document.querySelectorAll('[data-upload-slot]').forEach(card => {
  wireUploadSlot(card, card.dataset.label || 'Upload video');
});

// ---------- Hero background video (home page only) ----------
(function () {
  const slot = document.getElementById('heroVideoSlot');
  const btn = document.getElementById('heroUploadBtn');
  if (!slot || !btn) return;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/mp4,.mp4';
  btn.appendChild(input);

  btn.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file || !isMp4(file)) return;
    const url = URL.createObjectURL(file);

    slot.innerHTML = '';
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    slot.appendChild(video);

    btn.innerHTML = '<span class="ring">↻</span> Replace video';
    btn.appendChild(input);
  });
})();

// ---------- Join form stub ----------
const joinForm = document.getElementById('joinForm');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = "Thanks — we'll be in touch!";
    setTimeout(() => { btn.textContent = original; e.target.reset(); }, 2400);
  });
}
