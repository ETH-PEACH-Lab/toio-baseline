import { RULE_ICONS } from './rules';
import { TYPE_ICONS } from './type';

export const FEATURES = [
  { id: 'attack', icon: RULE_ICONS.ATTACK, label: 'Attack' },
  { id: 'defense', icon: RULE_ICONS.DEFENSE, label: 'Defense' },
  { id: 'speed', icon: RULE_ICONS.SPEED, label: 'Speed' },
  { id: 'wings', icon: RULE_ICONS.WING, label: 'Wings' },
  { id: 'temp', icon: RULE_ICONS.TEMP, label: 'Temp' },
  { id: 'altitude', icon: RULE_ICONS.ALTITUDE, label: 'Altitude' },
];

export const TYPES = [
  { id: 'fire', icon: TYPE_ICONS.FIRE, color: '#ff6b6b' },
  { id: 'water', icon: TYPE_ICONS.WATER, color: '#4ecdc4' },
  { id: 'grass', icon: TYPE_ICONS.GRASS, color: '#6ab04c' },
  { id: 'dragon', icon: TYPE_ICONS.DRAGON, color: '#686de0' },
];
