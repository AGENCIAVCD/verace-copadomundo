import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './App.css';

type GameMode = 'starter' | 'world' | 'battle';
type Turn = 'player' | 'enemy' | 'none';

type PokemonApiListItem = {
  name: string;
  url: string;
};

type PokemonApiList = {
  results: PokemonApiListItem[];
};

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonDetail = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
};

type MoveApiDetail = {
  name: string;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  damage_class: {
    name: string;
  };
  type: {
    name: string;
  };
};

type TypeApiDetail = {
  damage_relations: {
    double_damage_to: Array<{ name: string }>;
    half_damage_to: Array<{ name: string }>;
    no_damage_to: Array<{ name: string }>;
  };
};

type MoveInfo = {
  name: string;
  power: number;
  accuracy: number;
  pp: number;
  type: string;
  damageClass: 'physical' | 'special';
};

type Fighter = {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  types: string[];
  abilities: string[];
  moves: MoveInfo[];
  spriteFront: string;
  spriteBack: string;
  spriteAnimated: string;
};

type Position = {
  x: number;
  y: number;
};

const POKE_API = 'https://pokeapi.co/api/v2';
const WORLD_BGM_URL = 'https://play.pokemonshowdown.com/audio/xy-trainer.mp3';
const BATTLE_BGM_URL = 'https://play.pokemonshowdown.com/audio/bw-trainer.mp3';
const STARTERS = ['bulbasaur', 'charmander', 'squirtle'];
const STARTER_IDS: Record<string, number> = {
  bulbasaur: 1,
  charmander: 4,
  squirtle: 7,
};
const WILD_POOL = ['pidgey', 'rattata', 'caterpie', 'weedle', 'zubat', 'oddish', 'bellsprout', 'geodude'];

const WORLD_MAP = [
  '##########################',
  '#tttttttttttttttttttttttt#',
  '#t...oooo...rrrr...bbbb.t#',
  '#t...ohho...r..r...bhhb.t#',
  '#t...oood...r..r...bbbd.t#',
  '#t....rrr...r..r........t#',
  '#t...gggg...r..r...wwww.t#',
  '#t...gggg...====...wwww.t#',
  '#t......pppppppp........t#',
  '#t..tt..p....ggp..tt....t#',
  '#t..tt..p....ggp..tt....t#',
  '#t......pppppppp........t#',
  '#t...wwww....rrrr...gg..t#',
  '#t...wwww....r..r...gg..t#',
  '#t...........r..r.......t#',
  '#t...oooo....r..r...bbbbt#',
  '#t...ohhd....r..r...bhhdt#',
  '#t...oooo....rrrr...bbbbt#',
  '#tttttttttttttttttttttttt#',
  '##########################',
];

const typeColors: Record<string, string> = {
  normal: '#bcb8a8',
  fire: '#ff8a3d',
  water: '#57aef2',
  electric: '#f6db57',
  grass: '#65c86d',
  ice: '#8ee4f2',
  fighting: '#cf6472',
  poison: '#ae7cff',
  ground: '#bf9f6f',
  flying: '#9fb6ff',
  psychic: '#ff76c1',
  bug: '#9acc5b',
  rock: '#a8926a',
  ghost: '#8378d7',
  dragon: '#6171f7',
  dark: '#7e654f',
  steel: '#93adbe',
  fairy: '#ff9fe0',
};

const typeCache = new Map<string, TypeApiDetail['damage_relations']>();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function formatLabel(text: string) {
  return text.replace(/-/g, ' ');
}

function getStat(stats: PokemonStat[], statName: string, fallback: number) {
  const stat = stats.find((item) => item.stat.name === statName);
  return stat?.base_stat ?? fallback;
}

function getTileClass(tile: string) {
  switch (tile) {
    case 'g':
      return 'grass';
    case '#':
      return 'frame-wall';
    case 'w':
      return 'water';
    case 'r':
      return 'road';
    case 't':
      return 'tree';
    case 'p':
      return 'plaza';
    case '=':
      return 'bridge';
    case 'o':
      return 'roof-orange';
    case 'b':
      return 'roof-blue';
    case 'h':
      return 'house-wall';
    case 'd':
      return 'door';
    default:
      return 'path';
  }
}

function isWalkableTile(x: number, y: number) {
  const row = WORLD_MAP[y];
  if (!row) {
    return false;
  }
  const tile = row[x];
  return tile === '.' || tile === 'g' || tile === 'r' || tile === 'p' || tile === '=' || tile === 'd';
}

function isGrassTile(x: number, y: number) {
  return WORLD_MAP[y]?.[x] === 'g';
}

async function fetchPokemonList(limit = 151): Promise<PokemonApiListItem[]> {
  const response = await fetch(`${POKE_API}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Nao foi possivel carregar lista da PokeAPI.');
  }

  const data: PokemonApiList = await response.json();
  return data.results;
}

async function fetchTypeRelations(typeName: string) {
  if (typeCache.has(typeName)) {
    return typeCache.get(typeName)!;
  }

  const response = await fetch(`${POKE_API}/type/${typeName}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar relacao de tipos.');
  }

  const data: TypeApiDetail = await response.json();
  typeCache.set(typeName, data.damage_relations);
  return data.damage_relations;
}

async function calculateTypeMultiplier(moveType: string, defenderTypes: string[]) {
  const relations = await fetchTypeRelations(moveType);
  let multiplier = 1;

  defenderTypes.forEach((defenderType) => {
    if (relations.no_damage_to.some((item) => item.name === defenderType)) {
      multiplier *= 0;
      return;
    }
    if (relations.double_damage_to.some((item) => item.name === defenderType)) {
      multiplier *= 2;
      return;
    }
    if (relations.half_damage_to.some((item) => item.name === defenderType)) {
      multiplier *= 0.5;
    }
  });

  return multiplier;
}

async function fetchMoveDetails(url: string): Promise<MoveInfo | null> {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }

  const data: MoveApiDetail = await response.json();
  if (!data.power || !data.accuracy || data.damage_class.name === 'status') {
    return null;
  }

  if (data.damage_class.name !== 'physical' && data.damage_class.name !== 'special') {
    return null;
  }

  return {
    name: data.name,
    power: data.power,
    accuracy: data.accuracy,
    pp: data.pp ?? 20,
    type: data.type.name,
    damageClass: data.damage_class.name,
  };
}

async function fetchMoves(detail: PokemonDetail): Promise<MoveInfo[]> {
  const sampled = [...detail.moves].sort(() => Math.random() - 0.5).slice(0, 26);
  const details = await Promise.all(sampled.map((item) => fetchMoveDetails(item.move.url)));
  const damaging = details.filter((move): move is MoveInfo => Boolean(move));

  const pokemonTypes = detail.types.map((item) => item.type.name);
  const stab = damaging.filter((move) => pokemonTypes.includes(move.type)).sort((a, b) => b.power - a.power);
  const extra = damaging.filter((move) => !pokemonTypes.includes(move.type)).sort((a, b) => b.power - a.power);

  const chosen = [...stab, ...extra].slice(0, 4);

  if (chosen.length > 0) {
    return chosen;
  }

  return [
    {
      name: 'tackle',
      power: 40,
      accuracy: 100,
      pp: 35,
      type: 'normal',
      damageClass: 'physical',
    },
  ];
}

async function fetchPokemonByName(name: string): Promise<Fighter> {
  const response = await fetch(`${POKE_API}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar Pokemon.');
  }

  const detail: PokemonDetail = await response.json();
  const moves = await fetchMoves(detail);
  const hp = getStat(detail.stats, 'hp', 60);

  return {
    id: detail.id,
    name: detail.name,
    hp,
    maxHp: hp,
    attack: getStat(detail.stats, 'attack', 55),
    defense: getStat(detail.stats, 'defense', 50),
    specialAttack: getStat(detail.stats, 'special-attack', 55),
    specialDefense: getStat(detail.stats, 'special-defense', 50),
    speed: getStat(detail.stats, 'speed', 50),
    types: detail.types.map((item) => item.type.name),
    abilities: detail.abilities.map((item) => item.ability.name),
    moves,
    spriteFront: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${detail.id}.png`,
    spriteBack: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/${detail.id}.png`,
    spriteAnimated: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${detail.id}.gif`,
  };
}

function HealthBar({ label, hp, maxHp }: { label: string; hp: number; maxHp: number }) {
  const pct = clamp((hp / maxHp) * 100, 0, 100);
  return (
    <div className="health-card">
      <div className="health-head">
        <strong>{label}</strong>
        <span>
          {hp}/{maxHp}
        </span>
      </div>
      <div className="health-track">
        <div className="health-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState<GameMode>('starter');
  const [status, setStatus] = useState('Escolha seu Pokemon inicial.');
  const [starterChoice, setStarterChoice] = useState('bulbasaur');
  const [allPokemon, setAllPokemon] = useState<PokemonApiListItem[]>([]);

  const [playerPos, setPlayerPos] = useState<Position>({ x: 3, y: 5 });
  const [playerMon, setPlayerMon] = useState<Fighter | null>(null);
  const [enemyMon, setEnemyMon] = useState<Fighter | null>(null);

  const [turn, setTurn] = useState<Turn>('none');
  const [busy, setBusy] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const worldBgmRef = useRef<HTMLAudioElement | null>(null);
  const battleBgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchPokemonList()
      .then((list) => setAllPokemon(list))
      .catch((error: Error) => setStatus(error.message));
  }, []);

  const starterCards = useMemo(
    () =>
      STARTERS.map((name) => ({
        name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${STARTER_IDS[name]}.png`,
      })),
    [],
  );

  useEffect(() => {
    const world = new Audio(WORLD_BGM_URL);
    world.loop = true;
    world.volume = 0.24;

    const battle = new Audio(BATTLE_BGM_URL);
    battle.loop = true;
    battle.volume = 0.22;

    worldBgmRef.current = world;
    battleBgmRef.current = battle;

    return () => {
      world.pause();
      battle.pause();
      worldBgmRef.current = null;
      battleBgmRef.current = null;
    };
  }, []);

  const unlockAudio = async () => {
    if (audioUnlocked) {
      return;
    }
    try {
      const world = worldBgmRef.current;
      if (!world) {
        return;
      }
      world.volume = 0;
      await world.play();
      world.pause();
      world.currentTime = 0;
      world.volume = 0.24;
      setAudioUnlocked(true);
    } catch {
      setStatus('Toque em SOM para liberar audio no navegador.');
    }
  };

  useEffect(() => {
    const onFirstInput = () => {
      void unlockAudio();
      window.removeEventListener('pointerdown', onFirstInput);
      window.removeEventListener('keydown', onFirstInput);
    };

    window.addEventListener('pointerdown', onFirstInput);
    window.addEventListener('keydown', onFirstInput);

    return () => {
      window.removeEventListener('pointerdown', onFirstInput);
      window.removeEventListener('keydown', onFirstInput);
    };
  }, [audioUnlocked]);

  useEffect(() => {
    const world = worldBgmRef.current;
    const battle = battleBgmRef.current;
    if (!world || !battle) {
      return;
    }

    if (!soundOn || !audioUnlocked) {
      world.pause();
      battle.pause();
      return;
    }

    if (mode === 'battle') {
      world.pause();
      void battle.play().catch(() => {});
      return;
    }

    battle.pause();
    void world.play().catch(() => {});
  }, [mode, soundOn, audioUnlocked]);

  const appendLog = (text: string) => {
    setBattleLog((prev) => [text, ...prev].slice(0, 8));
  };

  const playPokemonCry = (pokemonId: number) => {
    if (!soundOn || !audioUnlocked) {
      return;
    }
    const cry = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`);
    cry.volume = 0.42;
    void cry.play().catch(() => {});
  };

  const startAdventure = async () => {
    if (busy) {
      return;
    }
    setBusy(true);
    setStatus('Montando time inicial...');

    try {
      const starter = await fetchPokemonByName(starterChoice);
      setPlayerMon(starter);
      setMode('world');
      setStatus('Explore a cidade. Use D-pad ou WASD.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao iniciar aventura.';
      setStatus(message);
    } finally {
      setBusy(false);
    }
  };

  const executeAttack = async ({ attacker, defender, move }: { attacker: Fighter; defender: Fighter; move: MoveInfo }) => {
    const hitRoll = Math.random() * 100;
    if (hitRoll > move.accuracy) {
      const miss = `${attacker.name} usou ${formatLabel(move.name)}, mas errou.`;
      appendLog(miss);
      setStatus(miss);
      return { updatedDefender: defender };
    }

    const typeMultiplier = await calculateTypeMultiplier(move.type, defender.types);
    const stab = attacker.types.includes(move.type) ? 1.5 : 1;
    const crit = Math.random() < 0.1 ? 1.5 : 1;
    const randomFactor = 0.85 + Math.random() * 0.15;

    const atk = move.damageClass === 'special' ? attacker.specialAttack : attacker.attack;
    const def = move.damageClass === 'special' ? defender.specialDefense : defender.defense;

    const base = ((((2 * 50) / 5 + 2) * move.power * (atk / Math.max(def, 1))) / 50) + 2;
    const damage = Math.max(1, Math.floor(base * stab * typeMultiplier * crit * randomFactor));

    const hpLeft = clamp(defender.hp - damage, 0, defender.maxHp);
    const updatedDefender = { ...defender, hp: hpLeft };

    const relation = typeMultiplier >= 2 ? 'super efetivo' : typeMultiplier < 1 ? 'pouco efetivo' : 'efetividade normal';
    const text = `${attacker.name} usou ${formatLabel(move.name)} e causou ${damage} (x${typeMultiplier.toFixed(2)} | ${relation}).`;
    appendLog(text);
    setStatus(text);

    return { updatedDefender };
  };

  const chooseEnemyMove = async (attacker: Fighter, defender: Fighter) => {
    let best = attacker.moves[0];
    let score = -1;

    for (const move of attacker.moves) {
      const mult = await calculateTypeMultiplier(move.type, defender.types);
      const now = move.power * mult * (move.accuracy / 100);
      if (now > score) {
        score = now;
        best = move;
      }
    }

    return best;
  };

  const finishBattle = (winner: 'player' | 'enemy') => {
    setTurn('none');
    if (winner === 'player') {
      setStatus('Vitoria! Retornando para a cidade.');
      appendLog('Batalha encerrada: vitoria.');
      window.setTimeout(() => {
        setMode('world');
        setEnemyMon(null);
      }, 950);
      return;
    }

    setStatus('Derrota. Seu Pokemon foi restaurado para continuar.');
    appendLog('Batalha encerrada: derrota.');
    setPlayerMon((prev) => (prev ? { ...prev, hp: prev.maxHp } : prev));
    window.setTimeout(() => {
      setMode('world');
      setEnemyMon(null);
    }, 950);
  };

  const performEnemyTurn = async (currentPlayer: Fighter, currentEnemy: Fighter) => {
    setTurn('enemy');
    setBusy(true);

    await sleep(520);
    const chosen = await chooseEnemyMove(currentEnemy, currentPlayer);
    const result = await executeAttack({ attacker: currentEnemy, defender: currentPlayer, move: chosen });

    setPlayerMon(result.updatedDefender);
    if (result.updatedDefender.hp <= 0) {
      finishBattle('enemy');
      setBusy(false);
      return;
    }

    setTurn('player');
    setStatus((prev) => `${prev} Seu turno.`);
    setBusy(false);
  };

  const onMoveAttack = async (move: MoveInfo) => {
    if (!playerMon || !enemyMon || turn !== 'player' || busy) {
      return;
    }

    setBusy(true);
    const result = await executeAttack({ attacker: playerMon, defender: enemyMon, move });
    const nextEnemy = result.updatedDefender;
    setEnemyMon(nextEnemy);

    if (nextEnemy.hp <= 0) {
      finishBattle('player');
      setBusy(false);
      return;
    }

    await sleep(620);
    await performEnemyTurn(playerMon, nextEnemy);
  };

  const onRun = () => {
    if (mode !== 'battle') {
      return;
    }
    setMode('world');
    setEnemyMon(null);
    setTurn('none');
    setStatus('Voce fugiu da batalha.');
  };

  const triggerEncounter = async () => {
    if (!playerMon || busy || mode !== 'world') {
      return;
    }

    setBusy(true);
    setStatus('Pokemon selvagem apareceu!');

    try {
      const wildName = WILD_POOL[randomInt(0, WILD_POOL.length - 1)];
      const wild = await fetchPokemonByName(wildName);

      const playerReady = { ...playerMon, hp: playerMon.maxHp };
      setPlayerMon(playerReady);
      setEnemyMon(wild);
      setBattleLog([]);
      setSelectedMoveIndex(0);

      const firstTurn = playerReady.speed >= wild.speed ? 'player' : 'enemy';
      setTurn(firstTurn);
      setMode('battle');

      const msg = `${playerReady.name} encontrou ${wild.name}!`;
      setStatus(firstTurn === 'player' ? `${msg} Seu turno.` : `${msg} Turno inimigo.`);
      appendLog(msg);
      playPokemonCry(wild.id);

      if (firstTurn === 'enemy') {
        await sleep(700);
        await performEnemyTurn(playerReady, wild);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha no encontro.';
      setStatus(message);
    } finally {
      setBusy(false);
    }
  };

  const movePlayerBy = (dx: number, dy: number) => {
    if (mode !== 'world' || !playerMon || busy) {
      return;
    }

    setPlayerPos((prev) => {
      const nextX = prev.x + dx;
      const nextY = prev.y + dy;

      if (!isWalkableTile(nextX, nextY)) {
        return prev;
      }

      if (WORLD_MAP[nextY]?.[nextX] === 'd') {
        setStatus('Voce esta na porta de uma casa.');
      }

      if (isGrassTile(nextX, nextY) && Math.random() < 0.18) {
        window.setTimeout(() => {
          void triggerEncounter();
        }, 0);
      }

      return { x: nextX, y: nextY };
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (mode === 'world') {
        const dirs: Record<string, [number, number]> = {
          w: [0, -1],
          arrowup: [0, -1],
          s: [0, 1],
          arrowdown: [0, 1],
          a: [-1, 0],
          arrowleft: [-1, 0],
          d: [1, 0],
          arrowright: [1, 0],
        };

        if (dirs[key]) {
          event.preventDefault();
          movePlayerBy(dirs[key][0], dirs[key][1]);
          return;
        }
      }

      if (mode === 'starter') {
        const idx = STARTERS.indexOf(starterChoice);
        if (['a', 'w', 'arrowleft', 'arrowup'].includes(key)) {
          event.preventDefault();
          setStarterChoice(STARTERS[(idx - 1 + STARTERS.length) % STARTERS.length]);
          return;
        }
        if (['d', 's', 'arrowright', 'arrowdown'].includes(key)) {
          event.preventDefault();
          setStarterChoice(STARTERS[(idx + 1) % STARTERS.length]);
          return;
        }
        if (key === 'enter' && !busy) {
          event.preventDefault();
          void startAdventure();
        }
        return;
      }

      if (mode === 'battle' && playerMon) {
        const count = playerMon.moves.length;
        if (count > 0) {
          if (['w', 'arrowup'].includes(key)) {
            event.preventDefault();
            setSelectedMoveIndex((prev) => Math.max(0, prev - 2));
            return;
          }
          if (['s', 'arrowdown'].includes(key)) {
            event.preventDefault();
            setSelectedMoveIndex((prev) => Math.min(count - 1, prev + 2));
            return;
          }
          if (['a', 'arrowleft'].includes(key)) {
            event.preventDefault();
            setSelectedMoveIndex((prev) => Math.max(0, prev - 1));
            return;
          }
          if (['d', 'arrowright'].includes(key)) {
            event.preventDefault();
            setSelectedMoveIndex((prev) => Math.min(count - 1, prev + 1));
            return;
          }
        }

        if (key === 'enter' && turn === 'player' && !busy) {
          event.preventDefault();
          const move = playerMon.moves[selectedMoveIndex];
          if (move) {
            void onMoveAttack(move);
          }
          return;
        }

        if ((key === 'q' || key === 'escape') && !busy) {
          event.preventDefault();
          onRun();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, starterChoice, playerMon, selectedMoveIndex, turn, busy]);

  const onVirtualPress = (control: 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'start' | 'select') => {
    if (control === 'up') {
      if (mode === 'world') movePlayerBy(0, -1);
      if (mode === 'starter') {
        const idx = STARTERS.indexOf(starterChoice);
        setStarterChoice(STARTERS[(idx - 1 + STARTERS.length) % STARTERS.length]);
      }
      if (mode === 'battle' && playerMon) setSelectedMoveIndex((prev) => Math.max(0, prev - 2));
      return;
    }

    if (control === 'down') {
      if (mode === 'world') movePlayerBy(0, 1);
      if (mode === 'starter') {
        const idx = STARTERS.indexOf(starterChoice);
        setStarterChoice(STARTERS[(idx + 1) % STARTERS.length]);
      }
      if (mode === 'battle' && playerMon) setSelectedMoveIndex((prev) => Math.min(playerMon.moves.length - 1, prev + 2));
      return;
    }

    if (control === 'left') {
      if (mode === 'world') movePlayerBy(-1, 0);
      if (mode === 'starter') {
        const idx = STARTERS.indexOf(starterChoice);
        setStarterChoice(STARTERS[(idx - 1 + STARTERS.length) % STARTERS.length]);
      }
      if (mode === 'battle') setSelectedMoveIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    if (control === 'right') {
      if (mode === 'world') movePlayerBy(1, 0);
      if (mode === 'starter') {
        const idx = STARTERS.indexOf(starterChoice);
        setStarterChoice(STARTERS[(idx + 1) % STARTERS.length]);
      }
      if (mode === 'battle' && playerMon) setSelectedMoveIndex((prev) => Math.min(playerMon.moves.length - 1, prev + 1));
      return;
    }

    if (control === 'a') {
      if (mode === 'starter') {
        void startAdventure();
      } else if (mode === 'battle' && playerMon && turn === 'player' && !busy) {
        const move = playerMon.moves[selectedMoveIndex];
        if (move) {
          void onMoveAttack(move);
        }
      }
      return;
    }

    if (control === 'b') {
      if (mode === 'battle' && !busy) {
        onRun();
      }
      return;
    }

    if (control === 'start') {
      if (!audioUnlocked) {
        void unlockAudio();
      }
      setSoundOn((prev) => !prev);
      return;
    }

    if (control === 'select') {
      setStatus(mode === 'world' ? 'Explore e procure grama para encontrar batalhas.' : 'Selecione com D-pad e confirme com A.');
    }
  };

  return (
    <div className="gbc-console">
      <div className="gbc-top">
        <span>DOT MATRIX WITH STEREO SOUND</span>
      </div>

      <div className="gbc-screen-frame">
        <div className="gbc-screen">
          <header className="screen-header">
            <h1>Poke GBC Journey</h1>
            <div className="header-actions">
              <button className="btn btn-sound" onClick={() => onVirtualPress('start')}>
                {soundOn ? 'Som ON' : 'Som OFF'}
              </button>
            </div>
          </header>

          {mode === 'starter' && (
            <section className="starter-view">
              <h2>Escolha seu inicial</h2>
              <div className="starter-grid">
                {starterCards.map((starter) => (
                  <button
                    key={starter.name}
                    className={`starter-card ${starterChoice === starter.name ? 'active' : ''}`}
                    onClick={() => setStarterChoice(starter.name)}
                    disabled={busy}
                  >
                    <img src={starter.sprite} alt={starter.name} loading="lazy" />
                    <span>{starter.name}</span>
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => void startAdventure()} disabled={busy || !allPokemon.length}>
                {busy ? 'Carregando...' : 'Comecar aventura'}
              </button>
            </section>
          )}

          {mode === 'world' && playerMon && (
            <section className="world-view">
              <div className="info-row">
                <div className="info-card">
                  <strong>Treinador</strong>
                  <p>WASD, setas ou D-pad virtual.</p>
                </div>
                <div className="info-card">
                  <strong>{playerMon.name.toUpperCase()}</strong>
                  <p>Tipos: {playerMon.types.map(formatLabel).join(', ')}</p>
                </div>
              </div>

              <div className="map-wrap">
                <div className="world-map" style={{ '--map-cols': WORLD_MAP[0].length } as CSSProperties}>
                  {WORLD_MAP.map((row, y) =>
                    row.split('').map((tile, x) => <div key={`${x}-${y}`} className={`tile ${getTileClass(tile)}`} />),
                  )}
                  <div className="player" style={{ '--x': playerPos.x, '--y': playerPos.y } as CSSProperties}>
                    <span className="player-shadow" />
                    <span className="player-sprite" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {mode === 'battle' && playerMon && enemyMon && (
            <section className="battle-view">
              <div className="battle-hp">
                <HealthBar label={playerMon.name.toUpperCase()} hp={playerMon.hp} maxHp={playerMon.maxHp} />
                <HealthBar label={enemyMon.name.toUpperCase()} hp={enemyMon.hp} maxHp={enemyMon.maxHp} />
              </div>

              <div className="battlefield">
                <div className="battle-ground" />
                <div className="battle-side player-side">
                  <span className="battle-shadow" />
                  <img src={playerMon.spriteBack} alt={playerMon.name} className="poke-sprite" />
                </div>
                <div className="battle-side enemy-side">
                  <span className="battle-shadow" />
                  <img
                    src={enemyMon.spriteAnimated}
                    alt={enemyMon.name}
                    className="poke-sprite"
                    onError={(event) => {
                      event.currentTarget.src = enemyMon.spriteFront;
                    }}
                  />
                </div>
              </div>

              <div className="meta-row">
                <div className="info-card">
                  <strong>Tipos do oponente</strong>
                  <p>{enemyMon.types.map(formatLabel).join(', ')}</p>
                </div>
                <div className="info-card">
                  <strong>Skills do oponente</strong>
                  <p>{enemyMon.abilities.map(formatLabel).join(', ')}</p>
                </div>
              </div>

              <div className="moves-grid">
                {playerMon.moves.map((move, index) => (
                  <button
                    key={move.name}
                    className={`move-btn ${selectedMoveIndex === index ? 'active' : ''}`}
                    disabled={turn !== 'player' || busy}
                    style={{ '--move-color': typeColors[move.type] ?? '#79c7ff' } as CSSProperties}
                    onClick={() => {
                      setSelectedMoveIndex(index);
                      void onMoveAttack(move);
                    }}
                  >
                    <strong>{formatLabel(move.name)}</strong>
                    <span>
                      {move.type} | PWR {move.power} | ACC {move.accuracy}
                    </span>
                  </button>
                ))}
              </div>

              <div className="actions-row">
                <button className="btn" onClick={onRun} disabled={busy}>
                  Fugir
                </button>
              </div>

              <div className="log-card">
                <strong>Log da batalha</strong>
                {battleLog.map((entry, index) => (
                  <p key={`${entry}-${index}`}>{entry}</p>
                ))}
              </div>
            </section>
          )}

          <footer className="status-bar">{status}</footer>
        </div>
      </div>

      <div className="gbc-controls" role="group" aria-label="Controles Game Boy">
        <div className="dpad">
          <button className="pad up" onClick={() => onVirtualPress('up')} aria-label="Cima" />
          <button className="pad left" onClick={() => onVirtualPress('left')} aria-label="Esquerda" />
          <button className="pad center" aria-hidden="true" tabIndex={-1} />
          <button className="pad right" onClick={() => onVirtualPress('right')} aria-label="Direita" />
          <button className="pad down" onClick={() => onVirtualPress('down')} aria-label="Baixo" />
        </div>

        <div className="ab-controls">
          <button className="action a" onClick={() => onVirtualPress('a')}>
            A
          </button>
          <button className="action b" onClick={() => onVirtualPress('b')}>
            B
          </button>
        </div>
      </div>

      <div className="gbc-system-buttons">
        <button className="sys" onClick={() => onVirtualPress('select')}>
          SELECT
        </button>
        <button className="sys" onClick={() => onVirtualPress('start')}>
          START
        </button>
      </div>
    </div>
  );
}

export default App;
