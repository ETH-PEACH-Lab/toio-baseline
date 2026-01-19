import { useState } from 'react';
import { Row, Col, Pagination, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faChevronLeft, faChevronRight, faLock, faArrowRight, faEye, faList, faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import RuleWidget from '../RuleWidget';
import InstructionCard from '../InstructionCard';
import RulePlate from '../RulePlate';
import BoardWidget from '../BoardWidget';
import HintCard from '../HintCard';
import ValidationWidget from '../ValidationWidget';
import TestWidget from '../TestWidget';

import { RULE_ICONS } from '../../data/rules';
import pokemondata from '../../data/pokemondata.json'; 
import testPokemon from '../../data/testPokemon'; 

const Zone2 = ({ onNextZone }) => {
  const [activePage, setActivePage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [currentTestResult, setCurrentTestResult] = useState(null);
  
  // Show All switch state
  const [showAllBoard, setShowAllBoard] = useState(false);

  const [results, setResults] = useState({
    fire: { count: 0, total: 0 },
    water: { count: 0, total: 0 },
    grass: { count: 0, total: 0 },
    dragon: { count: 0, total: 0 },
    accuracy: 0
  });

  const rulesTypes = ['fire', 'water', 'grass', 'dragon'];
  const currentType = rulesTypes[activePage - 1];
  const totalPages = rulesTypes.length;

  const [zoneRules, setZoneRules] = useState({
    fire: [null, null, null, null],
    water: [null, null, null, null],
    grass: [null, null, null, null],
    dragon: [null, null, null, null],
  });

  const zone2Hints = [
   "Hint 1: Look at all 4 pages! Since the Dragon page is broken, use your imagination for dragons. If a clue isn’t clearly high or low for that type, it might not be needed in that plan.",
   "Hint 2: Because order matters now, put the most important clue first — it’s usually the one that makes this Pokémon type special!",
   "Hint 3: If two types share the same clue, make a trade-off. You can put that clue last in both plans, or keep it in one and remove it from the other. Try both ways and see what works best!"
  ];

  const isStep2Unlocked = Object.values(zoneRules).some(rules => rules.some(r => r !== null));
  const isStep3Unlocked = showResults;

  // --- LOGIC HELPERS ---

  const normalizeRule = (rule) => {
    if (!rule) return null;
    const rawId = rule.id.toLowerCase();
    let key = '';
    let name = '';
    let requiredState = 'high';

    if (rawId.includes('attack')) { key = 'Attack'; name = 'Attack'; }
    else if (rawId.includes('defense')) { key = 'Defense'; name = 'Defense'; }
    else if (rawId.includes('speed')) { key = 'Speed'; name = 'Speed'; }
    else if (rawId.includes('wings')) { key = 'HasWings'; name = 'Wings'; }
    else if (rawId.includes('temp')) { key = 'HabitatTemperature'; name = 'Temp'; }
    else if (rawId.includes('altitude')) { key = 'HabitatAltitude'; name = 'Altitude'; }

    if (rawId.startsWith('low') || rawId.startsWith('no')) requiredState = 'low';

    return { ...rule, key, name, requiredState };
  };

  const calculateScore = (pokemon, rules) => {
    let score = 0;
    rules.forEach((rule, index) => {
        if (!rule) return;
        const normalized = normalizeRule(rule);
        const val = pokemon[normalized.key];
        const isHigh = normalized.key === 'HasWings' ? val === 1 : val > 5;
        const matches = normalized.requiredState === 'high' ? isHigh : !isHigh;
        
        if (matches) {
            // Weighted Scoring: 1st=3pts, 2nd=2pts, 3rd=2pts, 4th=1pt
            const points = (index === 0) ? 3 : (index < 3 ? 2 : 1);
            score += points;
        }
    });
    return score;
  };

  const predictType = (pokemon) => {
    let maxScore = -1;
    let bestTypes = [];

    rulesTypes.forEach(type => {
      const score = calculateScore(pokemon, zoneRules[type]);

      if (score > maxScore) {
        maxScore = score;
        bestTypes = [type];           // reset list
      } else if (score === maxScore) {
        bestTypes.push(type);         // tie
      }
    });

    
    const chosenType =
      bestTypes[Math.floor(Math.random() * bestTypes.length)];

    return { type: chosenType, score: maxScore };
  };

  // --- HANDLERS ---

  const handleDropRule = (type, idx, rule) => {
    if (rule && zoneRules[type].some((r, i) => i !== idx && r && r.id === rule.id)) {
        alert(`You already used this rule for ${type}!`);
        return;
    }
    setZoneRules(prev => ({
      ...prev,
      [type]: prev[type].map((r, i) => (i === idx ? rule : r))
    }));

    setShowResults(false);
    setTestStep(0);
    setCurrentTestResult(null);
  };

  const handleRuleClick = (rule) => {
    const idx = zoneRules[currentType].findIndex(r => r === null);
    if (idx !== -1) {
        handleDropRule(currentType, idx, rule);
    } 
  };

  const handleReset = (type) => {
    setZoneRules(prev => ({
      ...prev,
      [type]: [null, null, null, null]
    }));
    setShowResults(false);
    setTestStep(0);
    setCurrentTestResult(null);
  };

  const handleRunValidation = () => {
    let correctCount = 0;
    const typeStats = {
        fire: { count: 0, total: 0 },
        water: { count: 0, total: 0 },
        grass: { count: 0, total: 0 },
        dragon: { count: 0, total: 0 }
    };

    pokemondata.forEach(p => {
        const actual = p.CorrectType;
        if (typeStats[actual]) typeStats[actual].total++;
        const prediction = predictType(p).type;
        if (prediction === actual) {
            correctCount++;
            if (typeStats[actual]) typeStats[actual].count++;
        }
    });

    setResults({
      fire: typeStats.fire,
      water: typeStats.water,
      grass: typeStats.grass,
      dragon: typeStats.dragon,
      accuracy: ((correctCount / pokemondata.length) * 100).toFixed(1)
    });
    setShowResults(true);
  };

  const handleTest = () => {
    const p = testPokemon[Math.floor(Math.random() * testPokemon.length)];
    const predictionObj = predictType(p);
    
    const breakdown = rulesTypes
      .map(type => {
        const score = calculateScore(p, zoneRules[type]);
        return {
          name: type.toUpperCase(),
          icon: RULE_ICONS.DEFAULT,
          score,                 
          stat: `${score} pts`,
          pass: type === predictionObj.type
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;   // higher score first
        }
        return Math.random() - 0.5;   // random order if same score
      });



    setCurrentTestResult({
        ...p, // <--- CRITICAL FIX: Include full stats for card flip
        name: p.name,
        type: p.CorrectType.toUpperCase(),
        image: p.img,
        rules: breakdown,
        prediction: predictionObj.type.toUpperCase(),
        isMatch: predictionObj.type === p.CorrectType
    });

    setTestStep(prev => Math.min(prev + 1, 2));
  };

  return (
    <>
      <InstructionCard 
        title={<span><FontAwesomeIcon icon={faWater} className="me-2" />Zone 2: Azure Coast</span>}
        subtitle="Multi-Class & Feature Importance"
        instruction="The Coast is home to many types! We need a Master Plan. Decide which clues are most important for all four types. Remember: the first slot has the most 'weight' in RuleBot's mind!"
      />
      <div className="mb-4 border rounded" style={{ backgroundColor: '#fff' }}>
        <div className="p-3 border-bottom bg-light rounded-top">
          <h5 className="m-0">Step 1: Designing the RuleBot</h5>
        </div>
        <div className="p-3">
            <HintCard hints={zone2Hints} />
            <Row className="mb-3 align-items-stretch">
              <Col md={12} lg={5} className="mb-4 mb-lg-0 d-flex justify-content-center">
                <div className="w-100 h-100" style={{ maxWidth: '400px' }}>
                  <RuleWidget 
                    type={currentType} 
                    slots={zoneRules[currentType]}
                    onDropRule={(idx, rule) => handleDropRule(currentType, idx, rule)}
                    onReset={() => handleReset(currentType)}
                    showPoints={true}
                  />
                </div>
              </Col>
              
              <Col md={12} lg={7} className="position-relative mt-4 mt-lg-0">
                <div style={{ position: 'absolute', top: '-40px', right: '15px', zIndex: 10 }}>
                  <Button
                    variant={showAllBoard ? "primary" : "outline-primary"}
                    size="sm"
                    className="shadow-sm fw-bold"
                    onClick={() => setShowAllBoard(prev => !prev)}
                  >
                    <FontAwesomeIcon icon={showAllBoard ? faList : faEye} className="me-2" />
                    Show All
                  </Button>
                </div>

                <BoardWidget 
                  activeType={currentType}
                  allRules={zoneRules}
                  usePoints={true}
                  showAll={showAllBoard}
                  style={{ height: '100%' }}
                />
              </Col>
            </Row>

            <div className="mt-4 mb-3 p-3 bg-light rounded border border-2 border-primary d-flex flex-column align-items-center shadow-sm">
              <div className="mb-2 fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                  <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                  Configure Rules for ALL 4 Types
              </div>
              <Pagination className="mb-0">
                <Pagination.Prev 
                  disabled={activePage === 1}
                  onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Pagination.Prev>
                {rulesTypes.map((rule, idx) => {
                  const hasRules = zoneRules[rule].some(r => r !== null);
                  return (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === activePage}
                        onClick={() => setActivePage(idx + 1)}
                        style={{ minWidth: '100px', textAlign: 'center' }}
                    >
                        {rule.charAt(0).toUpperCase() + rule.slice(1)}
                        {hasRules && <FontAwesomeIcon icon={faCheck} className="ms-2 text-success" />}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next 
                  disabled={activePage === totalPages}
                  onClick={() => setActivePage(prev => Math.min(prev + 1, totalPages))}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Pagination.Next>
              </Pagination>
              <div className="text-muted small mt-2 fst-italic">
                 Use the arrows or click the tabs to switch between Pokemon types.
              </div>
            </div>
            
            <div className="d-flex justify-content-center">
              <RulePlate activeRules={zoneRules[currentType]} onRuleClick={handleRuleClick} />
            </div>
        </div>
      </div>

      <Card className={`mb-4 ${!isStep2Unlocked ? 'opacity-50' : ''}`}>
         <Card.Header as="h5">Step 2: Validating the RuleBot</Card.Header>
         <Card.Body>
            {!isStep2Unlocked ? (
            <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
              <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
              <p className="mb-0">Please add at least one rule in Step 1 to unlock validation!</p>
            </div>
           ) : (
            <ValidationWidget 
              title="Test Your Multi-Type Rules"
              instruction="See how well your rules classify all the Pokemon in the Azure Coast!"
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
              <p className="mb-0">Please complete the Validation Step to unlock this challenge!</p>
            </div>
          ) : (
          <TestWidget 
              progress={`${testStep}/2`}
              // CRITICAL FIX: Pass the full currentTestResult object
              pokemon={currentTestResult} 
              
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
             Proceed to Zone 3 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Zone2;