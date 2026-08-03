(() => {
  const viewIntro = document.getElementById('view-intro');
  const viewMain = document.getElementById('view-main');
  const viewSettings = document.getElementById('view-settings');
  const viewQuiz = document.getElementById('view-quiz');
  const viewFaq = document.getElementById('view-faq');
  const ALL_VIEWS = [viewIntro, viewMain, viewSettings, viewQuiz, viewFaq];

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
  const settingsMusic = document.getElementById('settings-music');
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
    darkThemeSwatch.title = unlocked ? 'Sombre' : 'Sombre — débloqué en obtenant 10/10 au quiz';
  }

  function unlockDarkTheme() {
    if (isDarkThemeUnlocked()) return;
    localStorage.setItem(DARK_THEME_UNLOCK_KEY, '1');
    refreshDarkThemeSwatchLock();
  }

  refreshDarkThemeSwatchLock();

  // Banque de questions du quiz, tirée du lore "L'Histoire de Brumelune". `correct` est
  // l'index (dans `answers`) de la bonne réponse ; les réponses sont mélangées à chaque
  // partie dans startQuiz(), donc l'ordre ci-dessous n'a pas d'importance.
  // `exp` : explication affichée après la réponse, reformulée uniquement à partir du
  // texte du lore fourni par l'utilisateur ("L'Histoire de Brumelune") - rien d'inventé.
  const QUIZ_QUESTIONS = [
    { q: "Comment s'appelle l'enchantement qui rend Brumelune invisible aux non-mages ?", answers: ['Le Sceau', 'Le Voile', 'La Brume', "L'Écrin"], correct: 1, exp: "Le Voile est l'enchantement millénaire qui rend l'île invisible aux non-mages et sert de frontière avec l'entre-monde de brume." },
    { q: 'Que retient le Voile, en plus de cacher les sorciers ?', answers: ['Rien d\'autre', 'Des créatures marines', 'Un océan de magie brute, informe et affamée', 'Les non-mages'], correct: 2, exp: "Au-delà du Voile s'étend un entre-monde de brume, un océan de magie brute, informe et affamée, que le Voile retient." },
    { q: "Qui a fondé l'Académie Lunaria ?", answers: ['Grim Blackwood', 'Merlin', 'Makarov', 'Le Conseil'], correct: 1, exp: "Merlin fonda l'Académie Lunaria sur l'île de Brumelune et en devint le premier directeur." },
    { q: 'Combien de disciples Merlin a-t-il réunis pour bâtir l\'école ?', answers: ['3', '4', '5', '7'], correct: 2, exp: "Merlin fit appel à ses cinq plus brillants disciples pour bâtir l'Académie Lunaria." },
    { q: 'Combien de ces disciples ont fondé une maison ?', answers: ['3', '4', '5', '2'], correct: 1, exp: "Quatre des cinq disciples fondèrent chacun une maison à son image ; le cinquième, Grim Blackwood, n'en fonda pas." },
    { q: 'Quelle fondatrice a sauvé un phénix des flammes noires ?', answers: ['Lyra Aérion', 'Maëve Arden', 'Isandro Tanora', 'Lyra Hydras'], correct: 1, exp: "Maëve Arden entra dans les flammes noires pour sauver un phénix empoisonné par la magie noire, et le ramena à la vie à l'aube." },
    { q: 'Quelle créature est associée à la maison Hydras ?', answers: ['Un dragon', 'Une hydre', 'Un serpent', 'Un kraken'], correct: 1, exp: "Une hydre ancestrale hantait les eaux de Brumelune ; Aldéric Hydras en fit la gardienne de ces eaux." },
    { q: "Comment Aldéric Hydras a-t-il vaincu l'hydre ?", answers: ['Par la force', 'En la piégeant', 'En parlant à chaque tête et en jouant sur leurs rivalités', "Grâce à un sortilège de Merlin"], correct: 2, exp: "Aldéric découvrit que les douze têtes de l'hydre se disputaient et se jalousaient ; il joua sur leurs rivalités pour les diviser plutôt que de les combattre." },
    { q: 'Quelle fondatrice a appris le langage des hippogriffes ?', answers: ['Maëve Arden', 'Lyra Aérion', 'Isandro Tanora', 'Grim Blackwood'], correct: 1, exp: "Lyra Aérion passa un hiver entier sur les falaises à observer et apprendre le langage des hippogriffes, fait de gestes et de regards." },
    { q: 'Quel grand sortilège Lyra Aérion a-t-elle créé ?', answers: ['Le sortilège du phénix', 'Le sortilège de brume qui cache l\'île', 'Le pacte de l\'hydre', 'Le Gel'], correct: 1, exp: "C'est Lyra Aérion qui tissa le grand sortilège de brume cachant l'île aux non-mages, celui qui donna son nom à Brumelune." },
    { q: 'Quelle créature accompagne Isandro Tanora ?', answers: ['Un hibou', 'Un phénix', 'Un tanuki (esprit métamorphe)', 'Un hippogriffe'], correct: 2, exp: "Isandro Tanora est accompagné d'un tanuki, un vieux esprit métamorphe, farceur et ancien." },
    { q: "Combien d'années Isandro a-t-il passé à réparer les fondations de l'école ?", answers: ['1 an', '3 ans', '7 ans', '10 ans'], correct: 2, exp: "Isandro passa sept ans à souder la roche malade des fondations de l'école, sort après sort." },
    { q: 'Quelle maison honore "ceux qui restent, travaillent et rient malgré tout" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 3, exp: "La devise de la maison Tanora honore ceux qui restent, travaillent et rient malgré tout, à l'image d'Isandro et de son tanuki." },
    { q: 'Quelle maison honore "ceux qui avancent quand tout brûle" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 0, exp: "La devise de la maison Arden honore ceux qui avancent quand tout brûle, en écho au sauvetage du phénix par Maëve." },
    { q: 'Quelle maison honore "ceux qui gagnent par l\'esprit ce que la force ne peut prendre" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 1, exp: "La devise de la maison Hydras honore ceux qui gagnent par l'esprit ce que la force ne peut prendre, en écho à la ruse d'Aldéric face à l'hydre." },
    { q: 'Quelle maison honore "ceux qui comprennent avant de conquérir" ?', answers: ['Arden', 'Hydras', 'Aérion', 'Tanora'], correct: 2, exp: "La devise de la maison Aérion honore ceux qui comprennent avant de conquérir, en écho à la patience de Lyra envers les hippogriffes." },
    { q: 'Comment était surnommé Grim Blackwood avant que son nom ne soit révélé ?', answers: ['Le Traître', 'Le Cinquième Disciple', "L'Ombre", 'Le Voilé'], correct: 1, exp: "Avant que les archives ne révèlent son nom, on l'appelait le Cinquième Disciple, ou celui dont Merlin ne dit jamais le nom." },
    { q: 'Quelle question obsédait Grim Blackwood ?', answers: ["Comment vaincre l'hydre ?", 'Pourquoi nous cachons-nous ?', 'Qui est le plus doué ?', 'Où est le Voile ?'], correct: 1, exp: "Grim Blackwood portait sans cesse la question : « Pourquoi nous cachons-nous ? »" },
    { q: 'Comment s\'appelle la bataille finale entre Grim et les quatre fondateurs ?', answers: ['La Bataille de Brumelune', 'La Bataille des Cendres', 'Le Siège du Voile', 'La Nuit Noire'], correct: 1, exp: "L'affrontement final entre Grim et les quatre fondateurs, sur le plateau dominant l'école, est appelé la Bataille des Cendres." },
    { q: "Qu'est-il arrivé aux quatre fondateurs lors de cette bataille ?", answers: ['Ils ont banni Grim', 'Ils sont morts au combat, ensemble', 'Ils ont fui', 'Ils ont scellé le Voile'], correct: 1, exp: "Les quatre fondateurs remportèrent la bataille mais moururent au combat, ensemble, comme ils avaient bâti l'école." },
    { q: 'Qu\'est devenu Merlin après la mort de ses disciples ?', answers: ['Il a fondé une nouvelle école', 'Il a marché seul vers la forêt et n\'est jamais revenu', 'Il a emprisonné Grim', 'Il est resté diriger l\'école'], correct: 1, exp: "Après la mort de ses disciples, Merlin confia l'école au Conseil puis marcha seul vers la forêt de Brumelune et ne revint jamais." },
    { q: "Quelle école sœur de Lunaria a été fondée sur le continent ?", answers: ['Voilenoire', 'Arcanhem', 'Brumelune', 'Tanoria'], correct: 1, exp: "Arcanhem est l'école sœur de Lunaria, fondée sur le continent." },
    { q: "Qu'est-il arrivé à Arcanhem il y a cent ans ?", answers: ['Elle a brûlé', 'Elle a été dévorée par la brume noire, élèves compris', 'Elle a fermé faute d\'élèves', 'Elle a fusionné avec Lunaria'], correct: 1, exp: "Il y a cent ans, la brume noire a déferlé sur Arcanhem et dévoré l'école entière : tours, archives et sept cents élèves endormis." },
    { q: 'Comment s\'appelle le cercle de mages noirs fondé par Grim ?', answers: ['Les Ombres', 'Les Voilés', 'Les Cendres', 'Le Gel'], correct: 1, exp: "Grim fonda les Voilés, un cercle de mages noirs recrutés parmi les déçus et les humiliés." },
    { q: 'Quelle stratégie les Voilés ont-ils utilisée contre Lunaria ?', answers: ['Attaquer les élèves', 'Assassiner/corrompre les professeurs un à un', 'Détruire le Voile directement', 'Négocier avec le gouvernement'], correct: 1, exp: "Les Voilés ont assassiné et corrompu les professeurs de Lunaria un à un, pour priver une génération de sorciers de tout maître." },
    { q: "Comment s'appelle la période de cent ans sans écoles de magie ?", answers: ['Le Grand Silence', 'Le Siècle Noir', 'L\'Âge du Voile', 'La Grande Fermeture'], correct: 1, exp: "Décapitée par la perte de ses professeurs et de ses écoles, cette période de cent ans est appelée le Siècle Noir." },
    { q: 'Comment s\'appelle la loi interdisant toute pratique magique non encadrée durant cette période ?', answers: ['Le Sceau', 'Le Gel', 'L\'Interdit', 'Le Voile Noir'], correct: 1, exp: "Le gouvernement de la magie imposa le Gel, l'interdiction de toute pratique magique non encadrée, durant le Siècle Noir." },
    { q: 'Qui est le nouveau directeur chargé de rouvrir Lunaria ?', answers: ['Merlin', 'Grim', 'Makarov', 'Aldéric'], correct: 2, exp: "Le gouvernement de la magie a nommé Makarov nouveau directeur, chargé de rouvrir l'Académie Lunaria." },
    { q: 'Quel âge minimum faut-il pour intégrer la nouvelle Lunaria ?', answers: ['16 ans', '18 ans', '21 ans', 'Aucune limite'], correct: 1, exp: "Les premiers admis de la nouvelle Lunaria sont des adultes de 18 ans et plus, qui ont grandi pendant le Gel sans formation." },
    { q: 'Que cherche "quelqu\'un" dans la brume, selon les rumeurs ?', answers: ['Le corps de Merlin', 'Les quatre reliques des fondateurs qui maintiennent le Voile', "L'entrée d'Arcanhem", 'Le tanuki'], correct: 1, exp: "Les quatre reliques des fondateurs sont les ancres qui maintiennent le Voile autour de l'île, et quelqu'un les cherche dans la brume." },
    { q: 'Que trouva Maëve Arden au cœur du brasier ?', answers: ['Un dragon endormi', 'Un phénix mourant, empoisonné par la magie noire', 'Un sorcier blessé', 'Un cristal magique'], correct: 1, exp: "Au centre de la forêt mourante, Maëve trouva un phénix empoisonné par la magie noire, qui ne parvenait plus à renaître." },
    { q: 'Que refusa Maëve face aux Ténèbres, contrairement à tout manuel ?', answers: ['Elle refusa de se battre', 'Elle refusa de partir', "Elle refusa d'utiliser sa baguette", "Elle refusa d'appeler à l'aide"], correct: 1, exp: "Maëve s'agenouilla dans le feu noir et opposa aux Ténèbres la seule chose qu'elles ne comprennent pas : elle refusa de partir." },
    { q: "Que prit Aldéric Hydras pour affronter l'hydre, au lieu d'une épée ou d'une armée ?", answers: ['Une armée de sorciers', 'Une épée enchantée', 'Une barque, un carnet, et six mois de patience', 'Un bouclier magique'], correct: 2, exp: "Aldéric ne prit ni épée ni armée : il prit une barque, un carnet, et six mois de patience pour observer l'hydre." },
    { q: "Qu'obtient l'hydre en échange de la paix avec Aldéric ?", answers: ['Un serment', 'Un sacrifice', 'De l\'or', 'La liberté totale'], correct: 0, exp: "Aldéric offrit à l'hydre ce qu'aucun héros n'avait proposé : la paix, contre un serment." },
    { q: 'Que fit Lyra Aérion en signe de confiance avant de monter aux falaises ?', answers: ['Elle offrit un cadeau aux hippogriffes', 'Elle chanta une berceuse', 'Elle laissa sa baguette au pied de la première crête', 'Elle se présenta sans armure'], correct: 2, exp: "Lyra laissa sa baguette au pied de la première crête - un geste que les autres jugèrent fou - avant de monter seule vers les hippogriffes." },
    { q: 'Combien de temps Lyra Aérion passa-t-elle sur les falaises avant le printemps ?', answers: ['Une semaine', 'Un mois', 'Un hiver entier', 'Trois ans'], correct: 2, exp: "Lyra s'installa sur les hauteurs, seule, un hiver entier, gelée jusqu'aux os, pour apprendre le langage des hippogriffes." },
    { q: "D'où venait Isandro Tanora ?", answers: ['De Brumelune même', 'De terres lointaines, par-delà les mers', 'Du continent voisin', 'Des falaises du nord'], correct: 1, exp: "Isandro Tanora venait de terres lointaines, par-delà les mers, et n'arriva pas seul : son tanuki dormait sur son épaule." },
    { q: "Que scella Isandro dans chaque pierre maîtresse de l'école ?", answers: ['Une larme de phénix', 'Une goutte de son sang', 'Un fragment de baguette', "Une plume d'hippogriffe"], correct: 1, exp: "On dit qu'Isandro scella dans chaque pierre maîtresse une goutte de son sang, et le tanuki un éclat de son rire." },
    { q: 'Comment Merlin considérait-il Grim Blackwood avant sa trahison ?', answers: ['Un disciple prometteur mais distant', 'Le plus doué des cinq, aimé comme un fils', 'Le plus faible des cinq', 'Un simple élève parmi d\'autres'], correct: 1, exp: "Grim était, de l'aveu de tous, le plus doué des cinq ; Merlin le disait promis à le dépasser, et l'aimait comme un fils." },
    { q: 'Que vit Grim en étudiant les travaux de Lyra sur le Voile ?', answers: ['Un bouclier parfait', 'Une porte vers le passé', 'Une serrure, et derrière, une puissance qui attendait son maître', "Rien d'exploitable"], correct: 2, exp: "Là où tous voyaient un bouclier, Grim vit une serrure, et derrière, une puissance qui attendait son maître." },
    { q: 'Où s\'est déroulée la Bataille des Cendres ?', answers: ["Dans la grande forêt de l'ouest", 'Sur le plateau qui domine l\'école', 'Sur les falaises du nord', 'Dans les eaux de Brumelune'], correct: 1, exp: "Les quatre fondateurs affrontèrent Grim ensemble, sur le plateau qui domine l'école." },
    { q: 'Qui recrutent les Voilés ?', answers: ['Uniquement des créatures de brume', 'D\'anciens professeurs de Lunaria', 'Les déçus, les humiliés, ceux à qui la dissimulation avait tout pris', 'Des mercenaires payés'], correct: 2, exp: "Grim fonda les Voilés, un cercle de mages noirs recrutés parmi les déçus, les humiliés, tous ceux à qui la dissimulation avait tout pris." },
    { q: 'Comment sont décrits les premiers élèves de la nouvelle Lunaria ?', answers: ['De jeunes enfants prodiges', 'Pas des enfants — des adultes qui ont grandi pendant le Gel', 'Uniquement des descendants des fondateurs', 'Des sorciers déjà formés ailleurs'], correct: 1, exp: "Les premiers admis de la nouvelle Lunaria ne sont pas des enfants : ce sont des adultes de 18 ans et plus, qui ont grandi pendant le Gel, sans formation." },
    { q: 'Quelles sont les quatre reliques qui maintiennent le Voile ?', answers: ['Les baguettes des quatre fondateurs', 'Le pacte de l\'hydre, les carnets de Lyra, les pierres de sang d\'Isandro, la lignée du phénix de Maëve', 'Les couronnes des quatre maisons', "Les clés de l'Académie"], correct: 1, exp: "Les quatre reliques des fondateurs — le pacte de l'hydre, les carnets de Lyra, les pierres de sang d'Isandro, la lignée du phénix de Maëve — sont les ancres du Voile." },
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
  // l'explication, soit immédiatement via le bouton "Passer".
  function advanceQuiz() {
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
  // settingsMusic n'est jamais seule à jouer : elle se superpose à bgMusic (jamais un
  // fondu croisé qui l'éteindrait), d'où un volume cible séparé plutôt que musicTargetVolume.
  settingsMusic.volume = 0;
  settingsMusic.muted = musicIsMuted;
  volumeSlider.value = String(musicVolume ?? 25);
  muteToggleBtn.textContent = musicIsMuted ? '🔇' : '🔊';

  function maybeStartMusic() {
    if (musicStarted || !viewMain.classList.contains('active')) return;
    musicStarted = true;
    bgMusic.play().catch(() => {
      // Autoplay bloqué : la musique démarrera au premier clic de l'utilisateur.
      musicStarted = false;
      document.addEventListener('click', () => { if (!musicStarted) { musicStarted = true; bgMusic.play().catch(() => {}); } }, { once: true });
    });
  }

  // Fondu enchaîné entre bgMusic et quizMusic, pour ne pas couper la musique net en
  // entrant/sortant du quiz.
  function fadeAudioVolume(el, target, duration) {
    const start = el.volume;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      el.volume = Math.min(1, Math.max(0, start + (target - start) * t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (target === 0) {
        el.pause();
      }
    }
    requestAnimationFrame(step);
  }

  function crossfadeMusic(nextEl, prevEl) {
    const target = musicIsMuted ? 0 : musicTargetVolume;
    if (nextEl.paused) {
      nextEl.volume = 0;
      nextEl.play().catch(() => {});
    }
    fadeAudioVolume(nextEl, target, 900);
    fadeAudioVolume(prevEl, 0, 900);
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
    settingsMusic.muted = musicIsMuted;
    muteToggleBtn.textContent = musicIsMuted ? '🔇' : '🔊';
    window.lunaria.setMusicMuted(musicIsMuted);
  });

  volumeSlider.addEventListener('input', () => {
    musicTargetVolume = Number(volumeSlider.value) / 100;
    bgMusic.volume = musicTargetVolume;
    quizMusic.volume = musicTargetVolume;
    faqMusic.volume = musicTargetVolume;
    settingsMusic.volume = musicTargetVolume;
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
  const FADEABLE_VIEWS = [viewMain, viewSettings, viewQuiz, viewFaq];

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
  closeQuizBtn.addEventListener('click', () => {
    showView(viewMain);
    crossfadeMusic(bgMusic, quizMusic);
  });
  quizStartBtn.addEventListener('click', startQuiz);
  quizReplayBtn.addEventListener('click', startQuiz);
  quizBackBtn.addEventListener('click', () => {
    clearTimeout(quizAdvanceTimeout);
    showView(viewMain);
    crossfadeMusic(bgMusic, quizMusic);
  });
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
    'button, input, a, .server-card, .settings-row, .quiz-card, .modal-box, .theme-swatch, .display-mode-btn, .social-button, .faq-item';
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
  // agit comme le bouton ← pour quitter Paramètres (avec la même vérification des
  // modifications non enregistrées).
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
    if (viewSettings.classList.contains('active')) {
      attemptLeaveSettings();
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
