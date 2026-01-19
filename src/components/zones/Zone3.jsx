import React, { useState } from 'react';
import { ProgressBar, Row, Col, Card, Alert, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faBox, faCheck, faTimes, faSearch, faUserSecret, faLock } from '@fortawesome/free-solid-svg-icons';
import InstructionCard from '../InstructionCard';
import { TYPE_ICONS } from '../../data/type';

// Import Images directly
import fireA from '../../assets/firea.png';
import fireB from '../../assets/fireb.png';
import waterA from '../../assets/watera.png';
import waterB from '../../assets/waterb.png';
import grassA from '../../assets/grassa.png';
import grassB from '../../assets/grassb.png';
import dragonA from '../../assets/dragona.png';
import dragonB from '../../assets/dragonb.png';

// Define Correct Answers: (B, A, B, B)
// This means for Fire: B is pure. For Water: A is pure. etc.
const PACKAGE_DATA = {
    FIRE: [
        { id: 'fire_a', label: 'Package A', image: fireA, isPure: false }, // Noisy
        { id: 'fire_b', label: 'Package B', image: fireB, isPure: true }   // Pure (Correct)
    ],
    WATER: [
        { id: 'water_a', label: 'Package A', image: waterA, isPure: true }, // Pure (Correct)
        { id: 'water_b', label: 'Package B', image: waterB, isPure: false } // Noisy
    ],
    GRASS: [
        { id: 'grass_a', label: 'Package A', image: grassA, isPure: false }, // Noisy
        { id: 'grass_b', label: 'Package B', image: grassB, isPure: true }   // Pure (Correct)
    ],
    DRAGON: [
        { id: 'dragon_a', label: 'Package A', image: dragonA, isPure: false }, // Noisy
        { id: 'dragon_b', label: 'Package B', image: dragonB, isPure: true }   // Pure (Correct)
    ]
};

const ReviewComparison = ({ type, userCorrect, icon }) => {
    const isUserChoicePure = userCorrect;
    const typeData = PACKAGE_DATA[type];
    const noisyPkg = typeData.find(p => !p.isPure);
    const purePkg = typeData.find(p => p.isPure);

    // Determine which side the user picked for visual feedback
    // If user was correct, they picked Pure. If incorrect, they picked Noisy.
    
    return (
        <div className="mb-5 border rounded-3 p-3 shadow-sm bg-white">
            <div className="text-center mb-3">
                <h4 className="fw-bold">
                    Review: <span className="text-uppercase">{type}</span>
                    <img src={icon} alt={type} style={{ width: 30, marginLeft: 10, objectFit: 'contain' }} />
                </h4>
                <div className={`fw-bold ${isUserChoicePure ? 'text-success' : 'text-danger'}`}>
                    You chose: {isUserChoicePure ? 'Correct Package (Pure)' : 'Incorrect Package (Noisy)'}
                </div>
            </div>

            <Row className="g-4">
                {/* Noisy Package Column */}
                <Col md={6}>
                    <div className={`h-100 d-flex flex-column position-relative ${!isUserChoicePure ? 'bg-light rounded border border-danger' : 'opacity-50 border rounded'}`} style={{ overflow: 'hidden' }}>
                        <div className="text-center py-2 border-bottom mb-2">
                            <h6 className="text-danger fw-bold">
                                 <FontAwesomeIcon icon={faTimes} className="me-1" /> NOISY ({noisyPkg.label})
                            </h6>
                        </div>
                        
                        <div className="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center">
                            <img 
                                src={noisyPkg.image} 
                                alt="Noisy Package" 
                                className="img-fluid"
                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                            />
                        </div>

                        {!isUserChoicePure && (
                            <div className="bg-danger text-white text-center py-2 fw-bold w-100 mt-auto">
                                YOU PICKED THIS
                            </div>
                        )}
                    </div>
                </Col>

                {/* Pure Package Column */}
                <Col md={6}>
                    <div className={`h-100 d-flex flex-column position-relative ${isUserChoicePure ? 'rounded border border-success' : 'opacity-50 border rounded'}`} style={{ overflow: 'hidden' }}>
                        <div className="text-center py-2 border-bottom mb-2">
                            <h6 className="text-success fw-bold">
                                 <FontAwesomeIcon icon={faCheck} className="me-1" /> PURE ({purePkg.label})
                            </h6>
                        </div>

                        <div className="text-center py-4 flex-grow-1 d-flex align-items-center justify-content-center">
                            <img 
                                src={purePkg.image} 
                                alt="Pure Package" 
                                className="img-fluid"
                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                            />
                        </div>

                        {isUserChoicePure && (
                            <div className="bg-success text-white text-center py-2 fw-bold w-100 mt-auto">
                                YOU PICKED THIS
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const ResultCard = ({ title, icon, isPure }) => {
    return (
        <Card 
            className="h-100 text-center shadow-sm"
            style={{ 
                backgroundColor: isPure ? '#d4edda' : '#f8d7da', 
                borderColor: isPure ? '#28a745' : '#dc3545',
                borderWidth: '2px'
            }}
        >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
                <img src={icon} alt={title} style={{ width: '40px', height: '40px', marginBottom: '15px', objectFit: 'contain' }} />
                <h5 className="fw-bold mb-3" style={{ color: isPure ? '#155724' : '#721c24' }}>{title}</h5>
                
                {isPure ? (
                    <div className="d-flex align-items-center text-success fw-bold fs-5">
                        <FontAwesomeIcon icon={faCheck} className="me-2 bg-success text-white p-1 rounded" />
                        PURE
                    </div>
                ) : (
                    <div className="d-flex align-items-center text-danger fw-bold fs-5">
                        <FontAwesomeIcon icon={faTimes} className="me-2 bg-danger text-white p-1 rounded" style={{ width: '16px', height: '16px' }} />
                        NOISY
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};


const PackageCard = ({ footerLabel, imageSrc, onClick }) => {
  return (
    <Card 
      className="h-100 shadow-sm border-0" 
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Body className="p-0 bg-white rounded overflow-hidden d-flex flex-column" style={{ minHeight: '320px' }}>
        {/* Image Container */}
        <div className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
             <img 
               src={imageSrc} 
               alt="Package Data Content" 
               className="img-fluid rounded"
               style={{ maxHeight: '280px', width: 'auto', objectFit: 'contain' }}
             />
        </div>
      </Card.Body>
      <Card.Footer className="text-center py-3 bg-white border-top-0">
          <h5 className="mb-0 text-dark fw-bold d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faBox} className="me-2 text-warning" />
            {footerLabel}
          </h5>
      </Card.Footer>
    </Card>
  );
};

const Zone3 = ({ onNextZone }) => {
  const [step, setStep] = useState(1);
  const [userResults, setUserResults] = useState({}); // { FIRE: true, WATER: false ... }
  const [showReview, setShowReview] = useState(false);

  // --- NEW: Passcode Lock State ---
  const [passcode, setPasscode] = useState("");
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState(false);
  
  const typesOrder = ["FIRE", "WATER", "GRASS", "DRAGON"];
  const totalSteps = typesOrder.length;

  const currentTypeKey = typesOrder[step - 1];

  // --- HANDLERS ---
  const handleUnlock = () => {
    if (passcode.trim() === "GreenAvocado") {
        setIsPasscodeUnlocked(true);
    } else {
        alert("Incorrect Passcode. Hint: It's a fruit!");
    }
  };

  const handleSelection = (selectedPkg) => {
    // Determine correctness immediately
    const isCorrect = selectedPkg.isPure;
    
    // Save Result
    setUserResults(prev => ({
        ...prev,
        [currentTypeKey]: isCorrect
    }));

    // Move to next step
    setStep(prev => prev + 1);
  };

  if (step > totalSteps) {
    const correctCount = Object.values(userResults).filter(v => v).length;

    return (
      <div className="py-4">
        <div className="text-center mb-5">
             <h2 className="fw-bold">
                <FontAwesomeIcon icon={faUserSecret} className="me-2 text-dark" />
                Lab 3 Results Reveal!
             </h2>
        </div>

        <Row className="g-4 mb-4">
            <Col md={6}>
                <ResultCard title="FIRE" icon={TYPE_ICONS.FIRE} isPure={userResults.FIRE} />
            </Col>
            <Col md={6}>
                <ResultCard title="WATER" icon={TYPE_ICONS.WATER} isPure={userResults.WATER} />
            </Col>
            <Col md={6}>
                <ResultCard title="GRASS" icon={TYPE_ICONS.GRASS} isPure={userResults.GRASS} />
            </Col>
            <Col md={6}>
                <ResultCard title="DRAGON" icon={TYPE_ICONS.DRAGON} isPure={userResults.DRAGON} />
            </Col>
        </Row>

        <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">Score: {correctCount} / 4</h3>
            <p className="text-muted fs-5 mb-4">
                {correctCount === 4 ? "Perfect! DataBot has pristine data." : "Some noisy data got in."}
            </p>
            
            <div className="d-flex justify-content-center gap-3">
                <Button 
                    variant="warning" 
                    className="text-white fw-bold px-5 rounded-pill shadow-sm"
                    onClick={() => setShowReview(!showReview)}
                >
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    {showReview ? 'Hide Review' : 'Review My Choices'}
                </Button>
                <Button 
                    variant="success" 
                    size="lg" 
                    className="fw-bold px-5 rounded-pill shadow-sm"
                    onClick={onNextZone}
                >
                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                    Continue to Zone 4
                </Button>
            </div>

            {showReview && (
                <Container className="mt-5 text-start">
                    <h4 className="text-center mb-4 fw-bold text-secondary">Detailed Analysis</h4>
                    <ReviewComparison type="FIRE" userCorrect={userResults.FIRE} icon={TYPE_ICONS.FIRE} />
                    <ReviewComparison type="WATER" userCorrect={userResults.WATER} icon={TYPE_ICONS.WATER} />
                    <ReviewComparison type="GRASS" userCorrect={userResults.GRASS} icon={TYPE_ICONS.GRASS} />
                    <ReviewComparison type="DRAGON" userCorrect={userResults.DRAGON} icon={TYPE_ICONS.DRAGON} />
                </Container>
            )}
        </div>
      </div>
    );
  }

  // Helper for title casing
  const formatTitle = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <>
      <InstructionCard 
        title={
            <span style={{ color: '#686de0' }}>
                <FontAwesomeIcon icon={faTree} className="me-2" />
                Zone 3: Whispering Woods
            </span>
        }
        subtitle="Upgrading to DataBot"
        instruction={`Big news, Researchers! RuleBot has been upgraded into DataBot. He doesn't need rules anymore—he learns from patterns! But watch out, Meowth has corrupted some training packages with 'noisy' data. We need to find my clean ones! (Step ${step}/${totalSteps})`}
      />
      
      <div className="mb-5">
        <label className="fw-bold mb-2">Progress: {formatTitle(currentTypeKey)} Type ({step}/{totalSteps})</label>
        <ProgressBar 
            now={((step - 1) / totalSteps) * 100} 
            variant="success" 
            style={{ height: '25px', borderRadius: '15px' }}
        />
      </div>

     {/* --- LOCK UI FOR ZONE 3 --- */}
      {!isPasscodeUnlocked ? (
        <div className="text-center p-5 text-muted bg-light rounded border border-2 border-dashed mb-5">
            <h4 className="mb-3"><FontAwesomeIcon icon={faLock} className="me-2" /> Data Lab Locked</h4>
            <p className="mb-3">Please enter the facilitator passcode to begin data sorting.</p>
            <div className="d-flex justify-content-center gap-2">
                <input 
                    type="text" 
                    className="form-control" 
                    style={{ maxWidth: '200px' }}
                    placeholder="Enter Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                />
                <Button variant="primary" onClick={handleUnlock}>Unlock</Button>
            </div>
        </div>
      ) : (
      <>
      <div className="text-center mb-4">
          <h3 className="fw-bold text-secondary">Step {step}: Which package is the Clean (Professor) {formatTitle(currentTypeKey)} data?</h3>
      </div>

      <Row className="g-4 mb-5 pb-5">
        {PACKAGE_DATA[currentTypeKey]?.map((pkg) => (
            <Col md={6} key={pkg.id}>
                <PackageCard 
                    footerLabel={pkg.label} 
                    imageSrc={pkg.image}
                    onClick={() => handleSelection(pkg)}
                />
            </Col>
        ))}
      </Row>
      </>
      )}
    </>
  );
};

export default Zone3;