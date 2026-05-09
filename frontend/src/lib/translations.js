export const LANGUAGE_STORAGE_KEY = 'truthdare-language';

export const languageOptions = [
  { id: 'en', label: 'English', nativeLabel: 'English' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

const translations = {
  en: {
    common: {
      brandName: 'TruthDare',
      create: 'Create',
      join: 'Join',
      createRoom: 'Create Room',
      joinRoom: 'Join Room',
      yourName: 'Your Name',
      roomCode: 'Room Code',
      gameMode: 'Game Mode',
      host: 'Host',
      player: 'Player',
      players: 'Players',
      you: 'You',
      points: 'points',
      pts: 'pts',
      room: 'Room',
      round: 'Round',
      currentTurn: 'Current Turn',
      challenge: 'Challenge',
      leaderboard: 'Leaderboard',
      loading: 'Loading...',
      truth: 'Truth',
      dare: 'Dare',
      done: 'Done',
      skip: 'Skip',
      copyCode: 'Copy Code',
      copied: 'Copied',
      shared: 'Shared',
      copyInvite: 'Copy Invite',
      shareOnWhatsApp: 'Share on WhatsApp',
      selectedPlayer: 'Selected Player',
      autoPicksIn: 'Auto-picks in',
      connectionConnected: 'Connected',
      connectionDisconnected: 'Disconnected',
      language: 'Language',
      switchLanguage: 'Switch language',
      english: 'English',
      hindi: 'Hindi',
    },
    nav: {
      partyGame: 'Party Game',
    },
    languageGate: {
      badge: 'Choose your vibe',
      title: 'Pick your language before the party starts.',
      subtitle:
        'TruthDare supports English and Hindi so your whole group can play comfortably.',
    },
    home: {
      badge: 'Live Party Game',
      title: 'Spin. Laugh. Dare.',
      subtitle:
        'Create a room, invite friends, and play Truth or Dare live.',
      featureFastRoom: 'Fast Room',
      featureLiveSync: 'Live Sync',
      featureShareCode: 'Share Code',
    },
    create: {
      badge: 'Host setup',
      title: 'Create Room',
      subtitle: 'Pick your name and open a fresh TruthDare lobby.',
      namePlaceholder: 'Enter your name',
      errorMissingName: 'Please enter your name before creating a room.',
      loading: 'Creating room...',
    },
    joinRoom: {
      badge: 'Join the party',
      title: 'Join Room',
      subtitle: 'Enter your name and room code to jump straight into the lobby.',
      namePlaceholder: 'Enter your name',
      roomCodePlaceholder: 'ABCD12',
      errorMissingDetails: 'Please enter your name and room code.',
      loading: 'Joining room...',
    },
    modes: {
      normal: {
        label: 'Normal Mode',
        description: 'Classic Truth or Dare with easy party energy.',
      },
      funny: {
        label: 'Funny Mode',
        description: 'Extra silly prompts for loud laughs and chaos.',
      },
      crush: {
        label: 'Crush Mode',
        description: 'Cute, playful prompts with a flirty spark.',
      },
      roast: {
        label: 'Roast Mode',
        description: 'Friendly teasing and savage fun for the whole room.',
      },
      'deep-talk': {
        label: 'Deep Talk Mode',
        description: 'Heartfelt prompts for close-friend energy.',
      },
    },
    lobby: {
      syncingTitle: 'Lobby',
      syncingSubtitle: 'Syncing the latest room state.',
      loading: 'Loading room...',
      title: 'Lobby',
      subtitle:
        'Invite everyone, watch the room fill up, and start when the vibe feels right.',
      playerCount: ({ count }) => `${count} player${count === 1 ? '' : 's'}`,
      playersInRoom: ({ count }) =>
        `${count} player${count === 1 ? '' : 's'} in the room.`,
      hostControlsStart: 'Host controls start',
      roomStatus: 'Room Status',
      waitingForPlayers: 'Waiting for more players',
      roomReady: 'Your room is ready to light up',
      hostRoomStatus:
        'Share the code, watch the lobby fill up, and start the game when the energy feels right.',
      guestRoomStatus:
        'You are in. Hang here while the host gets everyone together.',
      waitingHostStart: 'Waiting for the host to start the game.',
      needTwoPlayers: 'You need at least 2 players before the game can begin.',
      everyoneIn: 'Everyone is in. Start whenever your group is ready.',
      guestWaiting:
        'Stay here while new players join and the host gets ready.',
      startGame: 'Start Game',
      compactLiveScores: 'Compact live scores',
      playerJoined: ({ name }) => `${name} joined the room.`,
      playerLeft: ({ name }) => `${name} left the room.`,
    },
    roomCodeBox: {
      badge: 'Private Invite',
      label: 'Room Code',
      subtitle: 'Share this code or the invite link to bring friends in fast.',
    },
    share: {
      title: 'Join my TruthDare room',
      text: ({ roomCode }) => `Use room code ${roomCode} to join the party.`,
      whatsappMessage: ({ roomCode, inviteLink }) =>
        `Join my TruthDare room.\nRoom Code: ${roomCode}\nJoin Link: ${inviteLink}`,
    },
    game: {
      syncingTitle: 'Game Room',
      syncingSubtitle: 'Syncing the live game state.',
      loading: 'Connecting to the room...',
      titleWaiting: 'Ready for the next round',
      titleSpinning: 'Bottle is spinning',
      turnTitle: ({ name }) => `${name}'s turn`,
      waitingSummary: 'Spin the bottle to pick the next player.',
      choiceSummary: ({ name }) => `${name} is choosing Truth or Dare.`,
      promptSummary:
        'The challenge is live. Finish it or skip it to keep the game moving.',
      resolvedSummary:
        'Points are locked in. Start the next round when everyone are ready.',
      spotlight: 'Spotlight',
      noPlayerYet: 'No player yet',
      spotlightSelected: ({ name }) => `${name} is in the hot seat for this round.`,
      spotlightEmpty: 'Spin the bottle to choose who goes next.',
      challengeTitle: 'Challenge',
      challengeSubtitle: 'Truths and dares show up here for the whole room.',
      challengePlaceholder:
        'The next Truth or Dare challenge will appear here after the selected player chooses.',
      roundScoredComplete: ({ points }) => `Round scored: +${points} points`,
      roundScoredSkip: ({ points }) => `${points} points applied for skip`,
      roundControls: 'Round Controls',
      roundControlsHost:
        'Everyone is ready. Spin the bottle to choose the next player.',
      roundControlsGuest: 'Waiting for the host to spin the bottle.',
      roundControlsSpinning: 'The bottle is spinning. Watch where it lands.',
      roundControlsChoice: ({ name }) =>
        `${name} is choosing between Truth and Dare.`,
      roundControlsChoiceFallback: 'Waiting for the selected player to choose.',
      roundControlsPrompt:
        'Complete the prompt, then move on when the room is ready.',
      roundControlsResolved:
        'Points locked in. Start the next round when everyone are ready.',
      hostControlsRound:
        'The host controls the spin and round reset for this room.',
      spinToPlay: 'Spin to Play',
      nextRound: 'Next Round',
      liveScoring: 'Live scoring',
      playersInGame: ({ count }) =>
        `${count} player${count === 1 ? '' : 's'} in the game.`,
      liveReady: 'The game is live. Host can spin when ready.',
      spinStarted: 'The bottle is spinning...',
      playerSelected: ({ name }) => `${name} was selected.`,
      playerSelectedFallback: 'A player was selected.',
      autoPicked: ({ name, choice }) =>
        `${name} took too long, so ${choice} was auto-picked.`,
      choiceMade: ({ name, choice }) => `${name} chose ${choice}.`,
      choiceMadeFallback: ({ choice }) =>
        `The selected player chose ${choice}.`,
      roundReset: 'New round ready. Spin again when everyone is set.',
      roundScored: ({ name, action, points }) =>
        `${name} ${action} the round (${points > 0 ? `+${points}` : points} pts).`,
      completed: 'completed',
      skipped: 'skipped',
    },
    choiceModal: {
      currentPlayerText:
        'It is your turn. Pick Truth or Dare and the room will see your challenge instantly.',
      otherPlayerText: ({ name }) =>
        `${name} is choosing between Truth and Dare right now.`,
      truthHint: 'Stay honest',
      dareHint: 'Take the risk',
    },
    challengeActions: {
      completeDare: 'Complete Dare for +20',
      completeTruth: 'Complete Truth for +10',
      losePoints: 'Lose 5 points',
    },
    players: {
      waiting: 'Waiting for players to join the room.',
    },
    leaderboard: {
      winner: 'Winner',
    },
  },
  hi: {
    common: {
      brandName: 'TruthDare',
      create: 'बनाएँ',
      join: 'जॉइन करें',
      createRoom: 'रूम बनाएँ',
      joinRoom: 'रूम जॉइन करें',
      yourName: 'आपका नाम',
      roomCode: 'रूम कोड',
      gameMode: 'गेम मोड',
      host: 'होस्ट',
      player: 'प्लेयर',
      players: 'प्लेयर',
      you: 'आप',
      points: 'पॉइंट्स',
      pts: 'पॉइंट्स',
      room: 'रूम',
      round: 'राउंड',
      currentTurn: 'मौजूदा टर्न',
      challenge: 'चैलेंज',
      leaderboard: 'लीडरबोर्ड',
      loading: 'लोड हो रहा है...',
      truth: 'सच',
      dare: 'हिम्मत',
      done: 'पूरा',
      skip: 'स्किप',
      copyCode: 'कोड कॉपी करें',
      copied: 'कॉपी हो गया',
      shared: 'शेयर हो गया',
      copyInvite: 'इनवाइट कॉपी करें',
      shareOnWhatsApp: 'व्हाट्सऐप पर शेयर करें',
      selectedPlayer: 'चुना गया प्लेयर',
      autoPicksIn: 'ऑटो पिक होगा',
      connectionConnected: 'जुड़ा हुआ',
      connectionDisconnected: 'डिस्कनेक्टेड',
      language: 'भाषा',
      switchLanguage: 'भाषा बदलें',
      english: 'English',
      hindi: 'हिन्दी',
    },
    nav: {
      partyGame: 'पार्टी गेम',
    },
    languageGate: {
      badge: 'अपनी भाषा चुनें',
      title: 'पार्टी शुरू होने से पहले अपनी भाषा चुनें।',
      subtitle:
        'TruthDare अंग्रेज़ी और हिन्दी दोनों में उपलब्ध है ताकि आपका पूरा ग्रुप आराम से खेल सके।',
    },
    home: {
      badge: 'लाइव पार्टी गेम',
      title: 'स्पिन. हँसो. हिम्मत करो.',
      subtitle:
        'रूम बनाएँ, दोस्तों को बुलाएँ, और Truth or Dare लाइव खेलें।',
      featureFastRoom: 'फास्ट रूम',
      featureLiveSync: 'लाइव सिंक',
      featureShareCode: 'शेयर कोड',
    },
    create: {
      badge: 'होस्ट सेटअप',
      title: 'रूम बनाएँ',
      subtitle: 'अपना नाम चुनें और नया TruthDare लॉबी खोलें।',
      namePlaceholder: 'अपना नाम लिखें',
      errorMissingName: 'रूम बनाने से पहले अपना नाम लिखें।',
      loading: 'रूम बनाया जा रहा है...',
    },
    joinRoom: {
      badge: 'पार्टी में आएँ',
      title: 'रूम जॉइन करें',
      subtitle: 'अपना नाम और रूम कोड डालें और सीधे लॉबी में जाएँ।',
      namePlaceholder: 'अपना नाम लिखें',
      roomCodePlaceholder: 'ABCD12',
      errorMissingDetails: 'अपना नाम और रूम कोड डालें।',
      loading: 'रूम जॉइन किया जा रहा है...',
    },
    modes: {
      normal: {
        label: 'नॉर्मल मोड',
        description: 'क्लासिक Truth or Dare, आसान पार्टी वाइब के साथ।',
      },
      funny: {
        label: 'फनी मोड',
        description: 'ज़्यादा मजेदार प्रॉम्प्ट्स, जोरदार हँसी और हल्का कैओस।',
      },
      crush: {
        label: 'क्रश मोड',
        description: 'क्यूट, फ्लर्टी और रोमांटिक वाइब वाले प्रॉम्प्ट्स।',
      },
      roast: {
        label: 'रोस्ट मोड',
        description: 'दोस्ताना छेड़छाड़ और सेफ सैवेज फन।',
      },
      'deep-talk': {
        label: 'डीप टॉक मोड',
        description: 'दिल से जुड़े सवाल, क्लोज फ्रेंड एनर्जी के लिए।',
      },
    },
    lobby: {
      syncingTitle: 'लॉबी',
      syncingSubtitle: 'रूम की ताज़ा स्थिति सिंक हो रही है।',
      loading: 'रूम लोड हो रहा है...',
      title: 'लॉबी',
      subtitle:
        'सबको बुलाइए, रूम भरते हुए देखिए, और सही वाइब पर गेम शुरू कीजिए।',
      playerCount: ({ count }) => `${count} प्लेयर`,
      playersInRoom: ({ count }) => `रूम में ${count} प्लेयर`,
      hostControlsStart: 'गेम शुरू करने का कंट्रोल होस्ट के पास है',
      roomStatus: 'रूम स्टेटस',
      waitingForPlayers: 'और प्लेयर्स का इंतज़ार है',
      roomReady: 'आपका रूम अब शुरू करने के लिए तैयार है',
      hostRoomStatus:
        'कोड शेयर करें, लॉबी को भरते देखें, और सही समय पर गेम शुरू करें।',
      guestRoomStatus:
        'आप अंदर आ चुके हैं। होस्ट के तैयार होने तक यहीं रहें।',
      waitingHostStart: 'होस्ट के गेम शुरू करने का इंतज़ार करें।',
      needTwoPlayers: 'गेम शुरू करने से पहले कम से कम 2 प्लेयर चाहिए।',
      everyoneIn: 'सब आ चुके हैं। जब मन हो गेम शुरू करें।',
      guestWaiting: 'नए प्लेयर्स जुड़ने और होस्ट के तैयार होने तक यहीं रहें।',
      startGame: 'गेम शुरू करें',
      compactLiveScores: 'लाइव स्कोर',
      playerJoined: ({ name }) => `${name} रूम में जुड़ गया।`,
      playerLeft: ({ name }) => `${name} रूम छोड़ गया।`,
    },
    roomCodeBox: {
      badge: 'प्राइवेट इनवाइट',
      label: 'रूम कोड',
      subtitle:
        'दोस्तों को जल्दी बुलाने के लिए यह कोड या इनवाइट लिंक शेयर करें।',
    },
    share: {
      title: 'मेरे TruthDare रूम में जॉइन करें',
      text: ({ roomCode }) => `पार्टी में आने के लिए रूम कोड ${roomCode} इस्तेमाल करें।`,
      whatsappMessage: ({ roomCode, inviteLink }) =>
        `मेरे TruthDare रूम में जॉइन करें।\nरूम कोड: ${roomCode}\nजॉइन लिंक: ${inviteLink}`,
    },
    game: {
      syncingTitle: 'गेम रूम',
      syncingSubtitle: 'लाइव गेम स्टेट सिंक हो रही है।',
      loading: 'रूम से कनेक्ट हो रहा है...',
      titleWaiting: 'अगले राउंड के लिए तैयार',
      titleSpinning: 'बॉटल घूम रही है',
      turnTitle: ({ name }) => `${name} की बारी`,
      waitingSummary: 'अगला प्लेयर चुनने के लिए बॉटल घुमाएँ।',
      choiceSummary: ({ name }) => `${name} सच या हिम्मत चुन रहा है।`,
      promptSummary:
        'चैलेंज लाइव है। गेम को आगे बढ़ाने के लिए इसे पूरा करें या स्किप करें।',
      resolvedSummary:
        'पॉइंट्स लॉक हो चुके हैं। सब तैयार हों तो अगला राउंड शुरू करें।',
      spotlight: 'स्पॉटलाइट',
      noPlayerYet: 'अभी कोई नहीं',
      spotlightSelected: ({ name }) => `इस राउंड में ${name} हॉट सीट पर है।`,
      spotlightEmpty: 'अगला प्लेयर चुनने के लिए बॉटल घुमाएँ।',
      challengeTitle: 'चैलेंज',
      challengeSubtitle: 'सच और हिम्मत वाले प्रॉम्प्ट्स पूरे रूम को यहीं दिखेंगे।',
      challengePlaceholder:
        'चुना गया प्लेयर जैसे ही सच या हिम्मत चुनेगा, अगला चैलेंज यहीं दिखेगा।',
      roundScoredComplete: ({ points }) => `राउंड स्कोर: +${points} पॉइंट्स`,
      roundScoredSkip: ({ points }) => `स्किप पर ${points} पॉइंट्स लागू हुए`,
      roundControls: 'राउंड कंट्रोल्स',
      roundControlsHost:
        'सब तैयार हैं। अगला प्लेयर चुनने के लिए बॉटल घुमाएँ।',
      roundControlsGuest: 'होस्ट के बॉटल घुमाने का इंतज़ार करें।',
      roundControlsSpinning: 'बॉटल घूम रही है। देखें यह किस पर रुकती है।',
      roundControlsChoice: ({ name }) =>
        `${name} सच और हिम्मत के बीच चुन रहा है।`,
      roundControlsChoiceFallback: 'चुने गए प्लेयर के चुनाव का इंतज़ार करें।',
      roundControlsPrompt:
        'प्रॉम्प्ट पूरा करें, फिर रूम तैयार हो तो आगे बढ़ें।',
      roundControlsResolved:
        'पॉइंट्स लॉक हैं। सब तैयार हों तो अगला राउंड शुरू करें।',
      hostControlsRound:
        'इस रूम में स्पिन और अगले राउंड का कंट्रोल होस्ट के पास है।',
      spinToPlay: 'स्पिन करें',
      nextRound: 'अगला राउंड',
      liveScoring: 'लाइव स्कोर',
      playersInGame: ({ count }) => `गेम में ${count} प्लेयर`,
      liveReady: 'गेम लाइव है। होस्ट जब चाहे स्पिन कर सकता है।',
      spinStarted: 'बॉटल घूम रही है...',
      playerSelected: ({ name }) => `${name} चुना गया।`,
      playerSelectedFallback: 'एक प्लेयर चुना गया।',
      autoPicked: ({ name, choice }) =>
        `${name} ने देर कर दी, इसलिए ${choice} ऑटो-पिक हो गया।`,
      choiceMade: ({ name, choice }) => `${name} ने ${choice} चुना।`,
      choiceMadeFallback: `चुने गए प्लेयर ने अपना विकल्प चुन लिया।`,
      roundReset: 'नया राउंड तैयार है। सब सेट हों तो फिर से स्पिन करें।',
      roundScored: ({ name, action, points }) =>
        `${name} ने राउंड ${action} (${points > 0 ? `+${points}` : points} पॉइंट्स)।`,
      completed: 'पूरा किया',
      skipped: 'स्किप किया',
    },
    choiceModal: {
      currentPlayerText:
        'यह आपकी बारी है। सच या हिम्मत चुनें और रूम को आपका चैलेंज तुरंत दिखेगा।',
      otherPlayerText: ({ name }) =>
        `${name} अभी सच और हिम्मत के बीच चुन रहा है।`,
      truthHint: 'ईमानदार रहें',
      dareHint: 'रिस्क लें',
    },
    challengeActions: {
      completeDare: 'हिम्मत पूरी करें +20',
      completeTruth: 'सच पूरा करें +10',
      losePoints: '5 पॉइंट्स खोएँ',
    },
    players: {
      waiting: 'प्लेयर के जुड़ने का इंतज़ार है।',
    },
    leaderboard: {
      winner: 'विनर',
    },
  },
};

function resolveKey(target, key) {
  return key.split('.').reduce((current, segment) => current?.[segment], target);
}

export function getTranslation(language, key, params = {}) {
  const safeLanguage = translations[language] ? language : 'en';
  const value =
    resolveKey(translations[safeLanguage], key) ??
    resolveKey(translations.en, key) ??
    key;

  if (typeof value === 'function') {
    return value(params);
  }

  return value;
}
