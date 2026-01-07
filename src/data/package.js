import packagePlaceholder from '../assets/package_placeholder.png';

export const PACKAGE_DATA = {
    FIRE: [
        { id: 'fire_a', label: 'Package A', image: packagePlaceholder, isPure: false }, // Noisy
        { id: 'fire_b', label: 'Package B', image: packagePlaceholder, isPure: true, isCorrect: true }  // Pure
    ],
    WATER: [
        { id: 'water_a', label: 'Package A', image: packagePlaceholder, isPure: true, isCorrect: true }, // Pure
        { id: 'water_b', label: 'Package B', image: packagePlaceholder, isPure: false }  // Noisy
    ],
    GRASS: [
        { id: 'grass_a', label: 'Package A', image: packagePlaceholder, isPure: false }, // Noisy
        { id: 'grass_b', label: 'Package B', image: packagePlaceholder, isPure: true, isCorrect: true }  // Pure
    ],
    DRAGON: [
        { id: 'dragon_a', label: 'Package A', image: packagePlaceholder, isPure: true, isCorrect: true }, // Pure
        { id: 'dragon_b', label: 'Package B', image: packagePlaceholder, isPure: false }  // Noisy
    ]
};
