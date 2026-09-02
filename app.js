// ==========================================================================
// HAND-DRAWING GEN-Z WEDDING INVITATION INTERACTIVE & ANIMATION ENGINE
// Features Character-by-Character & Word-by-Word (1-by-1) Kinetic Typography
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initGuestName();
  initOpenInvitation();
  initAudioPlayer();
  initCountdown();
  initCopyButtons();
  initGuestbook();
  initScrollAnimations();
  initFloatingBackgroundHearts();
  initPolaroidParallax();
  initKineticTypography();
});

// 1. Guest Name Personalization (e.g. ?to=Budi+Santoso)
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('u') || urlParams.get('n');
  const guestDisplay = document.getElementById('guest-display-name');
  if (guestDisplay) {
    if (guestName) {
      guestDisplay.textContent = guestName.trim();
    } else {
      guestDisplay.textContent = 'Tamu Undangan';
    }
  }
}

// 2. Character-by-Character & Word-by-Word Kinetic Typography Engine
function initKineticTypography() {
  // Titles: Character-by-character (1-by-1 letter)
  const kineticTitles = document.querySelectorAll('.kinetic-title');
  kineticTitles.forEach(el => {
    prepareTextForCharAnimation(el);
  });

  // Subtitles: Word-by-word (1-by-1 word with smooth spring)
  const kineticSubtitles = document.querySelectorAll('.kinetic-subtitle');
  kineticSubtitles.forEach(el => {
    prepareTextForWordAnimation(el);
  });

  // Animate the hero title immediately on load
  const coverTitle = document.getElementById('cover-main-title');
  if (coverTitle) {
    setTimeout(() => {
      animateChars(coverTitle, 45, 100);
    }, 200);
  }

  const coverSubtitle = document.querySelector('.cover-date-badge.kinetic-title');
  if (coverSubtitle) {
    setTimeout(() => {
      animateChars(coverSubtitle, 50, 600);
    }, 200);
  }
}

// Helper: Split HTML text into words and individual animated character spans
function prepareTextForCharAnimation(element) {
  const nodes = Array.from(element.childNodes);
  const fragment = document.createDocumentFragment();

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const words = text.split(/(\s+)/);

      words.forEach(word => {
        if (!word) return;
        if (/^\s+$/.test(word)) {
          fragment.appendChild(document.createTextNode(word));
        } else {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word-wrap';

          for (let i = 0; i < word.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-anim';
            charSpan.textContent = word[i];
            wordSpan.appendChild(charSpan);
          }
          fragment.appendChild(wordSpan);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() === 'br') {
        fragment.appendChild(node.cloneNode(true));
      } else {
        const clone = node.cloneNode(false);
        const nestedText = node.textContent;
        const words = nestedText.split(/(\s+)/);

        words.forEach(word => {
          if (!word) return;
          if (/^\s+$/.test(word)) {
            clone.appendChild(document.createTextNode(word));
          } else {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-wrap';

            for (let i = 0; i < word.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.className = 'char-anim';
              charSpan.textContent = word[i];
              wordSpan.appendChild(charSpan);
            }
            clone.appendChild(wordSpan);
          }
        });
        fragment.appendChild(clone);
      }
    }
  });

  element.innerHTML = '';
  element.appendChild(fragment);
}

// Helper: Split HTML text into animated word spans (for subtitles)
function prepareTextForWordAnimation(element) {
  const nodes = Array.from(element.childNodes);
  const fragment = document.createDocumentFragment();

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const words = text.split(/(\s+)/);

      words.forEach(word => {
        if (!word) return;
        if (/^\s+$/.test(word)) {
          fragment.appendChild(document.createTextNode(word));
        } else {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word-anim';
          wordSpan.textContent = word;
          fragment.appendChild(wordSpan);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() === 'br') {
        fragment.appendChild(node.cloneNode(true));
      } else {
        const clone = node.cloneNode(false);
        const nestedText = node.textContent;
        const words = nestedText.split(/(\s+)/);

        words.forEach(word => {
          if (!word) return;
          if (/^\s+$/.test(word)) {
            clone.appendChild(document.createTextNode(word));
          } else {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word-anim';
            wordSpan.textContent = word;
            clone.appendChild(wordSpan);
          }
        });
        fragment.appendChild(clone);
      }
    }
  });

  element.innerHTML = '';
  element.appendChild(fragment);
}

// Animate characters sequentially (1-by-1)
function animateChars(element, charDelayMs = 40, startDelayMs = 0) {
  if (!element) return;
  const chars = element.querySelectorAll('.char-anim');
  if (element.dataset.charsAnimated === 'true') return;
  element.dataset.charsAnimated = 'true';

  chars.forEach((charEl, idx) => {
    setTimeout(() => {
      charEl.classList.add('pop-active');
    }, startDelayMs + idx * charDelayMs);
  });
}

// Animate words sequentially (1-by-1)
function animateWords(element, wordDelayMs = 90, startDelayMs = 100) {
  if (!element) return;
  const words = element.querySelectorAll('.word-anim');
  if (element.dataset.wordsAnimated === 'true') return;
  element.dataset.wordsAnimated = 'true';

  words.forEach((wordEl, idx) => {
    setTimeout(() => {
      wordEl.classList.add('pop-active');
    }, startDelayMs + idx * wordDelayMs);
  });
}

// 3. Open Invitation Button & Confetti Burst
function initOpenInvitation() {
  const btnOpen = document.getElementById('btn-open-invitation');
  const mainContent = document.getElementById('main-content');
  const floatingMusic = document.getElementById('floating-music-btn');

  if (!btnOpen) return;

  btnOpen.addEventListener('click', (e) => {
    e.preventDefault();

    launchHeartConfetti();

    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.style.display = 'block';
    }
    if (floatingMusic) {
      floatingMusic.style.display = 'flex';
    }

    playMusic();

    setTimeout(() => {
      triggerScrollCheck();
    }, 100);

    const targetSection = document.getElementById('quote-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 4. Heart & Sparkle Particle Confetti
function launchHeartConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#9e0e00', '#820e03', '#d4af37', '#e2c044', '#f58282', '#4c583a'];
  const symbols = ['❤️', '✨', '🌸', '💖', '★'];

  for (let i = 0; i < 45; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 100,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 22,
      size: Math.random() * 16 + 12,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45;
      p.vx *= 0.98;
      p.alpha -= 0.012;
      p.rotation += p.rotationSpeed;

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.font = `${p.size}px sans-serif`;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  updateConfetti();
}

// 5. Background Audio Player & Vinyl Animation
let isPlaying = false;
let audioEl = null;

function initAudioPlayer() {
  audioEl = document.getElementById('bg-music-audio');
  const toggleBtns = document.querySelectorAll('.js-music-toggle');
  const vinyls = document.querySelectorAll('.music-vinyl');
  const floatingBtn = document.getElementById('floating-music-btn');

  function updateUI(playing) {
    isPlaying = playing;
    toggleBtns.forEach(btn => {
      btn.innerHTML = playing ? '❚❚' : '▶';
    });
    vinyls.forEach(v => {
      if (playing) {
        v.classList.add('spinning');
      } else {
        v.classList.remove('spinning');
      }
    });
    if (floatingBtn) {
      if (playing) {
        floatingBtn.classList.add('playing');
        floatingBtn.innerHTML = '🎵';
      } else {
        floatingBtn.classList.remove('playing');
        floatingBtn.innerHTML = '🔇';
      }
    }
  }

  window.playMusic = function() {
    if (audioEl) {
      audioEl.play().then(() => {
        updateUI(true);
      }).catch(err => {
        console.log('Audio playback waiting for user tap:', err);
      });
    }
  };

  window.pauseMusic = function() {
    if (audioEl) {
      audioEl.pause();
      updateUI(false);
    }
  };

  window.toggleMusic = function() {
    if (isPlaying) {
      window.pauseMusic();
    } else {
      window.playMusic();
    }
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', window.toggleMusic);
  });

  if (floatingBtn) {
    floatingBtn.addEventListener('click', window.toggleMusic);
  }
}

// 6. Live Countdown Timer with Tick Pulse
function initCountdown() {
  const targetDate = new Date('2026-06-06T16:00:00+07:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  let lastSec = '';

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const secStr = String(seconds).padStart(2, '0');
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    
    if (secStr !== lastSec) {
      secondsEl.textContent = secStr;
      secondsEl.classList.remove('tick-pulse');
      void secondsEl.offsetWidth;
      secondsEl.classList.add('tick-pulse');
      lastSec = secStr;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 7. Bank Account Copy with Animated Toast
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('✨ Nomor rekening berhasil disalin!');
      }).catch(() => {
        const temp = document.createElement('input');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('✨ Nomor rekening berhasil disalin!');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-container');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-container';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// 8. RSVP & Guestbook LocalStorage System
const STORAGE_KEY = 'wedding_wishes_genz_julian_anisa';

const initialWishes = [
  {
    name: "Dimas & Sarah",
    status: "Hadir",
    guests: "2",
    message: "Happy Wedding Julian & Anisa! Semoga menjadi keluarga yang sakinah mawaddah warahmah, langgeng sampai kakek nenek! ❤️",
    time: "10 menit yang lalu"
  },
  {
    name: "Rian Pratama",
    status: "Hadir",
    guests: "1",
    message: "Congrats bro Julian! Akhirnya berlabuh juga. Lancar lancar sampai hari H yaa! 🎉",
    time: "25 menit yang lalu"
  },
  {
    name: "Kak Nadia",
    status: "Hadir",
    guests: "2",
    message: "MasyaAllah Anisa sayang, selamat menempuh hidup baru ya. Doa terbaik selalu menyertai kalian berdua! ✨",
    time: "1 jam yang lalu"
  },
  {
    name: "Bagas & Teman Kantor",
    status: "Hadir",
    guests: "2",
    message: "Selamat Julian dan Anisa! Semoga bahagia selalu dan dilancarkan segala urusannya. See you di Kopi Kina Kemang!",
    time: "2 jam yang lalu"
  }
];

function initGuestbook() {
  const form = document.getElementById('rsvp-form');
  const wishesList = document.getElementById('wishes-list');
  const countEl = document.getElementById('wishes-count');

  function getStoredWishes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialWishes;
      }
    }
    return initialWishes;
  }

  function saveWishes(wishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }

  function renderWishes() {
    const wishes = getStoredWishes();
    if (countEl) countEl.textContent = `(${wishes.length})`;
    if (!wishesList) return;

    wishesList.innerHTML = '';
    wishes.forEach(item => {
      const el = document.createElement('div');
      el.className = 'wish-item';

      let badgeClass = 'badge-hadir';
      let badgeIcon = '✓';
      if (item.status === 'Tidak Hadir') {
        badgeClass = 'badge-tidak';
        badgeIcon = '✕';
      } else if (item.status === 'Masih Ragu') {
        badgeClass = 'badge-ragu';
        badgeIcon = '?';
      }

      el.innerHTML = `
        <div class="wish-author-row">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-attendance-badge ${badgeClass}">${badgeIcon} ${escapeHtml(item.status)}</span>
        </div>
        <div class="wish-text">${escapeHtml(item.message)}</div>
        <div class="wish-time">${item.time || 'Baru saja'}</div>
      `;
      wishesList.appendChild(el);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('rsvp-name');
      const attendanceInput = document.querySelector('input[name="attendance"]:checked');
      const guestsInput = document.getElementById('rsvp-guests');
      const messageInput = document.getElementById('rsvp-message');

      if (!nameInput.value.trim() || !messageInput.value.trim()) {
        showToast('⚠️ Silakan isi nama dan ucapan Anda.');
        return;
      }

      const newWish = {
        name: nameInput.value.trim(),
        status: attendanceInput ? attendanceInput.value : 'Hadir',
        guests: guestsInput ? guestsInput.value : '1',
        message: messageInput.value.trim(),
        time: 'Baru saja'
      };

      const current = getStoredWishes();
      current.unshift(newWish);
      saveWishes(current);
      renderWishes();

      form.reset();
      showToast('💌 Terima kasih atas doa & konfirmasinya!');
    });
  }

  renderWishes();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

// 9. Scroll Reveal & Kinetic Typography on-scroll Observer
let scrollObserver;
function initScrollAnimations() {
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Check if element has kinetic titles or subtitles
        if (entry.target.classList.contains('kinetic-title')) {
          animateChars(entry.target, 40, 50);
        } else if (entry.target.classList.contains('kinetic-subtitle')) {
          animateWords(entry.target, 85, 100);
        } else {
          entry.target.querySelectorAll('.kinetic-title').forEach(kt => {
            animateChars(kt, 40, 50);
          });
          entry.target.querySelectorAll('.kinetic-subtitle').forEach(ks => {
            animateWords(ks, 85, 100);
          });
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom, .kinetic-title, .kinetic-subtitle').forEach(el => {
    scrollObserver.observe(el);
  });
}

function triggerScrollCheck() {
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom, .kinetic-title, .kinetic-subtitle').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('active');
      if (el.classList.contains('kinetic-title')) {
        animateChars(el, 40, 50);
      }
      if (el.classList.contains('kinetic-subtitle')) {
        animateWords(el, 85, 100);
      }
      el.querySelectorAll('.kinetic-title').forEach(kt => animateChars(kt, 40, 50));
      el.querySelectorAll('.kinetic-subtitle').forEach(ks => animateWords(ks, 85, 100));
    }
  });
}

// 10. Floating Hearts in Background
function initFloatingBackgroundHearts() {
  const container = document.createElement('div');
  container.className = 'floating-hearts-bg';
  document.getElementById('app-container').prepend(container);

  const heartIcons = ['❤️', '💖', '✨', '🌸', '★'];

  for (let i = 0; i < 14; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.animationDuration = `${Math.random() * 10 + 8}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.fontSize = `${Math.random() * 12 + 10}px`;
    container.appendChild(heart);
  }
}

// 11. Polaroid 3D Tilt Effect on Mouse/Touch
function initPolaroidParallax() {
  const polaroid = document.querySelector('.polaroid-container');
  if (!polaroid) return;

  polaroid.addEventListener('mousemove', (e) => {
    const rect = polaroid.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    polaroid.style.transform = `rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg) scale(1.03)`;
  });

  polaroid.addEventListener('mouseleave', () => {
    polaroid.style.transform = 'rotate(-2.5deg) scale(1)';
  });
}
