// ---- Story data: add new entries here to add more sections ----
  const STORY_DATA = {
    musicals: {
      title: 'Musicals',
      eyebrow: 'Story 01',
      desc: 'Opening nights, curtain calls, and everything caught mid-number.',
      tone: 'tone-musicals'
    },
    plays: {
      title: 'Plays',
      eyebrow: 'Story 02',
      desc: 'Quiet stagecraft, blackbox theatre, and the tension right before the lights come up.',
      tone: 'tone-plays'
    },
    picnic: {
      title: 'Picnic Day',
      eyebrow: 'Story 03',
      desc: 'An afternoon outdoors — light through leaves, blankets, and unposed moments.',
      tone: 'tone-picnic'
    }
  };

  // ---- Nav scroll state ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---- Lightbox ----
  const overlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalGrid = document.getElementById('modalGrid');

  const cameraIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.4"/></svg>`;

  document.querySelectorAll('.story-row[data-story]').forEach(row => {
    row.addEventListener('click', () => {
      const key = row.getAttribute('data-story');
      const data = STORY_DATA[key];
      if (!data) return;
      modalEyebrow.textContent = data.eyebrow;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalGrid.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const tile = document.createElement('div');
        tile.className = 'modal-tile ' + data.tone;
        tile.innerHTML = cameraIcon + '<span>Add photo ' + (i + 1) + '</span>';
        modalGrid.appendChild(tile);
      }
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ---- Contact form (mailto fallback, no backend) ----
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value, email = this.email.value, message = this.message.value;
    const subject = encodeURIComponent('New project inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = `mailto:tamara.szuchet@gmail.com?subject=${subject}&body=${body}`;
  });