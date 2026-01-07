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

const Zone1 = ({ onNextZone }) => {
  const [droppedRules, setDroppedRules] = useState([null, null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [testStep, setTestStep] = useState(0);

  const isStep2Unlocked = droppedRules.some(r => r !== null);
  const isStep3Unlocked = showResults;

  const [results, setResults] = useState({
    fire: { count: 0, total: 25 },
    accuracy: 0
  });

  const zone1Hints = [
    "Fire types are known for their scorching heat. Try looking for rules related to temperature!",
    "Some Pokemon are known for their offensive power. Does 'High Attack' fit Fire types?",
    "Look at which Pokémon are not Fire types — if your plan catches them too, there might be a conflict! Try removing or changing one clue to fix it."
  ];

  const handleDropRule = (idx, rule) => {
    const newRules = [...droppedRules];
    newRules[idx] = rule;
    setDroppedRules(newRules);
  };

  const handleReset = () => {
    setDroppedRules([null, null, null, null]);
  };

  const handleRunValidation = () => {
    // TODO: Implement actual validation logic here
    // For now, we are simulating a successful validation result
    setShowResults(true);
    setResults({
      fire: { count: 18, total: 20 },
      non_fire: { count: 12, total: 15 },
      accuracy: 86
    });
  };

  const handleTest = () => {
    // TODO: Implement actual test logic here
    setTestStep(prev => Math.min(prev + 1, 3));
  };

  return (
    <>
      <InstructionCard 
        title={<span><FontAwesomeIcon icon={faCampground} className="me-2" />Zone 1: Clearview Meadow</span>}
        subtitle="Simple Rules"
        instruction="Welcome to the journey! To help RuleBot identify Fire-types, we must give it clear instructions. Drag your Clue Cards into the slots to build its brain!"
      />
      
      <div className="mb-4 border rounded" style={{ backgroundColor: '#fff' }}>
        <div className="p-3 border-bottom bg-light rounded-top">
          <h5 className="m-0">Step 1: Designing the Rule</h5>
        </div>
        <div className="p-3">
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
              progress={`${testStep}/3`}
              pokemon={{ 
                name: "Dialga", 
                type: "DRAGON", 
                image: null 
              }}
              rules={[
                { name: "High Attack", icon: RULE_ICONS.ATTACK, stat: "Attack: 9 (High)", pass: true },
                { name: "High Defense", icon: RULE_ICONS.DEFENSE, stat: "Defense: 9 (High)", pass: true }
              ]}
              prediction="FIRE"
              result={{ isMatch: false, actualType: "DRAGON" }}
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
