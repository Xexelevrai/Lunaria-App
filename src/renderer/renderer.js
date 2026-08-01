(() => {
  const viewIntro = document.getElementById('view-intro');
  const viewMain = document.getElementById('view-main');
  const viewSettings = document.getElementById('view-settings');

  const introVideo = document.getElementById('intro-video');
  const introOverlay = document.getElementById('intro-overlay');
  const introDontShow = document.getElementById('intro-dont-show');
  const introContinue = document.getElementById('intro-continue');
  const introSkip = document.getElementById('intro-skip');

  const brandLogo = document.getElementById('brand-logo');
  const playButton = document.getElementById('play-button');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const playerCount = document.getElementById('player-count');
  const newsList = document.getElementById('news-list');

  const openSettingsBtn = document.getElementById('open-settings');
  const closeSettingsBtn = document.getElementById('close-settings');
  const replayIntroBtn = document.getElementById('replay-intro');

  const toggleIntroEnabled = document.getElementById('toggle-intro-enabled');
  const toggleAutoLaunch = document.getElementById('toggle-auto-launch');
  const toggleAutoConnect = document.getElementById('toggle-auto-connect');
  const fivemPathText = document.getElementById('fivem-path-text');
  const chooseFivemPathBtn = document.getElementById('choose-fivem-path');
  const themeSwatches = document.querySelectorAll('.theme-swatch');

  const modal = document.getElementById('modal-not-installed');
  const modalCancel = document.getElementById('modal-cancel');
  const modalDownload = document.getElementById('modal-download');

  const saveSettingsBtn = document.getElementById('save-settings');
  const settingsSaveStatus = document.getElementById('settings-save-status');
  const appVersionEl = document.getElementById('app-version');

  const displayModeButtons = document.querySelectorAll('.display-mode-btn');

  const autoconnectBanner = document.getElementById('autoconnect-banner');
  const autoconnectCount = document.getElementById('autoconnect-count');
  const autoconnectCancelBtn = document.getElementById('autoconnect-cancel');

  const bgMusic = document.getElementById('bg-music');
  const clickSound = document.getElementById('click-sound');
  const muteToggleBtn = document.getElementById('mute-toggle');
  const volumeSlider = document.getElementById('volume-slider');

  const { assetsBase, introEnabled, theme, musicVolume, musicMuted } = window.lunaria.bootData;

  const THEME_LOGOS = {
    gold: 'logo.png',
    silver: 'logo2.png',
  };

  // Les réglages de la page Paramètres (hors chemin FiveM et taille d'écran, qui
  // s'appliquent immédiatement) ne sont persistés qu'au clic sur "Sauvegarder" : les
  // contrôles modifient seulement ce brouillon + un aperçu visuel le cas échéant.
  let confirmedSettings = { introEnabled: true, autoLaunch: false, autoConnect: false, theme: 'gold' };
  let draftSettings = { ...confirmedSettings };

  function populateSettingsUI() {
    draftSettings = { ...confirmedSettings };
    toggleIntroEnabled.checked = draftSettings.introEnabled !== false;
    toggleAutoLaunch.checked = Boolean(draftSettings.autoLaunch);
    toggleAutoConnect.checked = Boolean(draftSettings.autoConnect);
    applyTheme(draftSettings.theme || 'gold');
    settingsSaveStatus.classList.remove('visible');
  }

  introVideo.src = `${assetsBase}/video/intro.mp4`;
  bgMusic.src = `${assetsBase}/audio/background.mp3`;
  clickSound.src = `${assetsBase}/audio/click2.mp3`;

  // --- Musique de fond (démarre en arrivant sur la vue principale, jamais pendant l'intro) ---
  let musicStarted = false;
  bgMusic.volume = Math.min(100, Math.max(0, musicVolume ?? 25)) / 100;
  bgMusic.muted = Boolean(musicMuted);
  volumeSlider.value = String(musicVolume ?? 25);
  muteToggleBtn.textContent = bgMusic.muted ? '🔇' : '🔊';

  function maybeStartMusic() {
    if (musicStarted || !viewMain.classList.contains('active')) return;
    musicStarted = true;
    bgMusic.play().catch(() => {
      // Autoplay bloqué : la musique démarrera au premier clic de l'utilisateur.
      musicStarted = false;
      document.addEventListener('click', () => { if (!musicStarted) { musicStarted = true; bgMusic.play().catch(() => {}); } }, { once: true });
    });
  }

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('button')) playClickSound();
  });

  muteToggleBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteToggleBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
    window.lunaria.setMusicMuted(bgMusic.muted);
  });

  volumeSlider.addEventListener('input', () => {
    bgMusic.volume = Number(volumeSlider.value) / 100;
  });
  volumeSlider.addEventListener('change', () => {
    window.lunaria.setMusicVolume(Number(volumeSlider.value));
  });

  // --- Connexion automatique (annulable, jamais sans montrer la fenêtre) ---
  // Déclaré avant showView()/playIntro() plus bas : ces variables `let` doivent exister
  // avant que la décision de vue initiale (synchrone) ne puisse appeler maybeStartAutoConnect().
  const AUTO_CONNECT_DELAY_S = 5;
  let autoConnectEnabled = false;
  let autoConnectSettingLoaded = false;
  let autoConnectTriggered = false;
  let autoConnectTimeout = null;
  let autoConnectInterval = null;

  function cancelAutoConnect() {
    if (autoConnectTimeout) clearTimeout(autoConnectTimeout);
    if (autoConnectInterval) clearInterval(autoConnectInterval);
    autoconnectBanner.classList.add('hidden');
  }

  function startAutoConnectCountdown() {
    let remaining = AUTO_CONNECT_DELAY_S;
    autoconnectCount.textContent = remaining;
    autoconnectBanner.classList.remove('hidden');
    autoConnectInterval = setInterval(() => {
      remaining -= 1;
      autoconnectCount.textContent = Math.max(remaining, 0);
      if (remaining <= 0) clearInterval(autoConnectInterval);
    }, 1000);
    autoConnectTimeout = setTimeout(() => {
      autoconnectBanner.classList.add('hidden');
      playButton.click();
    }, AUTO_CONNECT_DELAY_S * 1000);
  }

  function maybeStartAutoConnect() {
    if (autoConnectTriggered || !autoConnectSettingLoaded || !autoConnectEnabled) return;
    if (!viewMain.classList.contains('active')) return;
    autoConnectTriggered = true;
    startAutoConnectCountdown();
  }

  function showView(view) {
    [viewIntro, viewMain, viewSettings].forEach((v) => v.classList.remove('active'));
    view.classList.add('active');
    maybeStartAutoConnect();
    maybeStartMusic();
  }

  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    themeSwatches.forEach((sw) => sw.classList.toggle('active', sw.dataset.theme === t));
    brandLogo.src = `${assetsBase}/images/${THEME_LOGOS[t] || THEME_LOGOS.gold}`;
  }

  const SKIP_BUTTON_DELAY_MS = 4000;
  let skipTimer = null;

  function playIntro() {
    introOverlay.classList.add('hidden');
    introDontShow.checked = false;
    introSkip.classList.add('hidden');
    if (skipTimer) clearTimeout(skipTimer);
    skipTimer = setTimeout(() => introSkip.classList.remove('hidden'), SKIP_BUTTON_DELAY_MS);

    showView(viewIntro);
    introVideo.currentTime = 0;
    introVideo.play().catch(() => {
      // Autoplay bloqué (rare) : on laisse l'utilisateur continuer manuellement.
      introOverlay.classList.remove('hidden');
      introSkip.classList.remove('hidden');
    });
  }

  // Décision synchrone de la vue initiale : évite tout flash de la vidéo (ou du
  // mauvais thème) le temps d'un aller-retour IPC asynchrone.
  confirmedSettings.theme = theme || 'gold';
  confirmedSettings.introEnabled = introEnabled !== false;
  applyTheme(confirmedSettings.theme);
  toggleIntroEnabled.checked = confirmedSettings.introEnabled;

  if (introEnabled === false) {
    showView(viewMain);
  } else {
    playIntro();
  }

  introVideo.addEventListener('ended', () => {
    if (skipTimer) clearTimeout(skipTimer);
    introSkip.classList.add('hidden');
    introOverlay.classList.remove('hidden');
  });

  introSkip.addEventListener('click', () => {
    if (skipTimer) clearTimeout(skipTimer);
    introVideo.pause();
    introOverlay.classList.remove('hidden');
  });

  introContinue.addEventListener('click', async () => {
    if (introDontShow.checked) {
      confirmedSettings.introEnabled = false;
      draftSettings.introEnabled = false;
      toggleIntroEnabled.checked = false;
      await window.lunaria.setIntroEnabled(false);
    }
    showView(viewMain);
  });

  brandLogo.addEventListener('error', () => {
    brandLogo.style.display = 'none';
  });

  openSettingsBtn.addEventListener('click', () => {
    populateSettingsUI();
    showView(viewSettings);
  });
  closeSettingsBtn.addEventListener('click', () => {
    // Reviens à l'état confirmé si on quitte sans sauvegarder (ex : thème prévisualisé).
    applyTheme(confirmedSettings.theme || 'gold');
    showView(viewMain);
  });

  replayIntroBtn.addEventListener('click', () => {
    playIntro();
  });

  function renderStatus(status) {
    if (status.online) {
      statusDot.classList.add('online');
      statusDot.classList.remove('offline');
      statusText.textContent = status.serverName || 'Serveur Lunaria';
      playerCount.textContent = `${status.playerCount} / ${status.maxPlayers} joueurs`;
    } else {
      statusDot.classList.add('offline');
      statusDot.classList.remove('online');
      statusText.textContent = 'Serveur hors ligne';
      playerCount.textContent = '';
    }
  }

  window.lunaria.onStatusUpdate(renderStatus);

  function renderNews(items) {
    if (!items || items.length === 0) {
      newsList.innerHTML = '<p class="news-empty">Aucune actualité pour le moment.</p>';
      return;
    }
    newsList.innerHTML = '';
    for (const item of items) {
      const el = document.createElement('div');
      el.className = 'news-item';
      const title = document.createElement('h4');
      title.textContent = item.title || '';
      const time = document.createElement('time');
      time.textContent = item.date || '';
      const content = document.createElement('p');
      content.textContent = item.content || '';
      el.appendChild(title);
      el.appendChild(time);
      el.appendChild(content);
      newsList.appendChild(el);
    }
  }

  autoconnectCancelBtn.addEventListener('click', cancelAutoConnect);

  playButton.addEventListener('click', async () => {
    playButton.disabled = true;
    playButton.textContent = 'CONNEXION...';
    const result = await window.lunaria.play();
    if (!result.installed) {
      modal.classList.remove('hidden');
      playButton.disabled = false;
      playButton.textContent = 'JOUER';
      return;
    }
    // FiveM prend le relais : on referme le launcher pour laisser la place au jeu.
    setTimeout(() => window.lunaria.quit(), 900);
  });

  modalCancel.addEventListener('click', () => modal.classList.add('hidden'));
  modalDownload.addEventListener('click', async () => {
    await window.lunaria.openDownload();
    modal.classList.add('hidden');
  });

  document.getElementById('discord-button').addEventListener('click', () => {
    window.lunaria.openDiscord();
  });

  document.getElementById('tiktok-button').addEventListener('click', () => {
    window.lunaria.openTiktok();
  });

  // --- Paramètres ---
  // Ces contrôles ne modifient que le brouillon (draftSettings) + un aperçu visuel pour
  // le thème : rien n'est persisté avant le clic sur "Sauvegarder les paramètres".
  toggleIntroEnabled.addEventListener('change', () => {
    draftSettings.introEnabled = toggleIntroEnabled.checked;
  });

  toggleAutoLaunch.addEventListener('change', () => {
    draftSettings.autoLaunch = toggleAutoLaunch.checked;
  });

  toggleAutoConnect.addEventListener('change', () => {
    draftSettings.autoConnect = toggleAutoConnect.checked;
    if (!toggleAutoConnect.checked) cancelAutoConnect();
  });

  saveSettingsBtn.addEventListener('click', async () => {
    saveSettingsBtn.disabled = true;
    const previousLabel = saveSettingsBtn.textContent;
    saveSettingsBtn.textContent = 'Enregistrement...';
    try {
      await Promise.all([
        window.lunaria.setIntroEnabled(draftSettings.introEnabled),
        window.lunaria.setAutoLaunch(draftSettings.autoLaunch),
        window.lunaria.setAutoConnect(draftSettings.autoConnect),
        window.lunaria.setTheme(draftSettings.theme),
      ]);
      confirmedSettings = { ...draftSettings };
      if (!confirmedSettings.autoConnect) cancelAutoConnect();
      settingsSaveStatus.textContent = '✓ Paramètres enregistrés';
      settingsSaveStatus.classList.add('visible');
      setTimeout(() => settingsSaveStatus.classList.remove('visible'), 2500);
    } finally {
      saveSettingsBtn.disabled = false;
      saveSettingsBtn.textContent = previousLabel;
    }
  });

  chooseFivemPathBtn.addEventListener('click', async () => {
    const newPath = await window.lunaria.chooseFiveMPath();
    fivemPathText.textContent = newPath || 'Non détecté — clique sur "Parcourir..." pour indiquer FiveM.exe';
  });

  themeSwatches.forEach((sw) => {
    sw.addEventListener('click', () => {
      draftSettings.theme = sw.dataset.theme;
      applyTheme(sw.dataset.theme); // aperçu visuel immédiat, persisté seulement au Save
    });
  });

  function applyDisplayModeUI(mode) {
    displayModeButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.displayMode === mode));
  }

  displayModeButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      applyDisplayModeUI(btn.dataset.displayMode);
      await window.lunaria.setDisplayMode(btn.dataset.displayMode);
    });
  });

  // --- Particules magiques ---
  function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function makeParticle() {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 40,
        r: 0.6 + Math.random() * 1.8,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: 0.15 + Math.random() * 0.45,
        hue: Math.random() > 0.5 ? '212,175,90' : '233,224,242',
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    }

    function init() {
      resize();
      const count = Math.min(70, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({ ...makeParticle(), y: Math.random() * height }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const alpha = p.alpha * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${p.hue},${alpha})`;
        ctx.fill();

        if (p.y < -10) {
          Object.assign(p, makeParticle(), { y: height + 10 });
        }
      }
      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    init();
    requestAnimationFrame(tick);
  }

  async function init() {
    const initData = await window.lunaria.getInit();

    confirmedSettings.autoLaunch = Boolean(initData.autoLaunch);
    confirmedSettings.autoConnect = Boolean(initData.autoConnect);
    draftSettings.autoLaunch = confirmedSettings.autoLaunch;
    draftSettings.autoConnect = confirmedSettings.autoConnect;
    toggleAutoLaunch.checked = confirmedSettings.autoLaunch;
    toggleAutoConnect.checked = confirmedSettings.autoConnect;
    fivemPathText.textContent = initData.fivemPath || 'Non détecté — clique sur "Parcourir..." pour indiquer FiveM.exe';
    applyDisplayModeUI(initData.displayMode || 'fullscreen');
    appVersionEl.textContent = initData.appVersion ? `Lunaria Launcher — Version ${initData.appVersion}` : '';

    autoConnectEnabled = confirmedSettings.autoConnect;
    autoConnectSettingLoaded = true;
    maybeStartAutoConnect();

    const news = await window.lunaria.getNews();
    renderNews(news);
  }

  initParticles();
  init();
})();
