// Import images from src/assets
// Ensure these files exist in your src/assets folder
import PonytaImg from '../assets/Ponyta.png';
import NinetalesImg from '../assets/Ninetales.png';
import CharizardImg from '../assets/Charizard.png';
import GrowlitheImg from '../assets/Growlithe.png';

import SlowpokeImg from '../assets/Slowpoke.png';
import WailmerImg from '../assets/Wailmer.png';
import GyaradosImg from '../assets/Gyarados.png';
import PsyduckImg from '../assets/Psyduck.png';

import PetililImg from '../assets/Petilil.png';
import DeerlingImg from '../assets/Deerling.png';
import BayleefImg from '../assets/Bayleef.png';
import LeafeonImg from '../assets/Leafeon.png';

import RayquazaImg from '../assets/Rayquaza.png';
import DragoniteImg from '../assets/Dragonite.png';
import DialgaImg from '../assets/Dialga.png';

const testPokemon = [
    // Fire
    { 
        name: "Ponyta", 
        CorrectType: "fire", 
        HasWings: 0, 
        Speed: 8, 
        Attack: 7, 
        Defense: 2, 
        HabitatAltitude: 2, 
        HabitatTemperature: 8, 
        img: PonytaImg 
    },
    { 
        name: "Ninetales", 
        CorrectType: "fire", 
        HasWings: 0, 
        Speed: 7, 
        Attack: 9, 
        Defense: 6, 
        HabitatAltitude: 3, 
        HabitatTemperature: 9, 
        img: NinetalesImg 
    },
    { 
        name: "Charizard", 
        CorrectType: "fire", 
        HasWings: 1, 
        Speed: 4, 
        Attack: 8, 
        Defense: 5, 
        HabitatAltitude: 8, 
        HabitatTemperature: 9, 
        img: CharizardImg 
    },
    { 
        name: "Growlithe", 
        CorrectType: "fire", 
        HasWings: 0, 
        Speed: 3, 
        Attack: 7, 
        Defense: 1, 
        HabitatAltitude: 1, 
        HabitatTemperature: 6, 
        img: GrowlitheImg 
    },
    
    // Water
    { 
        name: "Slowpoke", 
        CorrectType: "water", 
        HasWings: 0, 
        Speed: 1, 
        Attack: 2, 
        Defense: 7, 
        HabitatAltitude: 1, 
        HabitatTemperature: 3, 
        img: SlowpokeImg 
    },
    { 
        name: "Wailmer", 
        CorrectType: "water", 
        HasWings: 0, 
        Speed: 2, 
        Attack: 3, 
        Defense: 9, 
        HabitatAltitude: 0, 
        HabitatTemperature: 0, 
        img: WailmerImg 
    },
    { 
        name: "Gyarados", 
        CorrectType: "water", 
        HasWings: 1, 
        Speed: 3, 
        Attack: 9, 
        Defense: 7, 
        HabitatAltitude: 0, 
        HabitatTemperature: 0, 
        img: GyaradosImg 
    },
    { 
        name: "Psyduck", 
        CorrectType: "water", 
        HasWings: 0, 
        Speed: 3, 
        Attack: 1, 
        Defense: 6, 
        HabitatAltitude: 0, 
        HabitatTemperature: 1, 
        img: PsyduckImg 
    },

    // Grass
    { 
        name: "Petilil", 
        CorrectType: "grass", 
        HasWings: 0, 
        Speed: 3, 
        Attack: 2, 
        Defense: 6, 
        HabitatAltitude: 4, 
        HabitatTemperature: 3, 
        img: PetililImg 
    },
    { 
        name: "Deerling", 
        CorrectType: "grass", 
        HasWings: 0, 
        Speed: 6, 
        Attack: 3, 
        Defense: 5, 
        HabitatAltitude: 6, 
        HabitatTemperature: 3, 
        img: DeerlingImg 
    },
    { 
        name: "Bayleef", 
        CorrectType: "grass", 
        HasWings: 0, 
        Speed: 2, 
        Attack: 4, 
        Defense: 9, 
        HabitatAltitude: 7, 
        HabitatTemperature: 2, 
        img: BayleefImg 
    },
    { 
        name: "Leafeon", 
        CorrectType: "grass", 
        HasWings: 0, 
        Speed: 6, 
        Attack: 5, 
        Defense: 6, 
        HabitatAltitude: 6, 
        HabitatTemperature: 4, 
        img: LeafeonImg 
    },

    // Dragon
    { 
        name: "Rayquaza", 
        CorrectType: "dragon", 
        HasWings: 1, 
        Speed: 7, 
        Attack: 9, 
        Defense: 4, 
        HabitatAltitude: 9, 
        HabitatTemperature: 2, 
        img: RayquazaImg 
    },
    { 
        name: "Dragonite", 
        CorrectType: "dragon", 
        HasWings: 1, 
        Speed: 7, 
        Attack: 9, 
        Defense: 7, 
        HabitatAltitude: 9, 
        HabitatTemperature: 1, 
        img: DragoniteImg 
    },
    { 
        name: "Dialga", 
        CorrectType: "dragon", 
        HasWings: 0, 
        Speed: 6, 
        Attack: 9, 
        Defense: 9, 
        HabitatAltitude: 8, 
        HabitatTemperature: 3, 
        img: DialgaImg 
    }
];

export default testPokemon;