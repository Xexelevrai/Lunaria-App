(() => {
  const viewIntro = document.getElementById('view-intro');
  const viewMain = document.getElementById('view-main');
  const viewSettings = document.getElementById('view-settings');
  const viewQuiz = document.getElementById('view-quiz');
  const viewFaq = document.getElementById('view-faq');
  const viewLore = document.getElementById('view-lore');
  const viewBoutique = document.getElementById('view-boutique');
  const viewReglement = document.getElementById('view-reglement');
  const ALL_VIEWS = [viewIntro, viewMain, viewSettings, viewQuiz, viewFaq, viewLore, viewBoutique, viewReglement];

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
  const unsavedSettingsModal = document.getElementById('modal-unsaved-settings');
  const unsavedDiscardBtn = document.getElementById('unsaved-discard-btn');
  const unsavedCancelBtn = document.getElementById('unsaved-cancel-btn');
  const unsavedSaveBtn = document.getElementById('unsaved-save-btn');

  const saveSettingsBtn = document.getElementById('save-settings');
  const settingsSaveStatus = document.getElementById('settings-save-status');
  const appVersionEl = document.getElementById('app-version');

  const checkUpdateBtn = document.getElementById('check-update-btn');
  const checkUpdateDesc = document.getElementById('check-update-desc');
  const DEFAULT_UPDATE_DESC = 'Vérifier manuellement si une nouvelle version est disponible.';

  const clearCacheBtn = document.getElementById('clear-cache-btn');
  const clearCacheDesc = document.getElementById('clear-cache-desc');
  const DEFAULT_CLEAR_CACHE_DESC = "Supprime les fichiers temporaires de FiveM (ressources téléchargées, logs). Rien d'important n'est perdu.";
  const clearCacheModal = document.getElementById('modal-clear-cache');
  const clearCacheCancelBtn = document.getElementById('clear-cache-cancel-btn');
  const clearCacheConfirmBtn = document.getElementById('clear-cache-confirm-btn');
  const closeFivemModal = document.getElementById('modal-close-fivem');
  const closeFivemCancelBtn = document.getElementById('close-fivem-cancel-btn');
  const closeFivemConfirmBtn = document.getElementById('close-fivem-confirm-btn');

  const toggleLowPower = document.getElementById('toggle-low-power');
  const statusSkeleton = document.getElementById('status-skeleton');

  const openFaqBtn = document.getElementById('open-faq');
  const closeFaqBtn = document.getElementById('close-faq');
  const faqDiscordBtn = document.getElementById('faq-discord-btn');

  const openLoreBtn = document.getElementById('open-lore');
  const closeLoreBtn = document.getElementById('close-lore');

  const openBoutiqueBtn = document.getElementById('open-boutique');
  const closeBoutiqueBtn = document.getElementById('close-boutique');
  const boutiqueCategoriesEl = document.getElementById('boutique-categories');
  const boutiqueGrid = document.getElementById('boutique-grid');

  const openReglementBtn = document.getElementById('open-reglement');
  const closeReglementBtn = document.getElementById('close-reglement');

  const openQuizBtn = document.getElementById('open-quiz');
  const closeQuizBtn = document.getElementById('close-quiz');
  const quizBrandLogo = document.getElementById('quiz-brand-logo');
  const quizLeaveModal = document.getElementById('modal-quiz-leave');
  const quizLeaveCancelBtn = document.getElementById('quiz-leave-cancel-btn');
  const quizLeaveConfirmBtn = document.getElementById('quiz-leave-confirm-btn');
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
  const quizExplanationEl = document.getElementById('quiz-explanation');
  const quizExplanationTimerEl = document.getElementById('quiz-explanation-timer');
  const quizExplanationTimerFill = document.getElementById('quiz-explanation-timer-fill');
  const quizJokerBtn = document.getElementById('quiz-joker-btn');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizRuneProgressFill = document.getElementById('quiz-rune-progress-fill');
  const quizCorrectSound = document.getElementById('quiz-correct-sound');
  const quizWrongSound = document.getElementById('quiz-wrong-sound');

  const displayModeButtons = document.querySelectorAll('.display-mode-btn');

  const autoconnectBanner = document.getElementById('autoconnect-banner');
  const autoconnectCount = document.getElementById('autoconnect-count');
  const autoconnectCancelBtn = document.getElementById('autoconnect-cancel');

  const bgMusic = document.getElementById('bg-music');
  const quizMusic = document.getElementById('quiz-music');
  const faqMusic = document.getElementById('faq-music');
  const loreMusic = document.getElementById('lore-music');
  const boutiqueMusic = document.getElementById('boutique-music');
  const reglementMusic = document.getElementById('reglement-music');
  const settingsMusic = document.getElementById('settings-music');
  const clickSound = document.getElementById('click-sound');
  const muteToggleBtn = document.getElementById('mute-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  const audioControlsEl = document.querySelector('.audio-controls');

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
  let spawnDraw = () => {};
  let setParticlesLowPower = () => {};
  let setParticlesTheme = () => {};
  let serverAddress = '';

  const { assetsBase, introEnabled, theme, musicVolume, musicMuted, lowPowerMode } = window.lunaria.bootData;

  const THEME_LOGOS = {
    gold: 'logo.png',
    silver: 'logo2.png',
    dark: 'logo3.png',
  };

  // Piste de musique du menu principal selon le thème - seul le thème sombre a sa propre
  // ambiance (Background-dark.mp3) ; les autres partagent la piste par défaut.
  const MENU_MUSIC_TRACKS = {
    gold: 'background.mp3',
    silver: 'background.mp3',
    dark: 'Background-dark.mp3',
  };
  let currentMenuMusicTrack = null;

  function applyMenuMusicForTheme(t) {
    const track = MENU_MUSIC_TRACKS[t] || MENU_MUSIC_TRACKS.gold;
    if (track === currentMenuMusicTrack) return;
    currentMenuMusicTrack = track;
    const wasPlaying = !bgMusic.paused;
    bgMusic.src = `${assetsBase}/audio/${track}`;
    if (wasPlaying) {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {});
    }
  }

  const DARK_THEME_UNLOCK_KEY = 'lunaria-dark-theme-unlocked';
  const darkThemeSwatch = document.querySelector('.theme-swatch-dark');

  function isDarkThemeUnlocked() {
    return localStorage.getItem(DARK_THEME_UNLOCK_KEY) === '1';
  }

  function refreshDarkThemeSwatchLock() {
    const unlocked = isDarkThemeUnlocked();
    darkThemeSwatch.classList.toggle('locked', !unlocked);
    darkThemeSwatch.disabled = !unlocked;
  }

  function unlockDarkTheme() {
    if (isDarkThemeUnlocked()) return;
    localStorage.setItem(DARK_THEME_UNLOCK_KEY, '1');
    refreshDarkThemeSwatchLock();
  }

  refreshDarkThemeSwatchLock();

  // Banque de questions du quiz, tirée du lore "Brumelune & Lunaria — Guide de l'élève".
  // `correct` est l'index (dans `answers`) de la bonne réponse ; les réponses sont
  // mélangées à chaque partie dans startQuiz(), donc l'ordre ci-dessous n'a pas d'importance.
  // `exp` : explication affichée après la réponse, reformulée uniquement à partir du texte
  // du lore fourni par l'utilisateur ("Guide de l'élève") - rien d'inventé.
  const QUIZ_QUESTIONS = [
    { q: "Comment s'appelle l'île où se trouve l'Académie Lunaria ?", answers: ['Arcanhem', 'Brumelune', 'Avalon', 'Eldoria'], correct: 1, exp: "L'Académie Lunaria se dresse sur l'île de Brumelune, terre ancestrale du monde magique dissimulée aux non-mages." },
    { q: "Qu'est-ce que le Voile ?", answers: ['Une école secrète', 'Un portail magique', 'Un enchantement qui cache Brumelune aux non-mages', 'Une créature légendaire'], correct: 2, exp: "Le Voile est l'enchantement millénaire qui rend Brumelune invisible aux yeux de ceux qui ne portent pas la magie en eux." },
    { q: 'Que risque le monde magique si le Voile disparaît ?', answers: ['Plus personne ne pourra lancer de sorts', 'Les maisons disparaîtront', 'Le monde magique sera révélé aux non-mages', "Les créatures quitteront l'île"], correct: 2, exp: "Si le Voile se déchire, tout ce que les sorciers sont serait exposé aux non-mages." },
    { q: 'Que représente principalement le Secret ?', answers: ['Une tradition', 'Une coutume', 'Une loi interdisant de révéler la magie aux non-mages', 'Un serment réservé aux professeurs'], correct: 2, exp: "Le Secret n'est pas une coutume mais une loi : nul ne révèle la magie à un non-mage." },
    { q: "Que trouve-t-on de l'autre côté du Voile ?", answers: ['Un désert', "L'entre-monde de brume", 'Une autre école', 'Le royaume des dragons'], correct: 1, exp: "Au-delà du Voile s'étend un entre-monde de brume, un océan de magie brute, informe et affamée." },
    { q: "Que dit-on des personnes qui s'aventurent dans la brume ?", answers: ['Elles deviennent plus puissantes', 'Elles trouvent des trésors', 'Elles reviennent toujours', 'Elles ne reviennent pas toutes'], correct: 3, exp: "On enseigne seulement que la brume n'est pas un décor, et que ceux qui s'y aventurent ne reviennent pas tous." },
    { q: "Qui a fondé l'Académie Lunaria ?", answers: ['Makarov', 'Aldéric Hydras', 'Merlin', 'Maëve Arden'], correct: 2, exp: "Merlin fonda l'Académie Lunaria sur Brumelune et en devint le premier directeur." },
    { q: 'Quel était le rêve de Merlin ?', answers: ['Créer une armée de mages', 'Enseigner la magie à tous', 'Détruire Arcanhem', 'Gouverner Brumelune'], correct: 1, exp: "Merlin rêvait d'un lieu où la magie s'enseignerait à tous, plutôt que de maître à apprenti dans le secret." },
    { q: 'Qui a construit les maisons de Lunaria ?', answers: ['Les élèves', 'Les quatre disciples de Merlin', 'Le gouvernement magique', 'Les dragons'], correct: 1, exp: "Quatre des disciples de Merlin fondèrent chacun une maison à son image." },
    { q: 'Combien de maisons compte Lunaria ?', answers: ['Trois', 'Quatre', 'Cinq', 'Six'], correct: 1, exp: "Lunaria compte quatre maisons : Arden, Hydras, Aérion et Tanora." },
    { q: 'Quel élément est associé à Arden ?', answers: ['Eau', 'Terre', 'Air', 'Feu'], correct: 3, exp: "La maison Arden est liée au feu et au phénix, fondée par Maëve Arden." },
    { q: 'Quelle créature représente Arden ?', answers: ["L'Hydre", 'Le Tanuki', 'Le Phénix', "L'Hippogriffe"], correct: 2, exp: "Le phénix de Maëve Arden n'a jamais quitté l'île ; sa lignée veille toujours sur Lunaria." },
    { q: 'Quelle qualité caractérise principalement la maison Hydras ?', answers: ['La patience et la ruse', 'La force physique', 'La curiosité', 'La créativité'], correct: 0, exp: "La maison Hydras est décrite comme la maison de la ruse et de la patience." },
    { q: 'Avec quelle créature Aldéric Hydras a-t-il conclu un pacte ?', answers: ['Un dragon', 'Une hydre', 'Un griffon', 'Un phénix'], correct: 1, exp: "Aldéric n'a jamais vaincu l'hydre des récifs : il a négocié avec elle, et le pacte tient encore." },
    { q: 'Quel élément est associé à Aérion ?', answers: ['Terre', 'Air', 'Eau', 'Feu'], correct: 1, exp: "La maison Aérion est liée à l'air et à l'hippogriffe, fondée par Lyra Aérion." },
    { q: 'Que fit Lyra Aérion durant un hiver entier ?', answers: ['Elle affronta un dragon', 'Elle étudia la langue des hippogriffes', 'Elle reconstruisit Lunaria', 'Elle créa le Voile'], correct: 1, exp: "Lyra passa un hiver entier sur les falaises du nord, sans baguette, à apprendre la langue silencieuse des hippogriffes." },
    { q: 'Quel élément représente Tanora ?', answers: ['Air', 'Eau', 'Terre', 'Feu'], correct: 2, exp: "La maison Tanora est liée à la terre et au tanuki, fondée par Isandro Tanora." },
    { q: 'Quelle créature est liée à Tanora ?', answers: ['Le Tanuki', 'Le Basilic', 'Le Loup', 'Le Cerf'], correct: 0, exp: "Un vieux tanuki métamorphe, qui prenait chaque jour un visage différent, accompagnait Isandro." },
    { q: 'Combien de temps Isandro Tanora passa-t-il à consolider les fondations ?', answers: ['Trois ans', 'Cinq ans', 'Sept ans', 'Dix ans'], correct: 2, exp: "Isandro passa sept ans sous l'école à souder la roche pendant que les autres élevaient les tours." },
    { q: 'Quelle seconde école magique existait autrefois ?', answers: ['Avalon', 'Arcanhem', 'Camelot', 'Brumedor'], correct: 1, exp: "Arcanhem était l'école sœur de Lunaria, située sur le continent." },
    { q: 'Que devint Arcanhem ?', answers: ['Elle fut déplacée', 'Elle fusionna avec Lunaria', 'Elle disparut en une nuit', 'Elle fut détruite par un dragon'], correct: 2, exp: "Arcanhem disparut en une seule nuit d'hiver, sans qu'il ne reste ni bâtiment, ni élèves, ni explication officielle." },
    { q: 'Pourquoi Lunaria fut-elle fermée ?', answers: ['Une épidémie', "Le manque d'élèves", 'Les professeurs furent assassinés, corrompus ou disparurent', 'Le Voile fut détruit'], correct: 2, exp: "Les professeurs de Lunaria furent assassinés, corrompus ou disparus, un à un, ce qui décapita l'école et força sa fermeture." },
    { q: "Qu'est-ce que le Gel ?", answers: ['Une saison magique', "L'interdiction de pratiquer la magie sans encadrement", 'Un sort de protection', 'Une prison'], correct: 1, exp: "Le Gel est l'interdiction de toute pratique magique non encadrée, imposée par le gouvernement de la magie." },
    { q: 'Que durent faire la plupart des sorciers pendant le Gel ?', answers: ['Quitter Brumelune', 'Vivre comme des non-mages', 'Oublier la magie', 'Rejoindre Arcanhem'], correct: 1, exp: "Pendant le Gel, la plupart des sorciers durent vivre comme des non-mages, leur magie bridée, cachée ou ignorée." },
    { q: "Pourquoi Lunaria rouvre-t-elle aujourd'hui ?", answers: ['Pour organiser un tournoi', "Parce que le monde magique manque d'écoles", 'Pour remplacer le gouvernement', 'Pour accueillir les non-mages'], correct: 1, exp: "Lunaria rouvre parce que le monde magique manque cruellement d'écoles, après un siècle de silence." },
    { q: "Qui dirige la nouvelle Académie Lunaria ?", answers: ['Merlin', 'Isandro Tanora', 'Makarov', 'Lyra Aérion'], correct: 2, exp: "Le gouvernement de la magie a nommé Makarov nouveau directeur, chargé de rouvrir l'Académie." },
    { q: "Que se passe-t-il de nouveau sur Brumelune depuis la réouverture ?", answers: ['Les familles et les commerces reviennent', 'Les créatures disparaissent', 'Les maisons ferment', "Le Voile cesse d'exister"], correct: 0, exp: "Depuis la réouverture, les familles reviennent et les commerces rouvrent sur l'île." },
    { q: 'Quel âge ont les premiers élèves de la nouvelle Lunaria ?', answers: ['Entre 11 et 17 ans', 'À partir de 18 ans', 'À partir de 16 ans', "Sans limite d'âge"], correct: 1, exp: "Les premiers admis de la nouvelle Lunaria sont des adultes de 18 ans et plus." },
    { q: 'Sous quel régime les nouveaux élèves ont-ils grandi ?', answers: ['Sous le Voile', 'Sous Merlin', 'Sous le Gel', 'Sous les Fondateurs'], correct: 2, exp: "Les nouveaux élèves ont grandi pendant le Gel, sans formation ni guide." },
    { q: 'Selon le guide, comment découvre-t-on les plus grands secrets de Lunaria ?', answers: ['En lisant tous les manuels', 'En demandant au directeur', 'En jeu, au fil des découvertes et des archives', 'En rejoignant directement une maison'], correct: 2, exp: "Le guide le dit lui-même : les archives fermées, les rumeurs et les vieilles histoires ne se lisent pas, elles se découvrent en jeu." },
  ];

  const QUIZ_LENGTH = 10;
  const QUIZ_EXPLANATION_DELAY_MS = 7000;
  const QUIZ_BEST_SCORE_KEY = 'lunaria-quiz-best';
  const QUIZ_RING_CIRCUMFERENCE = 2 * Math.PI * 42;
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizJokerUsed = false;
  let quizAdvanceTimeout = null;

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

  // L'anneau suit la progression dans le quiz (questions répondues / total), en phase
  // avec le texte "Question X / Y" : il est donc plein une fois la dernière question
  // répondue, peu importe le score.
  function updateQuizRing(answeredCount) {
    const ratio = quizQuestions.length ? answeredCount / quizQuestions.length : 0;
    quizRuneProgressFill.style.strokeDashoffset = String(QUIZ_RING_CIRCUMFERENCE * (1 - ratio));
  }

  function renderQuizQuestion() {
    const current = quizQuestions[quizIndex];
    quizProgressText.textContent = `Question ${quizIndex + 1} / ${quizQuestions.length}`;
    updateQuizRing(quizIndex);
    quizQuestionText.textContent = current.q;
    // Redémarre l'animation d'apparition à chaque question : la classe doit être retirée
    // puis un reflow forcé avant de la remettre, sinon le navigateur fusionne les deux
    // changements et l'animation ne rejoue pas.
    quizQuestionText.classList.remove('quiz-question-text-anim');
    void quizQuestionText.offsetWidth;
    quizQuestionText.classList.add('quiz-question-text-anim');
    quizExplanationEl.classList.add('hidden');
    quizExplanationEl.textContent = '';
    quizExplanationTimerEl.classList.add('hidden');
    quizExplanationTimerFill.style.transition = 'none';
    quizExplanationTimerFill.style.width = '0%';
    quizNextBtn.classList.add('hidden');
    quizNextBtn.disabled = false;
    quizAnswersEl.innerHTML = '';
    current.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn quiz-answer-btn';
      btn.textContent = answer;
      btn.addEventListener('click', () => handleQuizAnswer(i, btn));
      quizAnswersEl.appendChild(btn);
    });
    quizJokerBtn.disabled = quizJokerUsed;
  }

  function handleQuizAnswer(index, btn) {
    const current = quizQuestions[quizIndex];
    const buttons = quizAnswersEl.querySelectorAll('.quiz-answer-btn');
    buttons.forEach((b) => { b.disabled = true; });
    quizJokerBtn.disabled = true;
    if (index === current.correctIndex) {
      btn.classList.add('correct');
      quizScore += 1;
      quizCorrectSound.currentTime = 0;
      quizCorrectSound.play().catch(() => {});
    } else {
      btn.classList.add('incorrect');
      buttons[current.correctIndex].classList.add('correct');
      quizWrongSound.currentTime = 0;
      quizWrongSound.play().catch(() => {});
    }
    updateQuizRing(quizIndex + 1);
    quizExplanationEl.textContent = current.exp;
    quizExplanationEl.classList.remove('hidden');

    // Jauge qui se remplit de gauche à droite sur toute la durée d'attente, pour montrer
    // visuellement quand la question suivante va arriver. Le reset (transition:none, 0%)
    // doit être suivi d'un reflow forcé avant de fixer la cible, sinon le navigateur
    // fusionne les deux changements et l'animation ne se joue jamais.
    quizExplanationTimerEl.classList.remove('hidden');
    quizExplanationTimerFill.style.transition = 'none';
    quizExplanationTimerFill.style.width = '0%';
    void quizExplanationTimerFill.offsetWidth;
    quizExplanationTimerFill.style.transition = `width ${QUIZ_EXPLANATION_DELAY_MS}ms linear`;
    quizExplanationTimerFill.style.width = '100%';
    quizNextBtn.classList.remove('hidden');

    quizAdvanceTimeout = setTimeout(advanceQuiz, QUIZ_EXPLANATION_DELAY_MS);
  }

  // Passe à la question suivante (ou au résultat) - appelé soit par le minuteur de
  // l'explication, soit immédiatement via le bouton "Passer". Le garde-fou sur
  // quizNextBtn.disabled évite qu'un double-clic (ou un clic pile au moment où le minuteur
  // se déclenche tout seul) ne fasse avancer le quiz de deux questions d'un coup - le
  // second appel tombait alors sur un bouton déjà masqué par le premier, ce qui pouvait
  // donner l'impression que "Passer" ne répondait plus.
  function advanceQuiz() {
    if (quizNextBtn.disabled) return;
    quizNextBtn.disabled = true;
    clearTimeout(quizAdvanceTimeout);
    quizIndex += 1;
    if (quizIndex < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  }

  function handleQuizJoker() {
    if (quizJokerUsed) return;
    const current = quizQuestions[quizIndex];
    const buttons = Array.from(quizAnswersEl.querySelectorAll('.quiz-answer-btn'));
    const wrongButtons = buttons.filter((b, i) => i !== current.correctIndex && !b.disabled);
    if (wrongButtons.length === 0) return;
    const toEliminate = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
    toEliminate.disabled = true;
    toEliminate.classList.add('revelio');
    quizJokerUsed = true;
    quizJokerBtn.disabled = true;
  }

  function showQuizResult() {
    quizQuestionEl.classList.add('hidden');
    quizResultEl.classList.remove('hidden');
    const total = quizQuestions.length;
    quizResultScore.textContent = `${quizScore} / ${total} bonnes réponses`;

    let title;
    if (quizScore === total) {
      const justUnlocked = !isDarkThemeUnlocked();
      unlockDarkTheme();
      title = justUnlocked
        ? '✦ Score parfait ! Thème Sombre débloqué à vie. ✦'
        : '✦ Score parfait ! Un vrai sorcier de Lunaria. ✦';
    } else if (quizScore >= total * 0.7) title = 'Bien joué !';
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
    clearTimeout(quizAdvanceTimeout);
    const pool = shuffle(QUIZ_QUESTIONS).slice(0, QUIZ_LENGTH);
    quizQuestions = pool.map((item) => {
      const correctText = item.answers[item.correct];
      const shuffledAnswers = shuffle(item.answers);
      return { q: item.q, exp: item.exp, answers: shuffledAnswers, correctIndex: shuffledAnswers.indexOf(correctText) };
    });
    quizIndex = 0;
    quizScore = 0;
    quizJokerUsed = false;
    updateQuizRing(0);
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
    clearCacheDesc.textContent = DEFAULT_CLEAR_CACHE_DESC;
  }

  introVideo.src = `${assetsBase}/video/intro.mp4`;
  bgMusic.src = `${assetsBase}/audio/background.mp3`;
  quizMusic.src = `${assetsBase}/audio/background-quizz.mp3`;
  faqMusic.src = `${assetsBase}/audio/background-faq.mp3`;
  loreMusic.src = `${assetsBase}/audio/background-Lore.mp3`;
  boutiqueMusic.src = `${assetsBase}/audio/Background-Boutique.mp3`;
  reglementMusic.src = `${assetsBase}/audio/background-reglement.mp3`;
  settingsMusic.src = `${assetsBase}/audio/parametre.mp3`;
  clickSound.src = `${assetsBase}/audio/click2.mp3`;
  quizCorrectSound.src = `${assetsBase}/audio/valider.mp3`;
  quizWrongSound.src = `${assetsBase}/audio/refuser.mp3`;

  // --- Musique de fond (démarre en arrivant sur la vue principale, jamais pendant l'intro) ---
  // musicTargetVolume/musicIsMuted sont la source de vérité pour le volume "voulu" par
  // l'utilisateur : bgMusic et quizMusic s'y réfèrent tous les deux, y compris pendant un
  // fondu (où .volume s'écarte temporairement de la cible le temps de la transition).
  let musicStarted = false;
  let musicTargetVolume = Math.min(100, Math.max(0, musicVolume ?? 25)) / 100;
  let musicIsMuted = Boolean(musicMuted);
  bgMusic.volume = musicTargetVolume;
  bgMusic.muted = musicIsMuted;
  quizMusic.volume = 0;
  quizMusic.muted = musicIsMuted;
  faqMusic.volume = 0;
  faqMusic.muted = musicIsMuted;
  loreMusic.volume = 0;
  loreMusic.muted = musicIsMuted;
  boutiqueMusic.volume = 0;
  boutiqueMusic.muted = musicIsMuted;
  reglementMusic.volume = 0;
  reglementMusic.muted = musicIsMuted;
  // settingsMusic remplace bgMusic (qui se tait) le temps des Paramètres, via le même
  // fondu croisé que les autres vues - voir openSettingsBtn/leaveSettingsView plus bas.
  settingsMusic.volume = 0;
  settingsMusic.muted = musicIsMuted;
  volumeSlider.value = String(musicVolume ?? 25);
  volumeSlider.style.setProperty('--volume-pct', `${volumeSlider.value}%`);
  audioControlsEl.classList.toggle('is-muted', musicIsMuted);

  // L'icône reflète le niveau réel (coupé/faible/moyen/fort) plutôt qu'un simple bascule
  // muet/non-muet : plus lisible d'un coup d'œil, et cohérent même quand le volume est
  // descendu à 0 via le curseur sans que "muet" soit activé.
  function updateVolumeIcon() {
    if (musicIsMuted || musicTargetVolume <= 0) {
      muteToggleBtn.textContent = '🔇';
    } else if (musicTargetVolume < 0.34) {
      muteToggleBtn.textContent = '🔈';
    } else if (musicTargetVolume < 0.67) {
      muteToggleBtn.textContent = '🔉';
    } else {
      muteToggleBtn.textContent = '🔊';
    }
  }
  updateVolumeIcon();

  function maybeStartMusic() {
    if (musicStarted || !viewMain.classList.contains('active')) return;
    musicStarted = true;
    bgMusic.play().catch(() => {
      // Autoplay bloqué : la musique démarrera au premier clic de l'utilisateur. Le
      // déclencheur est retardé de 250ms (au-delà du fondu de 180ms entre vues) avant de
      // relire l'état réel : sinon, si ce tout premier clic navigue ailleurs (ex : Quiz),
      // il satisfaisait ce listener et relançait bgMusic par-dessus la musique de la page
      // réellement affichée - c'était la cause des "deux musiques en même temps".
      musicStarted = false;
      document.addEventListener(
        'click',
        () => {
          if (musicStarted) return;
          setTimeout(() => {
            if (!musicStarted && viewMain.classList.contains('active')) {
              musicStarted = true;
              bgMusic.play().catch(() => {});
            }
          }, 250);
        },
        { once: true }
      );
    });
  }

  // Fondu enchaîné entre bgMusic et quizMusic, pour ne pas couper la musique net en
  // entrant/sortant du quiz.
  // Un jeton de génération par élément évite que deux fondus qui se chevauchent (ex :
  // Paramètres ouverts puis refermés avant la fin du fondu d'entrée) ne se battent sur le
  // même <audio> : l'ancien fondu, dépassé, cesse de toucher .volume et surtout n'appelle
  // plus .pause() une fois qu'un fondu plus récent a repris la main sur cet élément - sans
  // ça, bgMusic pouvait se retrouver mis en pause en plein "reprise", donnant l'impression
  // qu'il rejouait quelques secondes déjà entendues une fois relancé plus tard.
  const fadeGenerations = new WeakMap();

  // pauseOnZero: la piste sortante d'un fondu croisé peut se mettre en pause une fois
  // totalement éteinte (elle redémarrera via crossfadeMusic la prochaine fois). La piste
  // entrante, elle, ne doit JAMAIS se mettre en pause même si sa cible est 0 (volume à 0
  // ou muet) : sinon, remonter le volume ensuite ne change que .volume sans relancer la
  // lecture, et le son reste coupé malgré un curseur non nul (bug reporté par l'utilisateur).
  function fadeAudioVolume(el, target, duration, pauseOnZero = true) {
    const generation = (fadeGenerations.get(el) || 0) + 1;
    fadeGenerations.set(el, generation);
    const start = el.volume;
    const startTime = performance.now();
    function step(now) {
      if (fadeGenerations.get(el) !== generation) return;
      const t = Math.min(1, (now - startTime) / duration);
      el.volume = Math.min(1, Math.max(0, start + (target - start) * t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (target === 0 && pauseOnZero) {
        el.pause();
      }
    }
    requestAnimationFrame(step);
  }

  // Toutes les pistes de musique de fond gérées par crossfadeMusic - utilisé pour garantir
  // qu'une seule reste jamais audible à la fois (voir crossfadeMusic ci-dessous).
  const ALL_MUSIC_TRACKS = [bgMusic, quizMusic, faqMusic, loreMusic, boutiqueMusic, reglementMusic, settingsMusic];

  // N'éteint pas seulement "prevEl" (la piste qu'on croit être l'unique autre piste en
  // cours) mais TOUTES les autres pistes : garantit qu'une seule reste audible même si un
  // bug ailleurs (ex : la relance de bgMusic après un blocage d'autoplay) en avait laissé
  // une allumée par erreur - plutôt que de dépendre de chaque appelant pour identifier
  // correctement "l'autre" piste à couper.
  function crossfadeMusic(nextEl, prevEl) {
    const target = musicIsMuted ? 0 : musicTargetVolume;
    if (nextEl.paused) {
      nextEl.volume = 0;
      nextEl.play().catch(() => {});
    }
    fadeAudioVolume(nextEl, target, 900, false);
    ALL_MUSIC_TRACKS.forEach((el) => {
      if (el !== nextEl) fadeAudioVolume(el, 0, 900);
    });
  }

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    // Les réponses du quiz ont leur propre retour sonore (valider/refuser) : pas besoin
    // du clic générique en plus, ça superposerait les deux sons.
    if (btn && !btn.classList.contains('quiz-answer-btn')) playClickSound();
  });

  muteToggleBtn.addEventListener('click', () => {
    musicIsMuted = !musicIsMuted;
    bgMusic.muted = musicIsMuted;
    quizMusic.muted = musicIsMuted;
    faqMusic.muted = musicIsMuted;
    loreMusic.muted = musicIsMuted;
    boutiqueMusic.muted = musicIsMuted;
    reglementMusic.muted = musicIsMuted;
    settingsMusic.muted = musicIsMuted;
    updateVolumeIcon();
    audioControlsEl.classList.toggle('is-muted', musicIsMuted);
    window.lunaria.setMusicMuted(musicIsMuted);
  });

  volumeSlider.addEventListener('input', () => {
    musicTargetVolume = Number(volumeSlider.value) / 100;
    bgMusic.volume = musicTargetVolume;
    quizMusic.volume = musicTargetVolume;
    faqMusic.volume = musicTargetVolume;
    loreMusic.volume = musicTargetVolume;
    boutiqueMusic.volume = musicTargetVolume;
    reglementMusic.volume = musicTargetVolume;
    settingsMusic.volume = musicTargetVolume;
    volumeSlider.style.setProperty('--volume-pct', `${volumeSlider.value}%`);
    updateVolumeIcon();
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
  const FADEABLE_VIEWS = [viewMain, viewSettings, viewQuiz, viewFaq, viewLore, viewBoutique, viewReglement];

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
    // Le reflet des logos (.brand::after et .topbar-brand-mini::after) est masqué à cette
    // même image pour rester cantonné aux lettres visibles - posé sur :root (plutôt que
    // sur .brand seul) pour que les deux logos en héritent, doit rester synchronisé à
    // chaque changement de thème.
    document.documentElement.style.setProperty('--logo-mask', `url(${brandLogo.src})`);
    quizBrandLogo.src = brandLogo.src;
    applyMenuMusicForTheme(t);
    setParticlesTheme();
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
    // parametre.mp3 prend le relais de bgMusic (qui se tait) plutôt que de s'y superposer -
    // calée sur son instant de lecture actuel pour rester synchronisée au retour au menu.
    settingsMusic.currentTime = bgMusic.currentTime;
    crossfadeMusic(settingsMusic, bgMusic);
  });

  openFaqBtn.addEventListener('click', () => {
    showView(viewFaq);
    crossfadeMusic(faqMusic, bgMusic);
  });
  closeFaqBtn.addEventListener('click', () => {
    showView(viewMain);
    crossfadeMusic(bgMusic, faqMusic);
  });
  faqDiscordBtn.addEventListener('click', () => {
    window.lunaria.openDiscord();
  });

  openLoreBtn.addEventListener('click', () => {
    showView(viewLore);
    crossfadeMusic(loreMusic, bgMusic);
  });
  closeLoreBtn.addEventListener('click', () => {
    showView(viewMain);
    crossfadeMusic(bgMusic, loreMusic);
  });

  // Apparition/disparition des sections du Lore au scroll (façon révélation magique) :
  // .in-view bascule dans les deux sens selon isIntersecting, pas seulement à la première
  // apparition - le texte s'efface donc aussi en remontant, pas juste en descendant.
  const loreRevealEls = document.querySelectorAll('.lore-reveal');
  if (loreRevealEls.length && 'IntersectionObserver' in window) {
    const loreRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    loreRevealEls.forEach((el) => loreRevealObserver.observe(el));
  }

  // --- Boutique : articles cosmétiques (balais), vendus via Ko-fi. Rendu depuis un
  // tableau plutôt qu'en HTML statique - la liste est amenée à s'agrandir au fil du temps.
  const BOUTIQUE_ITEMS = [
    {
      id: 'chromaflight',
      name: 'ChromaFlight',
      image: 'boutique/chromaflight.jpg',
      price: '4,99 €',
      badge: 'Jetons',
      note: 'Débloquable gratuitement en jeu (contre des jetons) • Couleur au choix',
    },
    { id: 'bloomweaver', name: 'Bloomweaver', image: 'boutique/bloomweaver.jpg', price: '9,99 €' },
    { id: 'grim-jester', name: 'Grim Jester', image: 'boutique/grim-jester.jpg', price: '9,99 €' },
    { id: 'nightreaper', name: 'Nightreaper', image: 'boutique/nightreaper.jpg', price: '9,99 €' },
    { id: 'ravenfang', name: 'Ravenfang', image: 'boutique/ravenfang.jpg', price: '9,99 €' },
    { id: 'velocity-x', name: 'Velocity-X', image: 'boutique/velocity-x.jpg', price: '9,99 €' },
    { id: 'verdant-whisper', name: 'Verdant Whisper', image: 'boutique/verdant-whisper.jpg', price: '9,99 €' },
    { id: 'void-dragon', name: 'Void Dragon', image: 'boutique/void-dragon.jpg', price: '9,99 €' },
  ];
  const BOUTIQUE_PLACEHOLDER_COUNT = 4;

  // Sections de la boutique : seule "Balais" a du contenu pour l'instant. D'autres types
  // d'articles arriveront plus tard - en attendant, leur section reste grisée et non
  // cliquable, comme les cases "à venir" à l'intérieur d'une section.
  const BOUTIQUE_CATEGORIES = [
    { id: 'balais', icon: '🧹', name: 'Balais', available: true },
    { id: 'bientot-1', icon: '🔒', name: 'Bientôt disponible', available: false },
    { id: 'bientot-2', icon: '🔒', name: 'Bientôt disponible', available: false },
  ];
  let activeBoutiqueCategory = 'balais';

  function renderBoutiqueCategories() {
    boutiqueCategoriesEl.innerHTML = '';
    BOUTIQUE_CATEGORIES.forEach((cat) => {
      const el = document.createElement('div');
      el.className = 'boutique-category';
      if (!cat.available) el.classList.add('boutique-category-locked');
      if (cat.id === activeBoutiqueCategory) el.classList.add('is-active');
      const icon = document.createElement('span');
      icon.className = 'boutique-category-icon';
      icon.textContent = cat.icon;
      const name = document.createElement('span');
      name.className = 'boutique-category-name';
      name.textContent = cat.name;
      el.appendChild(icon);
      el.appendChild(name);
      if (cat.available) {
        el.addEventListener('click', () => {
          if (activeBoutiqueCategory === cat.id) return;
          activeBoutiqueCategory = cat.id;
          renderBoutiqueCategories();
          renderBoutique();
        });
      }
      boutiqueCategoriesEl.appendChild(el);
    });
  }

  function renderBoutique() {
    if (activeBoutiqueCategory !== 'balais') {
      boutiqueGrid.innerHTML = '';
      return;
    }
    boutiqueGrid.innerHTML = '';

    BOUTIQUE_ITEMS.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'boutique-card';
      card.dataset.id = item.id;

      const media = document.createElement('div');
      media.className = 'boutique-card-media';
      const img = document.createElement('img');
      img.src = `${assetsBase}/images/${item.image}`;
      img.alt = item.name;
      media.appendChild(img);
      if (item.badge) {
        const badge = document.createElement('span');
        badge.className = 'boutique-card-badge';
        badge.textContent = item.badge;
        media.appendChild(badge);
      }
      card.appendChild(media);

      const body = document.createElement('div');
      body.className = 'boutique-card-body';
      const h3 = document.createElement('h3');
      h3.textContent = item.name;
      body.appendChild(h3);
      card.appendChild(body);

      const reveal = document.createElement('div');
      reveal.className = 'boutique-card-reveal';
      const price = document.createElement('p');
      price.className = 'boutique-card-price';
      price.textContent = item.price;
      reveal.appendChild(price);
      if (item.note) {
        const note = document.createElement('p');
        note.className = 'boutique-card-note';
        note.textContent = item.note;
        reveal.appendChild(note);
      }
      const kofiBtn = document.createElement('button');
      kofiBtn.className = 'btn btn-primary boutique-kofi-btn';
      kofiBtn.textContent = '✦ Soutenir sur Ko-fi';
      kofiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.lunaria.openKofi();
      });
      reveal.appendChild(kofiBtn);
      card.appendChild(reveal);

      // Un seul article révélé à la fois (clic sur un autre = referme le précédent), et
      // repasse à l'état normal dès que la souris quitte la carte, plutôt qu'un bascule
      // qui reste ouvert indéfiniment.
      card.addEventListener('click', () => {
        const wasRevealed = card.classList.contains('is-revealed');
        boutiqueGrid.querySelectorAll('.boutique-card.is-revealed').forEach((c) => c.classList.remove('is-revealed'));
        if (!wasRevealed) card.classList.add('is-revealed');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-revealed');
      });

      boutiqueGrid.appendChild(card);
    });

    // Cases grisées "à venir" - la boutique n'affiche pas encore tous les articles prévus.
    for (let i = 0; i < BOUTIQUE_PLACEHOLDER_COUNT; i += 1) {
      const placeholder = document.createElement('div');
      placeholder.className = 'boutique-card boutique-card-placeholder';
      placeholder.innerHTML =
        '<div class="boutique-card-media"><span class="boutique-placeholder-icon">🔒</span></div>' +
        '<div class="boutique-card-body"><h3>Bientôt disponible</h3></div>';
      boutiqueGrid.appendChild(placeholder);
    }
  }
  renderBoutiqueCategories();
  renderBoutique();

  openBoutiqueBtn.addEventListener('click', () => {
    showView(viewBoutique);
    crossfadeMusic(boutiqueMusic, bgMusic);
  });
  closeBoutiqueBtn.addEventListener('click', () => {
    showView(viewMain);
    crossfadeMusic(bgMusic, boutiqueMusic);
  });

  openReglementBtn.addEventListener('click', () => {
    showView(viewReglement);
    crossfadeMusic(reglementMusic, bgMusic);
  });
  closeReglementBtn.addEventListener('click', () => {
    showView(viewMain);
    crossfadeMusic(bgMusic, reglementMusic);
  });

  document.querySelectorAll('.faq-q').forEach((q) => {
    const item = q.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    q.setAttribute('tabindex', '0');
    q.setAttribute('role', 'button');
    function toggleFaqItem() {
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    }
    q.addEventListener('click', toggleFaqItem);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaqItem();
      }
    });
  });

  openQuizBtn.addEventListener('click', () => {
    quizStartEl.classList.remove('hidden');
    quizQuestionEl.classList.add('hidden');
    quizResultEl.classList.add('hidden');
    updateQuizBestScoreDisplay();
    showView(viewQuiz);
    crossfadeMusic(quizMusic, bgMusic);
  });
  function leaveQuizView() {
    clearTimeout(quizAdvanceTimeout);
    showView(viewMain);
    crossfadeMusic(bgMusic, quizMusic);
  }

  // Point d'entrée commun pour quitter Quiz (flèche ← ou touche Échap) : ne demande
  // confirmation que si une question est en cours (quiz-question visible), puisque c'est
  // le seul moment où quitter fait perdre une progression réelle.
  // Ne demande confirmation qu'à partir de la question 2 (quizIndex > 0) : à la toute
  // première question, aucune réponse n'a encore été donnée, il n'y a donc rien à perdre.
  function attemptLeaveQuiz() {
    if (!quizQuestionEl.classList.contains('hidden') && quizIndex > 0) {
      quizLeaveModal.classList.remove('hidden');
    } else {
      leaveQuizView();
    }
  }

  closeQuizBtn.addEventListener('click', attemptLeaveQuiz);

  quizLeaveCancelBtn.addEventListener('click', () => {
    quizLeaveModal.classList.add('hidden');
  });

  quizLeaveConfirmBtn.addEventListener('click', () => {
    quizLeaveModal.classList.add('hidden');
    leaveQuizView();
  });

  quizStartBtn.addEventListener('click', startQuiz);
  quizReplayBtn.addEventListener('click', startQuiz);
  quizBackBtn.addEventListener('click', leaveQuizView);
  quizJokerBtn.addEventListener('click', handleQuizJoker);
  quizNextBtn.addEventListener('click', advanceQuiz);
  // Reviens à l'état confirmé si on quitte sans sauvegarder (ex : thème/mode faible
  // consommation prévisualisés).
  function leaveSettingsView() {
    applyTheme(confirmedSettings.theme || 'gold');
    applyLowPower(confirmedSettings.lowPowerMode);
    showView(viewMain);
    crossfadeMusic(bgMusic, settingsMusic);
  }

  function hasUnsavedSettingsChanges() {
    return (
      draftSettings.introEnabled !== confirmedSettings.introEnabled ||
      draftSettings.autoLaunch !== confirmedSettings.autoLaunch ||
      draftSettings.autoConnect !== confirmedSettings.autoConnect ||
      draftSettings.theme !== confirmedSettings.theme ||
      draftSettings.lowPowerMode !== confirmedSettings.lowPowerMode
    );
  }

  // Point d'entrée commun pour quitter Paramètres (bouton ← ou touche Échap) : demande
  // confirmation seulement s'il reste des modifications non sauvegardées.
  function attemptLeaveSettings() {
    if (hasUnsavedSettingsChanges()) {
      unsavedSettingsModal.classList.remove('hidden');
    } else {
      leaveSettingsView();
    }
  }

  closeSettingsBtn.addEventListener('click', attemptLeaveSettings);

  unsavedDiscardBtn.addEventListener('click', () => {
    unsavedSettingsModal.classList.add('hidden');
    leaveSettingsView();
  });

  unsavedCancelBtn.addEventListener('click', () => {
    unsavedSettingsModal.classList.add('hidden');
  });

  unsavedSaveBtn.addEventListener('click', async () => {
    unsavedSettingsModal.classList.add('hidden');
    await saveSettings();
    leaveSettingsView();
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

  // Halo qui suit le curseur, délégué sur tous les boutons (.btn) plutôt que branché
  // un par un - s'applique automatiquement à JOUER, Commencer, et tous les autres.
  document.addEventListener('mousemove', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    btn.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });

  // Position de la grande lueur du thème Sombre (.dark-cursor-glow), qui suit la souris
  // comme une torche. Posé sur <html> pour rester lisible depuis n'importe quel élément ;
  // ne coûte rien sur les autres thèmes puisque ce calque reste display:none.
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
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

  // Tracé magique : clic maintenu + déplacement dans le vide (pas sur un bouton/une
  // carte, pour ne pas gêner les interactions normales) dessine une traînée de
  // particules plus dense et lumineuse, qui s'estompe peu après. Marche sur toutes les
  // vues, contrairement à la traînée passive au survol ci-dessus (limitée au menu).
  const DRAW_BLOCKED_SELECTOR =
    'button, input, a, .server-card, .settings-row, .quiz-card, .modal-box, .theme-swatch, .display-mode-btn, .social-button, .faq-item, .lore-maison, .lore-reperes, .lore-final, .boutique-card, .boutique-category, .reglement-rule-card, .reglement-philo-card';
  let isDrawingActive = false;
  let lastDrawPoint = null;

  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target.closest(DRAW_BLOCKED_SELECTOR)) return;
    isDrawingActive = true;
    lastDrawPoint = { x: e.clientX, y: e.clientY };
    spawnDraw(e.clientX, e.clientY, e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDrawingActive) return;
    spawnDraw(lastDrawPoint.x, lastDrawPoint.y, e.clientX, e.clientY);
    lastDrawPoint = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('mouseup', () => {
    isDrawingActive = false;
    lastDrawPoint = null;
  });
  window.addEventListener('blur', () => {
    isDrawingActive = false;
    lastDrawPoint = null;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (!viewMain.classList.contains('active')) return;
    if (!modal.classList.contains('hidden')) return;
    if (!whatsNewModal.classList.contains('hidden')) return;
    if (playButton.disabled) return;
    playButton.click();
  });

  // Échap : ferme la pop-up de confirmation si elle est ouverte (comme "Annuler"), sinon
  // agit comme la flèche ← de la vue active pour revenir au menu (Paramètres garde en plus
  // sa vérification des modifications non enregistrées).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!clearCacheModal.classList.contains('hidden')) {
      clearCacheModal.classList.add('hidden');
      return;
    }
    if (!closeFivemModal.classList.contains('hidden')) {
      closeFivemModal.classList.add('hidden');
      return;
    }
    if (!unsavedSettingsModal.classList.contains('hidden')) {
      unsavedSettingsModal.classList.add('hidden');
      return;
    }
    if (!quizLeaveModal.classList.contains('hidden')) {
      quizLeaveModal.classList.add('hidden');
      return;
    }
    if (viewSettings.classList.contains('active')) {
      attemptLeaveSettings();
      return;
    }
    if (viewQuiz.classList.contains('active')) {
      closeQuizBtn.click();
      return;
    }
    if (viewFaq.classList.contains('active')) {
      closeFaqBtn.click();
      return;
    }
    if (viewLore.classList.contains('active')) {
      closeLoreBtn.click();
      return;
    }
    if (viewBoutique.classList.contains('active')) {
      closeBoutiqueBtn.click();
      return;
    }
    if (viewReglement.classList.contains('active')) {
      closeReglementBtn.click();
    }
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

  let clearCacheRevertTimer = null;

  function reportClearCacheResult(result) {
    if (!result.fivemFound) {
      clearCacheDesc.textContent = 'FiveM introuvable — rien à vider.';
    } else if (result.cleared.length === 0) {
      clearCacheDesc.textContent = 'Le cache était déjà vide.';
    } else {
      clearCacheDesc.textContent = '🪄 Méfaits accomplis !';
    }
    // Annule un précédent minuteur de retour au texte par défaut : sinon un clic rapproché
    // sur le bouton pourrait voir son message écrasé par le retour à zéro programmé par
    // le clic précédent.
    clearTimeout(clearCacheRevertTimer);
    clearCacheRevertTimer = setTimeout(() => { clearCacheDesc.textContent = DEFAULT_CLEAR_CACHE_DESC; }, 4000);
  }

  async function runClearCache() {
    clearCacheBtn.disabled = true;
    clearCacheDesc.textContent = 'Suppression en cours...';
    try {
      const result = await window.lunaria.clearFiveMCache();
      reportClearCacheResult(result);
    } finally {
      clearCacheBtn.disabled = false;
    }
  }

  async function runCloseFivemAndClearCache() {
    clearCacheBtn.disabled = true;
    clearCacheDesc.textContent = 'Fermeture de FiveM...';
    try {
      const result = await window.lunaria.closeFiveMAndClearCache();
      reportClearCacheResult(result);
    } finally {
      clearCacheBtn.disabled = false;
    }
  }

  clearCacheBtn.addEventListener('click', () => {
    clearCacheModal.classList.remove('hidden');
  });

  clearCacheCancelBtn.addEventListener('click', () => {
    clearCacheModal.classList.add('hidden');
  });

  clearCacheConfirmBtn.addEventListener('click', async () => {
    clearCacheModal.classList.add('hidden');
    const running = await window.lunaria.isFiveMRunning();
    if (running) {
      closeFivemModal.classList.remove('hidden');
    } else {
      await runClearCache();
    }
  });

  closeFivemCancelBtn.addEventListener('click', () => {
    closeFivemModal.classList.add('hidden');
  });

  closeFivemConfirmBtn.addEventListener('click', async () => {
    closeFivemModal.classList.add('hidden');
    await runCloseFivemAndClearCache();
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

  async function saveSettings() {
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
  }

  saveSettingsBtn.addEventListener('click', saveSettings);

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

    // Thème sombre : la poussière magique ambiante devient des cendres grises (jamais
    // ambrées) qui tombent tout doucement plutôt que de monter, avec un léger tangage
    // latéral pour évoquer des flocons de cendre qui voltigent en retombant.
    function makeParticle() {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      return {
        ash: isDark,
        x: Math.random() * width,
        y: isDark ? Math.random() * -40 : height + Math.random() * 40,
        r: 0.6 + Math.random() * 1.8,
        speed: isDark ? 0.04 + Math.random() * 0.07 : 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * (isDark ? 0.45 : 0.3),
        alpha: 0.15 + Math.random() * 0.45,
        hue: isDark
          ? (Math.random() > 0.5 ? '160,155,148' : '128,123,117')
          : (Math.random() > 0.5 ? '212,175,90' : '233,224,242'),
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

    // Tracé magique au clic maintenu : segment de ligne continu entre deux positions
    // successives du curseur (plutôt que des points isolés), qui s'estompe un peu plus
    // lentement que la traînée passive au survol.
    function makeDrawSegment(x1, y1, x2, y2) {
      return {
        segment: true,
        x1,
        y1,
        x2,
        y2,
        width: 2.2 + Math.random() * 1,
        alpha: 0.9,
        decay: 0.011 + Math.random() * 0.006,
        hue: Math.random() > 0.5 ? '241,207,127' : '233,224,242',
      };
    }

    // Fumée discrète du thème sombre : grand nuage très diffus (dégradé radial, pas de
    // cercle net) qui monte à peine en dérivant, et met du temps à s'effacer. N'apparaît
    // que de temps en temps (voir scheduleSmoke plus bas), jamais en continu.
    function makeSmokeParticle() {
      return {
        smoke: true,
        x: Math.random() * width,
        y: height + 60 + Math.random() * 60,
        r: 70 + Math.random() * 90,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(0.045 + Math.random() * 0.045),
        alpha: 0.05 + Math.random() * 0.035,
        decay: 0.0003 + Math.random() * 0.0002,
        hue: '150,145,138',
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

        if (p.segment) {
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.moveTo(p.x1, p.y1);
          ctx.lineTo(p.x2, p.y2);
          ctx.lineCap = 'round';
          ctx.lineWidth = p.width;
          ctx.strokeStyle = `rgba(${p.hue},${p.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${p.hue},${p.alpha})`;
          ctx.stroke();
          continue;
        }

        if (p.smoke) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grad.addColorStop(0, `rgba(${p.hue},${p.alpha})`);
          grad.addColorStop(1, `rgba(${p.hue},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.shadowBlur = 0;
          ctx.fill();
          continue;
        }

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
          const baseAlpha = p.trail ? 0.55 : 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (p.trail ? p.alpha / baseAlpha : 1), 0, Math.PI * 2);
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

        // Cendres (thème sombre) : tombent doucement vers le bas et se recyclent en haut.
        // Poussière magique (autres thèmes) : monte et se recycle en bas, comme avant.
        if (p.ash) {
          p.y += p.speed;
        } else {
          p.y -= p.speed;
        }
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

        if (p.ash) {
          if (p.y > height + 10) {
            Object.assign(p, makeParticle(), { y: -10 });
          }
        } else if (p.y < -10) {
          Object.assign(p, makeParticle(), { y: height + 10 });
        }
      }
      requestAnimationFrame(tick);
    }

    // Fait apparaître un nuage de fumée de temps en temps (jamais en continu), et
    // uniquement quand le thème sombre est actif et hors mode faible consommation.
    function scheduleSmoke() {
      const delay = 10000 + Math.random() * 9000;
      setTimeout(() => {
        if (!lowPower && document.body.getAttribute('data-theme') === 'dark') {
          particles.push(makeSmokeParticle());
        }
        scheduleSmoke();
      }, delay);
    }

    window.addEventListener('resize', resize);
    init();
    requestAnimationFrame(tick);
    scheduleSmoke();

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

    spawnDraw = (x1, y1, x2, y2) => {
      if (lowPower) return;
      particles.push(makeDrawSegment(x1, y1, x2, y2));
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

    // Re-seed immédiat de la poussière ambiante lors d'un changement de thème (sinon les
    // particules déjà en vol ne recolorent qu'au fil de leur recyclage naturel).
    setParticlesTheme = () => {
      if (!lowPower) init();
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
