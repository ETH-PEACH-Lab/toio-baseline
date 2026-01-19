import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Zone1 from './components/zones/Zone1'
import Zone2 from './components/zones/Zone2'
import Zone3 from './components/zones/Zone3'
import Zone4 from './components/zones/Zone4'
import EndingPage from './components/EndingPage'
import './App.css'

const ZONES = [
  'Zone 1: Clearview Meadow', 
  'Zone 2: Azure Coast', 
  'Zone 3: Whispering Woods', 
  'Zone 4: Sunrise Desert'
];

function App() {
  const [activeZone, setActiveZone] = useState(ZONES[0])
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);

  const handleZoneComplete = (nextIndex) => {
    if (nextIndex >= ZONES.length) {
        setActiveZone('Ending');
    } else {
        setUnlockedIndex(prev => Math.max(prev, nextIndex));
        setActiveZone(ZONES[nextIndex]);
    }
  };

  const handleRestart = () => {
      setActiveZone(ZONES[0]);
      setUnlockedIndex(0);
      setGlobalScore(0);
  };

  const handleScoreUpdate = (correct) => {
      if (correct) setGlobalScore(prev => prev + 1);
  };

  const renderZone = () => {
    switch (activeZone) {
      case ZONES[0]:
        return <Zone1 onNextZone={() => handleZoneComplete(1)} onScoreUpdate={handleScoreUpdate} />
      case ZONES[1]:
        return <Zone2 onNextZone={() => handleZoneComplete(2)} onScoreUpdate={handleScoreUpdate} />
      case ZONES[2]:
        return <Zone3 onNextZone={() => handleZoneComplete(3)} onScoreUpdate={handleScoreUpdate} />
      case ZONES[3]:
        return <Zone4 onNextZone={() => handleZoneComplete(4)} onScoreUpdate={handleScoreUpdate} />
      case 'Ending':
        return <EndingPage score={globalScore} onRestart={handleRestart} />
      default:
        // Fallback or handle partial matches if needed (e.g. just "Zone 1")
        return <Zone1 onNextZone={() => handleZoneComplete(1)} onScoreUpdate={handleScoreUpdate} />
    }
  }

  return (
    <>
      <Header 
        activeZone={activeZone} 
        onZoneChange={setActiveZone} 
        zones={ZONES}
        unlockedIndex={unlockedIndex}
        score={globalScore}
      />
      <Container className="mt-4">
        {renderZone()}
      </Container>
    </>
  )
}

export default App
