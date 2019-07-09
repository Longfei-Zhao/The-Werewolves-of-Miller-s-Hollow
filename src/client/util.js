export const GAMESTATUS = {
    PREPARING: 'preparing',
    START: 'start',
    WEREWOLF_MOVE: 'werewolfMove',
    WEREWOLF_MOVED: 'werewolfMoved',
    SEER_MOVE: 'seerMove',
    SEER_MOVED: 'seerMoved',
    WITCH_MOVE: 'witchMove',
    WITCH_MOVED: 'witchMoved',
    FINISH: 'finish'
}

export const ROLE = {
    WEREWOLF: 'werewolf',
    VILLAGER: 'villager',
    SEER: 'seer',
    WITCH: 'witch',
    HUNTER: 'hunter',
    IDIOT: 'idiot'
}

export const PLAYERSTATUS = {
    ALIVE: 'alive',
    DEAD: 'dead'
}

export const OPERATION_TYPE = {
    SIT: 'sit',
    KILL: 'kill',
    SEE: 'see',
    WITCH: 'witch',
    SAVE: 'save',
    POISON: 'poison'
}

import WEREWOLF from './image/roles/werewolf.jpg';
import SEER from './image/roles/seer.jpg';
import WITCH from './image/roles/witch.jpg';
import HUNTER from './image/roles/hunter.jpg';
import IDIOT from './image/roles/idiot.jpg';
import VILLAGER from './image/roles/villager.jpg';
export const ROLE_IMAGE = {
    WEREWOLF,
    SEER,
    WITCH,
    HUNTER,
    IDIOT,
    VILLAGER
};