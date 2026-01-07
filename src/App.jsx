import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Zone1 from './components/zones/Zone1'
import Zone2 from './components/zones/Zone2'
import Zone3 from './components/zones/Zone3'
import Zone4 from './components/zones/Zone4'
import './App.css'

function App() {
  const [activeZone, setActiveZone] = useState('Zone 1: Clearview Meadow')

  const renderZone = () => {
    switch (activeZone) {
      case 'Zone 1: Clearview Meadow':
        return <Zone1 onNextZone={() => setActiveZone('Zone 2: Azure Coast')} />
      case 'Zone 2: Azure Coast':
        return <Zone2 onNextZone={() => setActiveZone('Zone 3: Whispering Woods')} />
      case 'Zone 3: Whispering Woods':
        return <Zone3 onNextZone={() => setActiveZone('Zone 4: Sunrise Desert')} />
      case 'Zone 4: Sunrise Desert':
        return <Zone4 />
      default:
        // Fallback or handle partial matches if needed (e.g. just "Zone 1")
        return <Zone1 onNextZone={() => setActiveZone('Zone 2: Azure Coast')} />
    }
  }

  return (
    <>
      <Header activeZone={activeZone} onZoneChange={setActiveZone} />
      <Container className="mt-4">
        {renderZone()}
      </Container>
    </>
  )
}

export default App
