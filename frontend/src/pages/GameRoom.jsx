import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChallengeActions from '../components/ChallengeActions';
import Card from '../components/Card';
import ChoiceModal from '../components/ChoiceModal';
import GameControls from '../components/GameControls';
import GameCard from '../components/GameCard';
import Leaderboard from '../components/Leaderboard';
import LoadingSpinner from '../components/LoadingSpinner';
import PlayerCircle from '../components/PlayerCircle';
import QuestionCard from '../components/QuestionCard';
import SpinBottle from '../components/SpinBottle';
import { useRoom } from '../context/RoomContext';
import { gameModes } from '../data/gameModes';
import { playRevealSound, playSpinSound } from '../lib/gameAudio';

function GameRoom() {
  const navigate = useNavigate();
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
      setStatusMessage('The bottle is spinning...');
    };

    const handlePlayerSelected = ({ player }) => {
      playRevealSound();
      setStatusMessage(
        player ? `${player.name} was selected.` : 'A player was selected.',
      );
    };

    const handlePromptRevealed = ({ player, choice, autoSelected }) => {
      playRevealSound();
      setStatusMessage(
        player
          ? autoSelected
            ? `${player.name} took too long, so ${choice} was auto-picked.`
            : `${player.name} chose ${choice}.`
          : `The selected player chose ${choice}.`,
      );
    };

    const handleRoundReset = () => {
      setStatusMessage('New round ready. Spin again when everyone is set.');
    };
    const handleRoundScored = ({ player, action, points }) => {
      setStatusMessage(
        `${player.name} ${action === 'completed' ? 'completed the round' : 'skipped the round'} (${points > 0 ? `+${points}` : points} pts).`,
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
  }, [socket]);

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
      setStatusMessage('The game is live. Host can spin when ready.');
    }

    previousPhaseRef.current = phase;
  }, [room]);

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
  const modeLabel =
    gameModes.find((mode) => mode.id === room?.mode)?.label || 'Normal Mode';
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
      <div className="mx-auto flex min-h-[50vh] w-full max-w-2xl items-center justify-center">
        <Card
          title="Game Room"
          subtitle="We are syncing your live game state."
          className="w-full"
        >
          <LoadingSpinner label="Connecting to the room..." />
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

      <div className="grid gap-6 py-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card
          title="Truth or Dare"
          subtitle="Watch the bottle spin, see who it lands on, and let the chosen player pick their challenge."
        >
          <div className="space-y-6">
            {/* Phase 2 can layer in richer turn UI, timers, and scoring without replacing the synced room state. */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-bubblegum/10 via-slate-950/50 to-aurora/10 px-3 py-5 sm:px-6">
              <PlayerCircle
                players={room.players}
                selectedPlayerId={selectedPlayer?.id}
                currentPlayerId={currentPlayer?.id}
              />
              <SpinBottle
                rotation={gameState?.spinnerRotation || 0}
                duration={gameState?.spinDuration || 700}
                isSpinning={gameState?.phase === 'spinning'}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Suspense Meter
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-white">
                {gameState?.phase === 'spinning'
                  ? 'Bottle is spinning...'
                  : selectedPlayer
                    ? `${selectedPlayer.name} is up`
                    : 'Ready for the next spin'}
              </p>
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

        <div className="grid gap-5">
          <GameCard
            title={`Round ${Math.max(gameState?.round || 0, 1)}`}
            description={
              statusMessage ||
              'The host can spin the bottle to start the round.'
            }
            accent="from-bubblegum to-flare"
          />
          <Card
            title="Challenge"
            subtitle="Truths and dares are revealed here for the whole room."
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
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GameCard
          title="Room Status"
          description={`Room ${room.code} is active with ${room.players.length} player${room.players.length === 1 ? '' : 's'}.`}
          accent="from-bubblegum to-flare"
        />
        <GameCard
          title="Selected Player"
          description={
            selectedPlayer
              ? `${selectedPlayer.name} is in the spotlight for this round.`
              : 'Nobody has been selected yet. Spin the bottle to choose a player.'
          }
          accent="from-aurora to-neon"
        />
        <GameCard
          title={modeLabel}
          description="Mode-based prompts, timer pressure, and score tracking are all synced live for everyone."
          accent="from-flare to-aurora"
        />
      </div>

      <div className="mt-6">
        <Card
          title="Leaderboard"
          subtitle="Truth completed +10, Dare completed +20, Skip -5."
        >
          <Leaderboard players={room.players} />
        </Card>
      </div>
    </>
  );
}

export default GameRoom;
