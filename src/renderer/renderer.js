(() => {
  const viewIntro = document.getElementById('view-intro');
  const viewMain = document.getElementById('view-main');
  const viewSettings = document.getElementById('view-settings');
  const viewQuiz = document.getElementById('view-quiz');
  const ALL_VIEWS = [viewIntro, viewMain, viewSettings, viewQuiz];

  const introVideo = document.getElementById('intro-video');
  const introOverlay = document.getElementById('intro-overlay');
  const introDontShow = document.getElementById('intro-dont-show');
  const introContinue = document.getElementById('intro-continue');
  const introSkip = document.getElementById('intro-skip');

  const brandLogo = document.getElementById('brand-logo');
  const brandEl = document.querySelector('.brand');
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

  const checkUpdateBtn = document.getElementById('check-update-btn');
  const checkUpdateDesc = document.getElementById('check-update-desc');
  const DEFAULT_UPDATE_DESC = 'Vérifier manuellement si une nouvelle version est disponible.';

  const toggleLowPower = document.getElementById('toggle-low-power');
  const statusSkeleton = document.getElementById('status-skeleton');

  const openQuizBtn = document.getElementById('open-quiz');
  const closeQuizBtn = document.getElementById('close-quiz');
  const quizStartEl = document.getElementById('quiz-start');
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizResultEl = document.getElementById('quiz-result');
  const quizBestScoreEl = document.getElementById('quiz-best-score');
  const quizStartBtn = document.getElementById('quiz-start-btn');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizAnswersEl = document.getElementById('quiz-answers');
  const quizResultTitle = document.getElementById('quiz-result-title');
  const quizResultScore = document.getElementById('quiz-result-score');
  const quizReplayBtn = document.getElementById('quiz-replay-btn');
  const quizBackBtn = document.getElementById('quiz-back-btn');

  const displayModeButtons = document.querySelectorAll('.display-mode-btn');

  const autoconnectBanner = document.getElementById('autoconnect-banner');
  const autoconnectCount = document.getElementById('autoconnect-count');
  const autoconnectCancelBtn = document.getElementById('autoconnect-cancel');

  const bgMusic = document.getElementById('bg-music');
  const clickSound = document.getElementById('click-sound');
  const muteToggleBtn = document.getElementById('mute-toggle');
  const volumeSlider = document.getElementById('volume-slider');

  const updateBanner = document.getElementById('update-banner');
  const updateBannerText = document.getElementById('update-banner-text');
  const updateRestartBtn = document.getElementById('update-restart-btn');

  const themeVeil = document.getElementById('theme-transition-veil');
  const portalEl = document.querySelector('.portal');
  const copyServerBtn = document.getElementById('copy-server-address');
  const whatsNewModal = document.getElementById('modal-whats-new');
  const whatsNewTitle = document.getElementById('whats-new-title');
  const whatsNewBody = document.getElementById('whats-new-body');
  const whatsNewClose = document.getElementById('whats-new-close');

  // Assignées par initParticles() plus bas ; ne peuvent être appelées que suite à une
  // interaction utilisateur (donc toujours après l'exécution synchrone initiale du script).
  let spawnBurst = () => {};
  let spawnTrail = () => {};
  let setParticlesLowPower = () => {};
  let serverAddress = '';

  const { assetsBase, introEnabled, theme, musicVolume, musicMuted, lowPowerMode } = window.lunaria.bootData;

  const THEME_LOGOS = {
    gold: 'logo.png',
    silver: 'logo2.png',
  };

  // Banque de questions du quiz, tirée du lore "L'Histoire de Brumelune". `correct` est
  // l'index (dans `answers`) de la bonne réponse ; les réponses sont mélangées à chaque
  // partie dans startQuiz(), donc l'ordre ci-dessous n'a pas d'importance.
  const QUIZ_QUESTIONS = [
    { q: "Comment s'appelle l'enchantement qui rend Brumelune invisible aux non-mages ?", answers: ['Le Sceau', 'Le Voile', 'La Brume', "L'Écrin"], correct: 1 },
    { q: 'Que retient le Voile, en plus de cacher les sorciers ?', answers: ['Rien d\'autre', 'Des créatures marines', 'Un océan de magie brute, informe et affamée', 'Les non-mages'], correct: 2 },
    { q: "Qui a fondé l'Académie Lunaria ?", answers: ['Grim Blackwood', 'Merlin', 'Makarov', 'Le Conseil'], correct: 1 },
    { q: 'Combien de disciples Merlin a-t-il réunis pour bâtir l\'école ?', answers: ['3', '4', '5', '7'], correct: 2 },
    { q: 'Combien de ces disciples ont fondé une maison ?', answers: ['3', '4', '5', '2'], correct: 1 },
    { q: 'Quelle fondatrice a sauvé un phénix des flammes noires ?', answers: ['Lyra Aérion', 'Maëve Arden', 'Isandro Tanora', 'Lyra Hydras'], correct: 1 },
    { q: 'Quelle créature est associée à la maison Hydras ?', answers: ['Un dragon', 'Une hydre', 'Un serpent', 'Un kraken'], correct: 1 },
    { q: "Comment Aldéric Hydras a-t-il vaincu l'hydre ?", answers: ['Par la force', 'En la piégeant', 'En parlant à chaque tête et en jouant sur leurs rivalités', "Grâce à un sortilège de Merlin"], correct: 2 },
    { q: 'Quelle fondatrice a appris le langage des hippogriffes ?', answers: ['Maëve Arden', 'Lyra Aérion', 'Isandro Tanora', 'Grim Blackwood'], correct: 1 },
    { q: 'Quel grand sortilège Lyra Aérion a-t-elle créé ?', answers: ['Le sortilège du phénix', 'Le sortilège de brume qui cache l\'île', 'Le pacte de l\'hydre', 'Le Gel'], correct: 1 },
    { q: 'Quelle créature accompagne Isandro Tanora ?', answers: ['Un hibou', 'Un phénix', 'Un tanuki (esprit métamorphe)', 'Un hippogriffe'], correct: 2 },
    { q: "Combien d'années Isandro a-t-il passé à réparer les fondations de l'école ?", answers: ['1 an', '3 ans', '7 ans', '10 ans'], correct: 2 },
    { q: 'Quelle maison honore "ceux qui restent, travaillent et rient malgré tout" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 3 },
    { q: 'Quelle maison honore "ceux qui avancent quand tout brûle" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 0 },
    { q: 'Comment était surnommé Grim Blackwood avant que son nom ne soit révélé ?', answers: ['Le Traître', 'Le Cinquième Disciple', "L'Ombre", 'Le Voilé'], correct: 1 },
    { q: 'Quelle question obsédait Grim Blackwood ?', answers: ["Comment vaincre l'hydre ?", 'Pourquoi nous cachons-nous ?', 'Qui est le plus doué ?', 'Où est le Voile ?'], correct: 1 },
    { q: 'Comment s\'appelle la bataille finale entre Grim et les quatre fondateurs ?', answers: ['La Bataille de Brumelune', 'La Bataille des Cendres', 'Le Siège du Voile', 'La Nuit Noire'], correct: 1 },
    { q: "Qu'est-il arrivé aux quatre fondateurs lors de cette bataille ?", answers: ['Ils ont banni Grim', 'Ils sont morts au combat, ensemble', 'Ils ont fui', 'Ils ont scellé le Voile'], correct: 1 },
    { q: 'Qu\'est devenu Merlin après la mort de ses disciples ?', answers: ['Il a fondé une nouvelle école', 'Il a marché seul vers la forêt et n\'est jamais revenu', 'Il a emprisonné Grim', 'Il est resté diriger l\'école'], correct: 1 },
    { q: "Quelle école sœur de Lunaria a été fondée sur le continent ?", answers: ['Voilenoire', 'Arcanhem', 'Brumelune', 'Tanoria'], correct: 1 },
    { q: "Qu'est-il arrivé à Arcanhem il y a cent ans ?", answers: ['Elle a brûlé', 'Elle a été dévorée par la brume noire, élèves compris', 'Elle a fermé faute d\'élèves', 'Elle a fusionné avec Lunaria'], correct: 1 },
    { q: 'Comment s\'appelle le cercle de mages noirs fondé par Grim ?', answers: ['Les Ombres', 'Les Voilés', 'Les Cendres', 'Le Gel'], correct: 1 },
    { q: 'Quelle stratégie les Voilés ont-ils utilisée contre Lunaria ?', answers: ['Attaquer les élèves', 'Assassiner/corrompre les professeurs un à un', 'Détruire le Voile directement', 'Négocier avec le gouvernement'], correct: 1 },
    { q: "Comment s'appelle la période de cent ans sans écoles de magie ?", answers: ['Le Grand Silence', 'Le Siècle Noir', 'L\'Âge du Voile', 'La Grande Fermeture'], correct: 1 },
    { q: 'Comment s\'appelle la loi interdisant toute pratique magique non encadrée durant cette période ?', answers: ['Le Sceau', 'Le Gel', 'L\'Interdit', 'Le Voile Noir'], correct: 1 },
    { q: 'Qui est le nouveau directeur chargé de rouvrir Lunaria ?', answers: ['Merlin', 'Grim', 'Makarov', 'Aldéric'], correct: 2 },
    { q: 'Quel âge minimum faut-il pour intégrer la nouvelle Lunaria ?', answers: ['16 ans', '18 ans', '21 ans', 'Aucune limite'], correct: 1 },
    { q: 'Que cherche "quelqu\'un" dans la brume, selon les rumeurs ?', answers: ['Le corps de Merlin', 'Les quatre reliques des fondateurs qui maintiennent le Voile', "L'entrée d'Arcanhem", 'Le tanuki'], correct: 1 },
  ];

  const QUIZ_LENGTH = 10;
  const QUIZ_BEST_SCORE_KEY = 'lunaria-quiz-best';
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function updateQuizBestScoreDisplay() {
    const best = localStorage.getItem(QUIZ_BEST_SCORE_KEY);
    quizBestScoreEl.textContent = best ? `Meilleur score : ${best} / ${QUIZ_LENGTH}` : '';
  }

  function renderQuizQuestion() {
    const current = quizQuestions[quizIndex];
    quizProgressText.textContent = `Question ${quizIndex + 1} / ${quizQuestions.length}`;
    quizProgressFill.style.width = `${(quizIndex / quizQuestions.length) * 100}%`;
    quizQuestionText.textContent = current.q;
    quizAnswersEl.innerHTML = '';
    current.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn quiz-answer-btn';
      btn.textContent = answer;
      btn.addEventListener('click', () => handleQuizAnswer(i, btn));
      quizAnswersEl.appendChild(btn);
    });
  }

  function handleQuizAnswer(index, btn) {
    const current = quizQuestions[quizIndex];
    const buttons = quizAnswersEl.querySelectorAll('.quiz-answer-btn');
    buttons.forEach((b) => { b.disabled = true; });
    if (index === current.correctIndex) {
      btn.classList.add('correct');
      quizScore += 1;
    } else {
      btn.classList.add('incorrect');
      buttons[current.correctIndex].classList.add('correct');
    }
    setTimeout(() => {
      quizIndex += 1;
      if (quizIndex < quizQuestions.length) {
        renderQuizQuestion();
      } else {
        showQuizResult();
      }
    }, 1100);
  }

  function showQuizResult() {
    quizQuestionEl.classList.add('hidden');
    quizResultEl.classList.remove('hidden');
    quizProgressFill.style.width = '100%';
    const total = quizQuestions.length;
    quizResultScore.textContent = `${quizScore} / ${total} bonnes réponses`;

    let title;
    if (quizScore === total) title = '✦ Score parfait ! Un vrai sorcier de Lunaria. ✦';
    else if (quizScore >= total * 0.7) title = 'Bien joué !';
    else if (quizScore >= total * 0.4) title = 'Pas mal, révise un peu le lore !';
    else title = "Retourne lire l'histoire de Brumelune...";
    quizResultTitle.textContent = title;

    const best = Number(localStorage.getItem(QUIZ_BEST_SCORE_KEY) || 0);
    if (quizScore > best) {
      localStorage.setItem(QUIZ_BEST_SCORE_KEY, String(quizScore));
    }
    updateQuizBestScoreDisplay();
  }

  function startQuiz() {
    const pool = shuffle(QUIZ_QUESTIONS).slice(0, QUIZ_LENGTH);
    quizQuestions = pool.map((item) => {
      const correctText = item.answers[item.correct];
      const shuffledAnswers = shuffle(item.answers);
      return { q: item.q, answers: shuffledAnswers, correctIndex: shuffledAnswers.indexOf(correctText) };
    });
    quizIndex = 0;
    quizScore = 0;
    quizStartEl.classList.add('hidden');
    quizResultEl.classList.add('hidden');
    quizQuestionEl.classList.remove('hidden');
    renderQuizQuestion();
  }

  // Les réglages de la page Paramètres (hors chemin FiveM et taille d'écran, qui
  // s'appliquent immédiatement) ne sont persistés qu'au clic sur "Sauvegarder" : les
  // contrôles modifient seulement ce brouillon + un aperçu visuel le cas échéant.
  let confirmedSettings = { introEnabled: true, autoLaunch: false, autoConnect: false, theme: 'gold', lowPowerMode: false };
  let draftSettings = { ...confirmedSettings };

  function applyLowPower(enabled) {
    document.body.classList.toggle('low-power', enabled);
    setParticlesLowPower(enabled);
  }

  function populateSettingsUI() {
    draftSettings = { ...confirmedSettings };
    toggleIntroEnabled.checked = draftSettings.introEnabled !== false;
    toggleAutoLaunch.checked = Boolean(draftSettings.autoLaunch);
    toggleAutoConnect.checked = Boolean(draftSettings.autoConnect);
    toggleLowPower.checked = Boolean(draftSettings.lowPowerMode);
    applyTheme(draftSettings.theme || 'gold');
    settingsSaveStatus.classList.remove('visible');
    checkUpdateDesc.textContent = DEFAULT_UPDATE_DESC;
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

  // N'affiche la cascade d'apparition qu'une seule fois (premier affichage réel de la
  // vue principale) - pas à chaque retour depuis les Paramètres, ce qui serait répétitif.
  let mainEntranceDone = false;

  function activateView(view) {
    ALL_VIEWS.forEach((v) => v.classList.remove('active', 'leaving'));
    view.classList.add('active');
    if (view === viewMain && !mainEntranceDone) {
      mainEntranceDone = true;
      viewMain.classList.add('main-entrance');
      setTimeout(() => viewMain.classList.remove('main-entrance'), 1400);
    }
    if (view === viewSettings) {
      viewSettings.classList.add('settings-entrance');
      setTimeout(() => viewSettings.classList.remove('settings-entrance'), 900);
    }
    maybeStartAutoConnect();
    maybeStartMusic();
  }

  // Fondu enchaîné (fondu de sortie court, puis l'entrée classique view-in) entre les
  // vues qu'on traverse en va-et-vient pendant l'usage normal (menu, Paramètres, Quiz).
  // L'intro garde son comportement instantané d'origine.
  const FADEABLE_VIEWS = [viewMain, viewSettings, viewQuiz];

  function showView(view) {
    const current = ALL_VIEWS.find((v) => v.classList.contains('active') && v !== view);
    const isFadeSwap = current && FADEABLE_VIEWS.includes(current) && FADEABLE_VIEWS.includes(view);

    if (isFadeSwap) {
      current.classList.add('leaving');
      setTimeout(() => activateView(view), 180);
    } else {
      activateView(view);
    }
  }

  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    themeSwatches.forEach((sw) => sw.classList.toggle('active', sw.dataset.theme === t));
    brandLogo.src = `${assetsBase}/images/${THEME_LOGOS[t] || THEME_LOGOS.gold}`;
    // Le reflet du logo (.brand::after) est masqué à cette même image pour rester
    // cantonné aux lettres visibles - doit rester synchronisé à chaque changement de thème.
    brandEl.style.setProperty('--logo-mask', `url(${brandLogo.src})`);
  }

  // Utilisé uniquement pour un changement de thème déclenché par l'utilisateur (clic sur
  // un swatch) : applyTheme() seul reste instantané pour le boot/la revue des paramètres,
  // où une transition serait un flash indésirable plutôt qu'un effet voulu.
  function previewTheme(t) {
    draftSettings.theme = t;
    themeVeil.classList.add('active');
    setTimeout(() => {
      applyTheme(t);
      setTimeout(() => themeVeil.classList.remove('active'), 220);
    }, 140);
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
  confirmedSettings.lowPowerMode = Boolean(lowPowerMode);
  applyTheme(confirmedSettings.theme);
  document.body.classList.toggle('low-power', confirmedSettings.lowPowerMode);
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

  openQuizBtn.addEventListener('click', () => {
    quizStartEl.classList.remove('hidden');
    quizQuestionEl.classList.add('hidden');
    quizResultEl.classList.add('hidden');
    updateQuizBestScoreDisplay();
    showView(viewQuiz);
  });
  closeQuizBtn.addEventListener('click', () => showView(viewMain));
  quizStartBtn.addEventListener('click', startQuiz);
  quizReplayBtn.addEventListener('click', startQuiz);
  quizBackBtn.addEventListener('click', () => showView(viewMain));
  closeSettingsBtn.addEventListener('click', () => {
    // Reviens à l'état confirmé si on quitte sans sauvegarder (ex : thème/mode faible
    // consommation prévisualisés).
    applyTheme(confirmedSettings.theme || 'gold');
    applyLowPower(confirmedSettings.lowPowerMode);
    showView(viewMain);
  });

  replayIntroBtn.addEventListener('click', () => {
    playIntro();
  });

  function renderStatus(status) {
    statusSkeleton.classList.add('hidden');
    statusText.classList.remove('hidden');
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

  playButton.addEventListener('mousemove', (e) => {
    const rect = playButton.getBoundingClientRect();
    playButton.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    playButton.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });

  // Traînée de particules qui suit le curseur (limitée au menu principal, avec un
  // throttle pour éviter de spawn une particule à chaque pixel de mousemove).
  let lastTrailTime = 0;
  document.addEventListener('mousemove', (e) => {
    if (!viewMain.classList.contains('active')) return;
    const now = performance.now();
    if (now - lastTrailTime < 45) return;
    lastTrailTime = now;
    spawnTrail(e.clientX, e.clientY);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (!viewMain.classList.contains('active')) return;
    if (!modal.classList.contains('hidden')) return;
    if (!whatsNewModal.classList.contains('hidden')) return;
    if (playButton.disabled) return;
    playButton.click();
  });

  playButton.addEventListener('click', async () => {
    playButton.disabled = true;
    playButton.textContent = 'CONNEXION...';
    portalEl.classList.add('connecting');
    const rect = playButton.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    const result = await window.lunaria.play();
    if (!result.installed) {
      modal.classList.remove('hidden');
      playButton.disabled = false;
      playButton.textContent = 'JOUER';
      portalEl.classList.remove('connecting');
      return;
    }
    // FiveM prend le relais : on referme le launcher pour laisser la place au jeu.
    // Si FiveM tourne déjà, la connexion est quasi immédiate (pas de redémarrage du jeu).
    // Sinon, GTA V doit démarrer à froid (moteur, shaders, montage des ressources du
    // serveur) - ce délai (1 à 3 min) vient de FiveM/GTA V, pas du launcher.
    playButton.textContent = result.alreadyRunning ? 'CONNEXION...' : 'DÉMARRAGE DE FIVEM...';
    document.body.classList.add('portal-opening');
    setTimeout(() => window.lunaria.quit(), 900);
  });

  copyServerBtn.addEventListener('click', async () => {
    if (!serverAddress) return;
    try {
      await navigator.clipboard.writeText(`connect ${serverAddress}`);
      copyServerBtn.textContent = '✅';
      copyServerBtn.classList.add('copied');
      setTimeout(() => {
        copyServerBtn.textContent = '📋';
        copyServerBtn.classList.remove('copied');
      }, 1500);
    } catch {
      // Presse-papier indisponible : pas critique, on ignore silencieusement.
    }
  });

  whatsNewClose.addEventListener('click', () => {
    whatsNewModal.classList.add('hidden');
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

  updateRestartBtn.addEventListener('click', () => {
    window.lunaria.installUpdate();
  });

  checkUpdateBtn.addEventListener('click', () => {
    checkUpdateBtn.disabled = true;
    checkUpdateDesc.textContent = 'Vérification en cours...';
    window.lunaria.checkForUpdates();
  });

  window.lunaria.onUpdateStatus((status) => {
    switch (status.state) {
      case 'checking':
        checkUpdateDesc.textContent = 'Vérification en cours...';
        break;
      case 'available':
        updateBannerText.textContent = `Mise à jour ${status.version} disponible, téléchargement...`;
        updateRestartBtn.classList.add('hidden');
        updateBanner.classList.remove('hidden');
        checkUpdateDesc.textContent = `Mise à jour ${status.version} disponible, téléchargement...`;
        checkUpdateBtn.disabled = false;
        break;
      case 'downloading':
        updateBannerText.textContent = `Téléchargement de la mise à jour... ${status.percent}%`;
        updateRestartBtn.classList.add('hidden');
        updateBanner.classList.remove('hidden');
        checkUpdateDesc.textContent = `Téléchargement... ${status.percent}%`;
        break;
      case 'downloaded':
        updateBannerText.textContent = `Mise à jour ${status.version} prête.`;
        updateRestartBtn.classList.remove('hidden');
        updateBanner.classList.remove('hidden');
        checkUpdateDesc.textContent = `Mise à jour ${status.version} prête — redémarre pour l'installer.`;
        checkUpdateBtn.disabled = false;
        break;
      case 'not-available':
        updateBanner.classList.add('hidden');
        checkUpdateDesc.textContent = 'Aucune mise à jour disponible. Tu utilises déjà la dernière version.';
        checkUpdateBtn.disabled = false;
        break;
      case 'error':
        updateBanner.classList.add('hidden');
        checkUpdateDesc.textContent = 'Impossible de vérifier les mises à jour pour le moment.';
        checkUpdateBtn.disabled = false;
        break;
    }
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

  toggleLowPower.addEventListener('change', () => {
    draftSettings.lowPowerMode = toggleLowPower.checked;
    applyLowPower(draftSettings.lowPowerMode); // aperçu visuel immédiat, persisté seulement au Save
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
        window.lunaria.setLowPowerMode(draftSettings.lowPowerMode),
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
      previewTheme(sw.dataset.theme); // aperçu visuel immédiat, persisté seulement au Save
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
    let lowPower = confirmedSettings.lowPowerMode;

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
      if (lowPower) {
        particles = [];
        return;
      }
      const count = Math.min(70, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({ ...makeParticle(), y: Math.random() * height }));
    }

    // Étincelles éphémères (au clic sur JOUER) : distinctes de la poussière magique
    // ambiante (p.burst), retirées du tableau une fois éteintes plutôt que recyclées.
    function makeBurstParticle(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 2.8;
      return {
        burst: true,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 2,
        alpha: 0.9,
        decay: 0.018 + Math.random() * 0.02,
        hue: '241,207,127',
      };
    }

    // Traînée continue au survol : particules très légères, sans shadowBlur (coût CPU
    // minime malgré la fréquence d'apparition), qui rétrécissent en s'effaçant.
    function makeTrailParticle(x, y) {
      return {
        trail: true,
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        r: 1 + Math.random() * 1.4,
        alpha: 0.55,
        decay: 0.02 + Math.random() * 0.015,
        hue: Math.random() > 0.5 ? '241,207,127' : '233,224,242',
      };
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      if (lowPower) {
        requestAnimationFrame(tick);
        return;
      }
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];

        if (p.burst || p.trail) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (p.trail ? p.alpha / 0.55 : 1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
          if (p.burst) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${p.hue},${p.alpha})`;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          continue;
        }

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

    spawnBurst = (x, y) => {
      if (lowPower) return;
      for (let i = 0; i < 20; i += 1) {
        particles.push(makeBurstParticle(x, y));
      }
    };

    spawnTrail = (x, y) => {
      if (lowPower) return;
      particles.push(makeTrailParticle(x, y));
    };

    setParticlesLowPower = (enabled) => {
      lowPower = enabled;
      if (enabled) {
        particles = [];
      } else {
        // Repeuple la poussière magique ambiante en sortant du mode faible consommation :
        // sans ça, le tableau reste vide indéfiniment (rien ne le repeuple tout seul).
        init();
      }
    };
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
    serverAddress = (initData.config && initData.config.connectFallback) || '';

    autoConnectEnabled = confirmedSettings.autoConnect;
    autoConnectSettingLoaded = true;
    maybeStartAutoConnect();

    const news = await window.lunaria.getNews();
    renderNews(news);

    const whatsNew = await window.lunaria.getWhatsNew();
    if (whatsNew) {
      whatsNewTitle.textContent = `Quoi de neuf — Version ${whatsNew.version}`;
      whatsNewBody.textContent = whatsNew.notes && whatsNew.notes.trim()
        ? whatsNew.notes
        : 'Cette version apporte des corrections et améliorations.';
      whatsNewModal.classList.remove('hidden');
    }
  }

  initParticles();
  init();
})();
