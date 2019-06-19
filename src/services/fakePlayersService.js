import * as teamsAPI from "./fakeTeamService";

const players = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    name: "Gonzalo Amado",
    team: { id: "5b21ca3eeb7f6fbccd471818", name: "Newells" },
    height: 1.77,
    position: "Centre Back",
    birthDate: "1988-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd471816",
    name: "Eduardo Amado",
    team: { id: "5b21ca3eeb7f6fbccd471818", name: "Newells" },
    height: 1.95,
    position: "Centre Midfielder",
    birthDate: "1949-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd471817",
    name: "Leo Villa",
    team: { id: "5b21ca3eeb7f6fbccd471814", name: "River Plate" },
    height: 1.77,
    position: "Playmaker",
    birthDate: "1985-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd471819",
    name: "Mario Barcia",
    team: { id: "5b21ca3eeb7f6fbccd471820", name: "Boca Juniors" },
    height: 1.78,
    position: "Defensive Midfielder",
    birthDate: "1989-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd471816",
    name: "Eduardo Amado",
    team: { id: "5b21ca3eeb7f6fbccd471818", name: "Newells" },
    height: 1.95,
    position: "Centre Midfielder",
    birthDate: "1949-01-03T19:04:28.809Z"
  },
  {
    id: "5b21ca3eeb7f6fbccd471817",
    name: "Leo Villa",
    team: { id: "5b21ca3eeb7f6fbccd471814", name: "River Plate" },
    height: 1.77,
    position: "Playmaker",
    birthDate: "1985-01-03T19:04:28.809Z"
  }
];

export function getPlayers() {
  return players;
}

export function getPlayer(id) {
  return players.find(p => p.id === id);
}

export function savePlayer(player) {
  let playerInDb = players.find(p => p.id === player.id) || {};
  playerInDb.name = player.name;
  playerInDb.team = teamsAPI.teams.find(t => t.id === player.teamId);
  playerInDb.height = player.height;
  playerInDb.position = player.position;
  playerInDb.birthDate = player.birthDate;

  if (!playerInDb.id) {
    playerInDb.id = Date.now();
    players.push(playerInDb);
  }

  return playerInDb;
}

export function deletePlayer(id) {
  let playerInDb = players.find(m => m.id === id);
  players.splice(players.indexOf(playerInDb), 1);
  return playerInDb;
}
