import { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

const Zone1 = ({ onNextZone }) => {
  const [droppedRules, setDroppedRules] = useState([null, null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [testStep, setTestStep] = useState(0);
  
  // --- NEW: Step 1 Lock State ---
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
  
  // New State for the Single Test Display
  const [currentTestResult, setCurrentTestResult] = useState(null);

  // Unlock Conditions
  const isStep1Unlocked = isGuidebookOpen;
  const isStep2Unlocked = droppedRules.some(r => r !== null);
  const isStep3Unlocked = showResults;

  const [results, setResults] = useState({
    fire: { count: 0, total: 0 },
    non_fire: { count: 0, total: 0 },
    accuracy: 0
  });

  const zone1Hints = [
    "Hint 1: Not sure where to start? Look at page 2 — it shows what makes a Pokémon a Fire type. You can test your plan and try again if it doesn’t work!",
    "Hint 2: Look at which Pokémon are not Fire types — if your plan catches them too, there might be a conflict! Try removing or changing one clue to fix it.",
    "Hint 3: You can pick 1 to 4 Clue Cards for your plan. Do you think using more cards always makes it better? Try and see!"
  ];

  // --- LOGIC HELPERS ---

  // Maps rule ID (e.g. 'high-attack') to Data Key (e.g. 'Attack')
  const normalizeRule = (rule) => {
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

  const checkRule = (pokemon, rule) => {
    const val = pokemon[rule.key];
    // For Wings: 1 = Yes (High), 0 = No (Low)
    // For Stats: > 5 = High, <= 5 = Low
    const isHigh = rule.key === 'HasWings' ? val === 1 : val > 5;
    
    if (rule.requiredState === 'high') return isHigh;
    return !isHigh; 
  };

  // --- HANDLERS ---

  // Callback for InstructionCard
  const handleGuidebookOpen = () => {
    setIsGuidebookOpen(true);
  };

  const handleDropRule = (idx, rule) => {
    // Basic duplication check
    if (droppedRules.some((r, i) => i !== idx && r && r.id === rule.id)) {
        alert("You already used this rule!");
        return;
    }
    const newRules = [...droppedRules];
    newRules[idx] = rule;
    setDroppedRules(newRules);
    
    // Reset progress if rules change
    setShowResults(false);
    setTestStep(0);
    setCurrentTestResult(null);
  };

  const handleReset = () => {
    setDroppedRules([null, null, null, null]);
    setShowResults(false);
    setTestStep(0);
    setCurrentTestResult(null);
  };

  const handleRunValidation = () => {
    // 1. Prepare Rules
    const activeRules = droppedRules.filter(r => r).map(normalizeRule);
    if (activeRules.length === 0) return;

    let fireCorrect = 0;
    let nonFireCorrect = 0;
    
    // 2. USE LARGE DATASET (pokemondata.json)
    const fireData = pokemondata.filter(p => p.CorrectType === 'fire');
    const nonFireData = pokemondata.filter(p => p.CorrectType !== 'fire');

    // Check Fire Types (Sensitivity)
    fireData.forEach(p => {
        const pass = activeRules.every(r => checkRule(p, r));
        if (pass) fireCorrect++;
    });

    // Check Non-Fire Types (Specificity)
    nonFireData.forEach(p => {
        const pass = activeRules.every(r => checkRule(p, r));
        if (!pass) nonFireCorrect++; // Correctly rejected
    });

    const totalAcc = ((fireCorrect + nonFireCorrect) / pokemondata.length) * 100;

    setResults({
      fire: { count: fireCorrect, total: fireData.length },
      non_fire: { count: nonFireCorrect, total: nonFireData.length },
      accuracy: totalAcc.toFixed(1)
    });
    
    setShowResults(true);
  };

  const handleTest = () => {
    // 1. Prepare Rules
    const activeRules = droppedRules.filter(r => r).map(normalizeRule);
    
    // 2. USE SMALL DATASET WITH IMAGES (testPokemon.json)
    const p = testPokemon[Math.floor(Math.random() * testPokemon.length)];

    // 3. Analyze
    const ruleResults = activeRules.map(r => {
        const passed = checkRule(p, r);
        const val = p[r.key];
        
        // Format stat string nicely
        let statStr = "";
        if (r.key === 'HasWings') statStr = val === 1 ? "Has Wings" : "No Wings";
        else statStr = `${r.name}: ${val} (${val > 5 ? 'High' : 'Low'})`;

        return {
            name: r.label || r.id, // Use label from drag source
            icon: r.icon,
            stat: statStr,
            pass: passed
        };
    });

    const allPassed = ruleResults.every(r => r.pass);
    const prediction = allPassed ? "FIRE" : "NOT FIRE";
    
    // Determine if AI was "Right" based on reality
    const isCorrect = (prediction === "FIRE" && p.CorrectType === 'fire') ||
                      (prediction === "NOT FIRE" && p.CorrectType !== 'fire');

    setCurrentTestResult({
        ...p, // Spreads Attack, Defense, etc. into the result object
        name: p.name,
        type: p.CorrectType.toUpperCase(),
        image: p.img, 
        rules: ruleResults,
        prediction: prediction,
        isMatch: isCorrect
    });

    setTestStep(prev => Math.min(prev + 1, 3));
  };

  return (
    <>
      <InstructionCard 
        title={<span><FontAwesomeIcon icon={faCampground} className="me-2" />Zone 1: Clearview Meadow</span>}
        subtitle="Simple Rules"
        instruction="Welcome to the journey! To help RuleBot identify Fire-types, we must give it clear instructions. Drag your Clue Cards into the slots to build its brain!"
        onGuidebookOpen={handleGuidebookOpen} // Pass handler
      />
      
      <div className="mb-4 border rounded" style={{ backgroundColor: '#fff' }}>
        <div className="p-3 border-bottom bg-light rounded-top">
          <h5 className="m-0">Step 1: Designing the Rule</h5>
        </div>
        <div className="p-3">
            {/* --- LOCK UI FOR STEP 1 --- */}
            {!isStep1Unlocked ? (
                <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
                    <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
                    <p className="mb-0">Please open guidebook to unlock...</p>
                </div>
            ) : (
                <>
                    <HintCard hints={zone1Hints} />
                    <Row className="mb-3 align-items-stretch">
                    <Col md={12} lg={5} className="mb-4 mb-lg-0 d-flex justify-content-center">
                        <div className="w-100 h-100" style={{ maxWidth: '400px' }}>
                        <RuleWidget 
                            type="fire" 
                            slots={droppedRules}
                            onDropRule={handleDropRule}
                            onReset={handleReset}
                        />
                        </div>
                    </Col>
                    <Col md={12} lg={7}>
                        <BoardWidget 
                        activeType="fire" 
                        currentRules={droppedRules} 
                        style={{ height: '100%' }}
                        />
                    </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <RulePlate activeRules={droppedRules} />
                    </div>
                </>
            )}
        </div>
      </div>

      <Card className={`mb-4 ${!isStep2Unlocked ? 'opacity-50' : ''}`}>
        <Card.Header as="h5">Step 2: Validating the Rule</Card.Header>
        <Card.Body>
           {!isStep2Unlocked ? (
            <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
              <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
              <p className="mb-0">Please add at least one rule in Step 1 to unlock validation!</p>
            </div>
           ) : (
            <ValidationWidget 
              title="Test Your Fire-Type Rule"
              instruction="Click the button below to see how well your rule identifies Fire-types in the wild!"
              onRun={handleRunValidation}
              showResults={showResults}
              results={results}
            />
           )}
        </Card.Body>
      </Card>

      <Card className={`mb-4 ${!isStep3Unlocked ? 'opacity-50' : ''}`}>
        <Card.Header as="h5">Step 3: The Mystery Gift Challenge</Card.Header>
        <Card.Body>
          {!isStep3Unlocked ? (
            <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed">
              <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Locked</h4>
              <p className="mb-0">Please complete the Validation Step to unlock this challenge!</p>
            </div>
          ) : (
            <TestWidget
              mode="zone1" 
              progress={`${testStep}/3`}
              pokemon={currentTestResult ? currentTestResult : null} // Pass full object
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

      {testStep >= 3 && (
        <div className="text-center py-4 mb-5">
          <Button 
            variant="success" 
            size="lg" 
            className="px-5 py-3 rounded-pill fw-bold shadow pulse-animation"
            onClick={onNextZone}
          >
             Proceed to Zone 2 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Zone1;