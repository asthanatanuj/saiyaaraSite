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
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.textContent = isOpen ? '✕' : '☰';
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
    navLinks.querySelectorAll('.dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
    });
  }));
}

// ---------- More menu (mouse, keyboard, and touch) ----------
document.querySelectorAll('.drop-btn').forEach(button => {
  const dropdown = button.closest('.dropdown');
  if (!dropdown) return;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = !dropdown.classList.contains('open');

    document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
      openDropdown.classList.remove('open');
      openDropdown.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
    });

    dropdown.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.dropdown')) return;

  document.querySelectorAll('.dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
    dropdown.querySelector('.drop-btn')?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  document.querySelectorAll('.dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
    const button = dropdown.querySelector('.drop-btn');
    button?.setAttribute('aria-expanded', 'false');
    button?.focus();
  });
});

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

// ---------- Hero background video is loaded directly from media/saiyaara-hero.mp4 ----------
