import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChallengeActions from '../components/ChallengeActions';
import Card from '../components/Card';
import ChoiceModal from '../components/ChoiceModal';
import GameControls from '../components/GameControls';
import Leaderboard from '../components/Leaderboard';
import LoadingSpinner from '../components/LoadingSpinner';
import PlayerCircle from '../components/PlayerCircle';
import PlayerList from '../components/PlayerList';
import QuestionCard from '../components/QuestionCard';
import SpinBottle from '../components/SpinBottle';
import { useLanguage } from '../context/LanguageContext';
import { useRoom } from '../context/RoomContext';
import { gameModes } from '../data/gameModes';
import { playRevealSound, playSpinSound } from '../lib/gameAudio';

function HeartAccent() {
  return (
    <span className="inline-flex h-6 w-6 translate-y-1 items-center justify-center text-[#ff4f89]">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A5.96 5.96 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
      </svg>
    </span>
  );
}

function GameRoom() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { roomCode } = useParams();
  const { room, currentPlayer, socket, connectionState } = useRoom();
  const [statusMessage, setStatusMessage] = useState('');
  const [isActionPending, setIsActionPending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const previousPhaseRef = useRef(null);

  useEffect(() => {
    if (room && room.code !== roomCode?.toUpperCase()) {
      navigate('/');
    }
  }, [navigate, room, roomCode]);

  useEffect(() => {
    if (room?.status === 'lobby') {
      navigate(`/lobby/${room.code}`);
    }
  }, [navigate, room]);

  useEffect(() => {
    const handleSpinStarted = () => {
      playSpinSound();
      setStatusMessage(t('game.spinStarted'));
    };

    const handlePlayerSelected = ({ player }) => {
      playRevealSound();
      setStatusMessage(
        player
          ? t('game.playerSelected', { name: player.name })
          : t('game.playerSelectedFallback'),
      );
    };

    const handlePromptRevealed = ({ player, choice, autoSelected }) => {
      playRevealSound();
      const localizedChoice =
        choice === 'truth' ? t('common.truth') : t('common.dare');
      setStatusMessage(
        player
          ? autoSelected
            ? t('game.autoPicked', {
                name: player.name,
                choice: localizedChoice,
              })
            : t('game.choiceMade', {
                name: player.name,
                choice: localizedChoice,
              })
          : t('game.choiceMadeFallback', { choice: localizedChoice }),
      );
    };

    const handleRoundReset = () => {
      setStatusMessage(t('game.roundReset'));
    };

    const handleRoundScored = ({ player, action, points }) => {
      const localizedAction =
        action === 'completed' ? t('game.completed') : t('game.skipped');
      setStatusMessage(
        t('game.roundScored', {
          name: player.name,
          action: localizedAction,
          points,
        }),
      );
    };

    socket.on('spin-started', handleSpinStarted);
    socket.on('player-selected', handlePlayerSelected);
    socket.on('prompt-revealed', handlePromptRevealed);
    socket.on('round-reset', handleRoundReset);
    socket.on('round-scored', handleRoundScored);

    return () => {
      socket.off('spin-started', handleSpinStarted);
      socket.off('player-selected', handlePlayerSelected);
      socket.off('prompt-revealed', handlePromptRevealed);
      socket.off('round-reset', handleRoundReset);
      socket.off('round-scored', handleRoundScored);
    };
  }, [socket, t]);

  useEffect(() => {
    const deadline = room?.gameState?.choiceDeadlineAt;

    if (!deadline || room?.gameState?.phase !== 'choice') {
      setSecondsLeft(10);
      return undefined;
    }

    const updateSeconds = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };

    updateSeconds();
    const intervalId = window.setInterval(updateSeconds, 300);

    return () => window.clearInterval(intervalId);
  }, [room?.gameState?.choiceDeadlineAt, room?.gameState?.phase]);

  useEffect(() => {
    const phase = room?.gameState?.phase;

    if (!phase || previousPhaseRef.current === phase) {
      return;
    }

    if (phase === 'waiting' && room?.gameState?.round === 0) {
      setStatusMessage(t('game.liveReady'));
    }

    previousPhaseRef.current = phase;
  }, [room, t]);

  const currentPlayerInRoom = useMemo(
    () => room?.players.find((player) => player.id === currentPlayer?.id) || null,
    [currentPlayer?.id, room],
  );

  const selectedPlayer = useMemo(
    () =>
      room?.players.find(
        (player) => player.id === room?.gameState?.selectedPlayerId,
      ) || null,
    [room],
  );

  const gameState = room?.gameState;
  const modeLabel = t(`modes.${room?.mode || gameModes[0].id}.label`);
  const isHost = Boolean(currentPlayerInRoom?.isHost);
  const isSelectedPlayer = Boolean(
    selectedPlayer && currentPlayerInRoom?.id === selectedPlayer.id,
  );
  const canResolveRound =
    ['prompt'].includes(gameState?.phase) && (isSelectedPlayer || isHost);
  const canSpin =
    isHost &&
    room?.players.length > 1 &&
    gameState?.phase === 'waiting' &&
    connectionState === 'connected';
  const canNextRound =
    isHost &&
    ['prompt', 'resolved'].includes(gameState?.phase) &&
    connectionState === 'connected';
  const roundNumber = Math.max(gameState?.round || 0, 1);
  const spotlightPlayer = selectedPlayer || currentPlayerInRoom;
  const spotlightFallback = spotlightPlayer?.name?.slice(0, 1).toUpperCase() || 'P';
  const turnTitle =
    gameState?.phase === 'spinning'
      ? t('game.titleSpinning')
      : selectedPlayer
        ? t('game.turnTitle', { name: selectedPlayer.name })
        : t('game.titleWaiting');
  const turnSummary =
    statusMessage ||
    (gameState?.phase === 'waiting'
      ? t('game.waitingSummary')
      : gameState?.phase === 'choice'
        ? t('game.choiceSummary', {
            name: selectedPlayer?.name || t('common.players'),
          })
        : gameState?.phase === 'prompt'
          ? t('game.promptSummary')
          : t('game.resolvedSummary'));

  const handleSpin = () => {
    if (!room) {
      return;
    }

    setIsActionPending(true);
    socket.emit('spin-bottle', { roomCode: room.code }, (response) => {
      setIsActionPending(false);

      if (!response?.ok) {
        setStatusMessage(response?.message || 'Unable to spin right now.');
      }
    });
  };

  const handleChoose = (choice) => {
    if (!room) {
      return;
    }

    setIsActionPending(true);
    socket.emit('choose-option', { roomCode: room.code, choice }, (response) => {
      setIsActionPending(false);

      if (!response?.ok) {
        setStatusMessage(response?.message || 'Unable to submit that choice.');
      }
    });
  };

  const handleNextRound = () => {
    if (!room) {
      return;
    }

    setIsActionPending(true);
    socket.emit('next-round', { roomCode: room.code }, (response) => {
      setIsActionPending(false);

      if (!response?.ok) {
        setStatusMessage(response?.message || 'Unable to move to the next round.');
      }
    });
  };

  const handleRoundResult = (action) => {
    if (!room) {
      return;
    }

    setIsActionPending(true);
    socket.emit(
      'submit-round-result',
      { roomCode: room.code, action },
      (response) => {
        setIsActionPending(false);

        if (!response?.ok) {
          setStatusMessage(
            response?.message || 'Unable to update the round result.',
          );
        }
      },
    );
  };

  if (!room) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-md items-center justify-center">
        <Card
          title={t('game.syncingTitle')}
          subtitle={t('game.syncingSubtitle')}
          className="w-full"
        >
          <LoadingSpinner label={t('game.loading')} />
        </Card>
      </div>
    );
  }

  return (
    <>
      <ChoiceModal
        isOpen={gameState?.phase === 'choice'}
        selectedPlayer={selectedPlayer}
        isCurrentPlayerTurn={isSelectedPlayer}
        isSubmitting={isActionPending}
        onChoose={handleChoose}
        secondsLeft={secondsLeft}
        modeLabel={modeLabel}
      />

      <div className="grid gap-3 py-3">
        <div className="grid gap-4">
          <Card className="truthdare-main-play-shell overflow-hidden">
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truthdare-chip truthdare-chip-room">
                    {t('common.room')} {room.code}
                  </span>
                  <span className="truthdare-chip truthdare-chip-round">
                    {t('common.round')} {roundNumber}
                  </span>
                  <span className="truthdare-chip truthdare-chip-mode">
                    {modeLabel}
                  </span>
                </div>

                <div>
                  <p className="truthdare-section-label">{t('common.currentTurn')}</p>
                  <h1 className="mt-3 flex items-center gap-2 font-display text-[2.4rem] font-bold tracking-[-0.07em] text-white">
                    <span>{turnTitle}</span>
                    {selectedPlayer ? <HeartAccent /> : null}
                  </h1>
                  <p className="mt-3 max-w-[18rem] text-[1rem] leading-8 text-slate-300">
                    {turnSummary}
                  </p>
                </div>
              </div>

              <div className="truthdare-spotlight p-5">
                <div className="truthdare-spotlight-hearts" />
                <div className="relative flex items-start gap-4">
                  <div
                    className={[
                      'flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-[1.45rem] bg-gradient-to-br from-[#8b5cf6] via-[#a855f7] to-[#ec4899] text-xl font-semibold text-white shadow-[0_0_34px_rgba(217,70,239,0.28)]',
                      selectedPlayer ? 'selected-player-glow' : '',
                    ].join(' ')}
                  >
                    {spotlightPlayer?.avatar || spotlightFallback}
                  </div>
                  <div className="min-w-0">
                    <p className="truthdare-section-label">{t('game.spotlight')}</p>
                    <p className="mt-2 font-display text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {selectedPlayer ? selectedPlayer.name : t('game.noPlayerYet')}
                    </p>
                    <p className="mt-3 max-w-[15rem] text-[1rem] leading-8 text-slate-300">
                      {selectedPlayer
                        ? t('game.spotlightSelected', { name: selectedPlayer.name })
                        : t('game.spotlightEmpty')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="truthdare-wheel-shell p-4">
                <div className="game-bottle-stage relative overflow-hidden rounded-[1.7rem] border border-white/10 px-3 py-6">
                  <div className="pointer-events-none absolute inset-x-12 top-8 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-2xl" />

                  <div className="relative mx-auto flex min-h-[18rem] items-center justify-center">
                    <SpinBottle
                      rotation={gameState?.spinnerRotation || 0}
                      duration={gameState?.spinDuration || 700}
                      isSpinning={gameState?.phase === 'spinning'}
                    />
                  </div>

                  <div className="mt-4">
                    <PlayerCircle
                      players={room.players}
                      selectedPlayerId={selectedPlayer?.id}
                      currentPlayerId={currentPlayer?.id}
                      layout="chips"
                    />
                  </div>

                  <p className="pb-2 pt-5 text-center text-[1rem] uppercase tracking-[0.38em] text-slate-400">
                    {t('game.spinToPlay')}
                    <span className="ml-2 inline-block align-middle text-[#ff4f89]">♡</span>
                  </p>
                </div>
              </div>

              <GameControls
                phase={gameState?.phase}
                isHost={isHost}
                canSpin={canSpin}
                canNextRound={canNextRound}
                onSpin={handleSpin}
                onNextRound={handleNextRound}
                selectedPlayerName={selectedPlayer?.name}
                connectionState={connectionState}
                isActionPending={isActionPending}
              />
            </div>
          </Card>

          <Card
            title={t('game.challengeTitle')}
            subtitle={t('game.challengeSubtitle')}
          >
            <div className="space-y-4">
              <QuestionCard
                selectedPlayerName={selectedPlayer?.name}
                selectedPlayerAvatar={selectedPlayer?.avatar}
                choice={gameState?.selectedChoice}
                prompt={gameState?.currentPrompt}
                modeLabel={modeLabel}
                roundResult={gameState?.roundResult}
              />
              <ChallengeActions
                canAct={canResolveRound}
                onComplete={() => handleRoundResult('completed')}
                onSkip={() => handleRoundResult('skipped')}
                isSubmitting={isActionPending}
                choice={gameState?.selectedChoice}
              />
            </div>
          </Card>
        </div>

        <Card
          title={t('common.players')}
          subtitle={t('game.playersInGame', { count: room.players.length })}
        >
          <PlayerList players={room.players} currentPlayerId={currentPlayer?.id} />

          <div className="mt-5 border-t border-white/10 pt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="section-kicker">{t('common.leaderboard')}</p>
              <p className="text-xs text-slate-500">{t('game.liveScoring')}</p>
            </div>
            <Leaderboard players={room.players} compact />
          </div>
        </Card>
      </div>
    </>
  );
}

export default GameRoom;
