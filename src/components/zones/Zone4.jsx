import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faCheck, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import InstructionCard from '../InstructionCard';
import BoardWidget from '../BoardWidget';
import ValidationWidget from '../ValidationWidget';
import TestWidget from '../TestWidget';

import { RULE_ICONS } from '../../data/rules';
import pokemondata from '../../data/pokemondata.json';
import testPokemon from '../../data/testPokemon';
import trainPokemon from '../../data/trainPokemon.json';

// Import Package Images (1-9)
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';
import img7 from '../../assets/7.png';
import img8 from '../../assets/8.png';
import img9 from '../../assets/9.png';

const FEATURES = [
  { id: 'Attack', label: 'Attack' },
  { id: 'Defense', label: 'Defense' },
  { id: 'Speed', label: 'Speed' },
  { id: 'HasWings', label: 'Wings' },
  { id: 'HabitatTemperature', label: 'Temp' },
  { id: 'HabitatAltitude', label: 'Altitude' }
];

// --- Data Slicing Logic ---
const AVAILABLE_DATASETS = [
  { id: '1', type: 'fire', label: 'Fire (Professor)', img: img1, data: trainPokemon.slice(0, 20) },
  { id: '5', type: 'fire', label: 'Fire (Meowth)', img: img5, data: trainPokemon.slice(20, 40) },
  
  { id: '2', type: 'water', label: 'Water (Professor)', img: img2, data: trainPokemon.slice(40, 60) },
  { id: '6', type: 'water', label: 'Water (Rare!)', img: img6, data: trainPokemon.slice(60, 80) },
  
  { id: '3', type: 'grass', label: 'Grass (Professor)', img: img3, data: trainPokemon.slice(80, 100) },
  { id: '7', type: 'grass', label: 'Grass (Meowth)', img: img7, data: trainPokemon.slice(100, 120) },
  
  { id: '4', type: 'dragon', label: 'Dragon (Professor)', img: img4, data: trainPokemon.slice(120, 140) },
  { id: '8', type: 'dragon', label: 'Dragon (Rare!)', img: img8, data: trainPokemon.slice(140, 160) },
  
  { 
    id: '9', 
    type: 'mixed', 
    label: 'Big Mix (Professor)', 
    img: img9, 
    data: [
        ...trainPokemon.slice(0, 10),   // 10 Fire
        ...trainPokemon.slice(40, 50),  // 10 Water
        ...trainPokemon.slice(80, 90),  // 10 Grass
        ...trainPokemon.slice(120, 130) // 10 Dragon
    ],
    span: 12 
  },
];

const Zone4 = ({ onNextZone, onScoreUpdate }) => {
  const [selectedDatasets, setSelectedDatasets] = useState([]); 
  const [trainedWeights, setTrainedWeights] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ accuracy: 0 });
  
  const [testStep, setTestStep] = useState(0);
  const [currentTestResult, setCurrentTestResult] = useState(null);
  const [usedPokemonNames, setUsedPokemonNames] = useState([]);

  const isStep2Unlocked = selectedDatasets.length > 0;
  const isStep3Unlocked = showResults;

  // --- LOGIC: SELECTION ---
  const handleToggleDataset = (id) => {
    setSelectedDatasets(prev => {
      if (prev.includes(id)) return prev.filter(d => d !== id);
      if (prev.length >= 4) {
        alert("You can only select 4 packages max.");
        return prev;
      }
      return [...prev, id];
    });
    
    // Reset state on change
    setShowResults(false);
    // setTrainedWeights({}); // Removed - handled by useEffect
    setTestStep(0);
    setCurrentTestResult(null);
    setUsedPokemonNames([]);
  };

  // --- LOGIC: TRAINING ---
  const trainModel = () => {
    let trainingData = [];
    selectedDatasets.forEach(id => {
        const ds = AVAILABLE_DATASETS.find(d => d.id === id);
        if (ds) {
            trainingData = [...trainingData, ...ds.data];
        }
    });

    if (trainingData.length === 0) {
        setTrainedWeights({});
        return null;
    }

    const weights = {};
    const types = ['fire', 'water', 'grass', 'dragon'];
    
    const sums = {};
    const counts = {};
    types.forEach(t => { 
        sums[t] = {}; 
        counts[t] = 0; 
        FEATURES.forEach(f => sums[t][f.id] = 0); 
    });

    trainingData.forEach(p => {
        const t = p.CorrectType;
        if (sums[t]) {
            counts[t]++;
            FEATURES.forEach(f => sums[t][f.id] += p[f.id]);
        }
    });

    types.forEach(t => {
        weights[t] = {};
        FEATURES.forEach(f => {
            if (counts[t] === 0) {
                weights[t][f.id] = 0;
                return;
            }
            
            let avg = sums[t][f.id] / counts[t];
            
            if (f.id === 'HasWings') {
                avg = avg * 10;
            }

            // Map 0-10 -> -3 to +3
            let weight = Math.round((avg - 5) / 1.66);
            weight = Math.max(-3, Math.min(3, weight));
            
            weights[t][f.id] = weight;
        });
    });

    setTrainedWeights(weights);
    return weights;
  };

  useEffect(() => {
    trainModel();
  }, [selectedDatasets]);

  const handleRunValidation = () => {
      const weights = trainModel();
      if (!weights) {
          alert("Please select at least one package.");
          return;
      }

      let correct = 0;
      const typeStats = { fire: 0, water: 0, grass: 0, dragon: 0 };
      const totals = { fire: 0, water: 0, grass: 0, dragon: 0 };

      pokemondata.forEach(p => {
          totals[p.CorrectType]++;
          
          let bestType = '';
          let maxScore = -Infinity;

          ['fire', 'water', 'grass', 'dragon'].forEach(t => {
              let score = 0;
              FEATURES.forEach(f => {
                 let val = p[f.id];
                 if (f.id === 'HasWings') val = val === 1 ? 10 : 0;
                 score += (val - 5) * weights[t][f.id];
              });

              if (score > maxScore) {
                  maxScore = score;
                  bestType = t;
              }
          });

          if (bestType === p.CorrectType) {
              correct++;
              typeStats[p.CorrectType]++;
          }
      });

      setResults({
          fire: { count: typeStats.fire, total: totals.fire },
          water: { count: typeStats.water, total: totals.water },
          grass: { count: typeStats.grass, total: totals.grass },
          dragon: { count: typeStats.dragon, total: totals.dragon },
          accuracy: ((correct / pokemondata.length) * 100).toFixed(1)
      });
      setShowResults(true);
  };

  const handleTest = () => {
    // Filter out already used pokemon to prevent repeats
    const available = testPokemon.filter(p => !usedPokemonNames.includes(p.name));
    const pool = available.length > 0 ? available : testPokemon;
    const p = pool[Math.floor(Math.random() * pool.length)];

    setUsedPokemonNames(prev => [...prev, p.name]);
    
    let bestType = '';
    let maxScore = -Infinity;
    const scores = [];

    // 1. Calculate Raw Scores
    ['fire', 'water', 'grass', 'dragon'].forEach(t => {
        let rawScore = 0;
        FEATURES.forEach(f => {
            let val = p[f.id];
            if (f.id === 'HasWings') val = val === 1 ? 10 : 0;
            // Use current state weights
            rawScore += (val - 5) * (trainedWeights[t] ? trainedWeights[t][f.id] : 0);
        });
        
        scores.push({
            type: t,
            raw: rawScore,
            name: t.toUpperCase(),
            icon: RULE_ICONS.DEFAULT,
            stat: '', 
            pass: false
        });
    });

    // 2. Softmax Normalization
    const expScores = scores.map(s => Math.exp(s.raw / 10)); 
    const sumExp = expScores.reduce((a, b) => a + b, 0);

    scores.forEach((s, i) => {
        const percent = (expScores[i] / sumExp) * 100;
        s.percent = percent;
        s.stat = `${percent.toFixed(1)}%`;
        
        if (s.raw > maxScore) {
            maxScore = s.raw;
            bestType = s.type;
        }
    });

    scores.sort((a,b) => b.percent - a.percent);
    scores[0].pass = true; // Winner

    const isCorrect = bestType === p.CorrectType;
    if (isCorrect && onScoreUpdate) onScoreUpdate(true, { ...p, image: p.img });

    setCurrentTestResult({
        ...p, // <--- CRITICAL FIX: Spreads stats (Attack, Speed...) so card flip works
        name: p.name,
        type: p.CorrectType.toUpperCase(),
        image: p.img,
        rules: scores,
        prediction: bestType.toUpperCase(),
        isMatch: bestType === p.CorrectType
    });

    setTestStep(prev => Math.min(prev + 1, 2));
  };

  const getVisualizationRules = () => {
      const visRules = {};
      ['fire', 'water', 'grass', 'dragon'].forEach(t => {
          visRules[t] = [];
          if (!trainedWeights[t]) return;

          FEATURES.forEach(f => {
             const w = trainedWeights[t][f.id];
             // Map Feature ID to simple ID
             const simpleId = f.id === 'HasWings' ? 'wings' : 
                              f.id === 'HabitatTemperature' ? 'temp' : 
                              f.id === 'HabitatAltitude' ? 'altitude' : f.id.toLowerCase();
                              
             visRules[t].push({ 
                 id: simpleId, 
                 weight: w     
             });
          });
      });
      return visRules;
  };

  return (
    <>
      <InstructionCard 
        title={<span><FontAwesomeIcon icon={faMountain} className="me-2" />Zone 4: Sunrise Desert</span>}
        subtitle="Training the DataBot"
        instruction="You've gathered the data packages—now feed them to DataBot! You can only choose up to 4 packages to train. Choose carefully, as some data can confuse the DataBot."
      />
      
      <div className="mb-4 border rounded" style={{ backgroundColor: '#fff' }}>
        <div className="p-3 border-bottom bg-light rounded-top">
          <h5 className="m-0">Step 1: Select Training Data</h5>
        </div>
        <div className="p-3">
            <Row className="g-3 mb-4">
                {AVAILABLE_DATASETS.map(ds => (
                    <Col xs={6} md={ds.id === '9' ? 12 : 3} key={ds.id}>
                        <Card 
                            className={`h-100 shadow-sm ${selectedDatasets.includes(ds.id) ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => handleToggleDataset(ds.id)}
                        >
                            <Card.Body className="p-2 text-center d-flex flex-column align-items-center">
                                <div className="mb-2 position-relative">
                                    <img src={ds.img} alt={ds.label} className="img-fluid rounded" style={{ height: '80px', objectFit: 'contain' }} />
                                    {selectedDatasets.includes(ds.id) && (
                                        <div className="position-absolute top-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>
                                            <FontAwesomeIcon icon={faCheck} size="xs" />
                                        </div>
                                    )}
                                </div>
                                <div className="small fw-bold">{ds.label}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{ds.data.length} Samples</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="text-center mb-3">
                <div className="text-muted small mb-2">
                    Visualizing Learned Weights (Green = High/Yes, Red = Low/No)
                </div>
            </div>

            <Row className="justify-content-center">
                <Col md={10}>
                    <BoardWidget 
                        activeType={null} 
                        allRules={getVisualizationRules()} 
                        showAll={true}
                        style={{ height: '100%' }}
                    />
                </Col>
            </Row>
        </div>
      </div>

      <Card className={`mb-4 ${!isStep2Unlocked ? 'opacity-50' : ''}`}>
         <Card.Header as="h5">Step 2: Validating the DataBot</Card.Header>
         <Card.Body>
            {!isStep2Unlocked ? (
            <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
              <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
              <p className="mb-0">Select datasets above to unlock training!</p>
            </div>
           ) : (
            <ValidationWidget 
              title="Train DataBot Model"
              instruction="Click to process the selected data and see how accurate the AI becomes!"
              buttonLabel="Train & Validate"
              onRun={handleRunValidation}
              showResults={showResults}
              results={results}
            />
           )}
         </Card.Body>
      </Card>

      <Card className={`mb-4 ${!isStep3Unlocked ? 'opacity-50' : ''}`}>
        <Card.Header as="h5">Step 3: The Mystery Pokemon Challenge</Card.Header>
         <Card.Body>
          {!isStep3Unlocked ? (
            <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
              <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
              <p className="mb-0">Train the model first to unlock field testing!</p>
            </div>
          ) : (
          <TestWidget 
              progress={`${testStep}/2`}
              // CRITICAL FIX: Pass full object for card flip stats
              pokemon={currentTestResult} 
              
              botName="DataBot"
              rules={currentTestResult ? currentTestResult.rules : []}
              prediction={currentTestResult ? currentTestResult.prediction : ""}
              result={currentTestResult ? { 
                isMatch: currentTestResult.isMatch, 
                actualType: currentTestResult.type 
              } : { isMatch: false, actualType: "" }}
              onNext={handleTest}
            />
          )}
         </Card.Body>
      </Card>

      {testStep >= 2 && (
        <div className="text-center py-4 mb-5">
          <Button 
            variant="success" 
            size="lg" 
            className="px-5 py-3 rounded-pill fw-bold shadow pulse-animation"
            onClick={onNextZone}
          >
             Complete the mission <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Button>
        </div>
      )}
    </>
  );
}; // End of Component

export default Zone4;