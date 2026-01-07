import attackIcon from '../assets/attack.png';
import defenseIcon from '../assets/defense.png';
import speedIcon from '../assets/speed.png';
import wingIcon from '../assets/wing.png';
import tempIcon from '../assets/temperature.png';
import altitudeIcon from '../assets/altitude.png';

export const RULE_ICONS = {
  ATTACK: attackIcon,
  DEFENSE: defenseIcon,
  SPEED: speedIcon,
  WING: wingIcon,
  TEMP: tempIcon,
  ALTITUDE: altitudeIcon,
};

export const RULES = [
  { id: 'high-attack', label: 'High Attack', icon: RULE_ICONS.ATTACK },
  { id: 'low-attack', label: 'Low Attack', icon: RULE_ICONS.ATTACK },
  { id: 'high-defense', label: 'High Defense', icon: RULE_ICONS.DEFENSE },
  { id: 'low-defense', label: 'Low Defense', icon: RULE_ICONS.DEFENSE },
  { id: 'high-speed', label: 'High Speed', icon: RULE_ICONS.SPEED },
  { id: 'low-speed', label: 'Low Speed', icon: RULE_ICONS.SPEED },
  { id: 'has-wings', label: 'Has Wings', icon: RULE_ICONS.WING },
  { id: 'no-wings', label: 'No Wings', icon: RULE_ICONS.WING },
  { id: 'high-temp', label: 'High Temp', icon: RULE_ICONS.TEMP },
  { id: 'low-temp', label: 'Low Temp', icon: RULE_ICONS.TEMP },
  { id: 'high-altitude', label: 'High Altitude', icon: RULE_ICONS.ALTITUDE },
  { id: 'low-altitude', label: 'Low Altitude', icon: RULE_ICONS.ALTITUDE },
];
