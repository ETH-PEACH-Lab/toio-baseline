import { useState } from 'react';
import { Row, Col, Pagination, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faChevronLeft, faChevronRight, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import RuleWidget from '../RuleWidget';
import InstructionCard from '../InstructionCard';
import RulePlate from '../RulePlate';
import BoardWidget from '../BoardWidget';
import HintCard from '../HintCard';
import ValidationWidget from '../ValidationWidget';
import TestWidget from '../TestWidget';

import { RULE_ICONS } from '../../data/rules';

const Zone2 = ({ onNextZone }) => {
  const [activePage, setActivePage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [results, setResults] = useState({
    fire: { count: 0, total: 20 },
    water: { count: 0, total: 15 },
    grass: { count: 0, total: 10 },
    dragon: { count: 0, total: 5 },
    accuracy: 0
  });

  const rules = ['fire', 'water', 'grass', 'dragon'];
  const currentType = rules[activePage - 1];
  const totalPages = rules.length;

  const zone2Hints = [
    "Different elements have distinct strengths. Water is fluid and defensive.",
    "Grass types are rooted in nature. Think about their habitat.",
    "Dragons are legendary creatures. They usually soar high and strike hard."
  ];

  const [zoneRules, setZoneRules] = useState({
    fire: [null, null, null, null],
    water: [null, null, null, null],
    grass: [null, null, null, null],
    dragon: [null, null, null, null],
  });

  const isStep2Unlocked = Object.values(zoneRules).some(rules => rules.some(r => r !== null));
  const isStep3Unlocked = showResults;

  const handleDropRule = (type, idx, rule) => {
    setZoneRules(prev => ({
      ...prev,
      [type]: prev[type].map((r, i) => (i === idx ? rule : r))
    }));
  };

  const handleReset = (type) => {
    setZoneRules(prev => ({
      ...prev,
      [type]: [null, null, null, null]
    }));
  };

  const handleRunValidation = () => {
    // TODO: Implement actual validation logic here
    // For now, we are simulating a successful validation result
    setShowResults(true);
    setResults({
      fire: { count: 18, total: 20 },
      water: { count: 14, total: 15 },
      grass: { count: 10, total: 10 },
      dragon: { count: 5, total: 5 },
      accuracy: 94
    });
  };

  const handleTest = () => {
    // TODO: Implement actual test logic here
    setTestStep(prev => Math.min(prev + 1, 3));
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
          <h5 className="m-0">Step 1: Designing the Rule</h5>
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
              <Col md={12} lg={7}>
                <BoardWidget 
                  activeType={currentType} 
                  allRules={zoneRules}
                  usePoints={true}
                  style={{ height: '100%' }}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-3 mb-3">
              <Pagination className="mb-0">
                <Pagination.Prev 
                  disabled={activePage === 1}
                  onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Pagination.Prev>
                {rules.map((rule, idx) => (
                  <Pagination.Item
                    key={idx + 1}
                    active={idx + 1 === activePage}
                    onClick={() => setActivePage(idx + 1)}
                    style={{ minWidth: '80px', textAlign: 'center' }}
                  >
                    {rule.charAt(0).toUpperCase() + rule.slice(1)}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  disabled={activePage === totalPages}
                  onClick={() => setActivePage(prev => Math.min(prev + 1, totalPages))}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Pagination.Next>
              </Pagination>
            </div>
            
            <div className="d-flex justify-content-center">
              <RulePlate activeRules={zoneRules[currentType]} />
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
         <Card.Header as="h5">Step 3: Testing the Rule</Card.Header>
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
                name: "Palkia", 
                type: "DRAGON", 
                image: null 
              }}
              rules={[
                { name: "Special Attack", icon: RULE_ICONS.ATTACK, stat: "Sp. Atk: 9 (High)", pass: true },
                { name: "Speed", icon: RULE_ICONS.SPEED, stat: "Speed: 8 (High)", pass: true }
              ]}
              prediction="WATER"
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
             Proceed to Zone 3 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Zone2;
