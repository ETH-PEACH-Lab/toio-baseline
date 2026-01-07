import React, { useState } from 'react';
import { ProgressBar, Row, Col, Card, Alert, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faBox, faCheck, faTimes, faSearch, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import InstructionCard from '../InstructionCard';
import { PACKAGE_DATA } from '../../data/package';
import { TYPE_ICONS } from '../../data/type';

const ReviewComparison = ({ type, userCorrect, icon }) => {
    const isUserChoicePure = userCorrect; // In this mock logic, Correct = Pure Choice
    const typeData = PACKAGE_DATA[type];
    const noisyPkg = typeData.find(p => !p.isPure);
    const purePkg = typeData.find(p => p.isPure);

    return (
        <div className="mb-5 border rounded-3 p-3 shadow-sm bg-white">
            <div className="text-center mb-3">
                <h4 className="fw-bold">
                    Review: <span className="text-uppercase">{type}</span>
                    <img src={icon} alt={type} style={{ width: 30, marginLeft: 10 }} />
                </h4>
                <div className={`fw-bold ${isUserChoicePure ? 'text-success' : 'text-danger'}`}>
                    You chose: {isUserChoicePure ? 'Correct Package' : 'Incorrect Package'}
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
                <img src={icon} alt={title} style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
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
      className="h-100" 
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Body className="p-4 bg-white rounded-top" style={{ minHeight: '300px' }}>
        {/* Package Image Content */}
        <div className="text-center d-flex align-items-center justify-content-center h-100">
             <img 
               src={imageSrc} 
               alt="Package Data Content" 
               className="img-fluid"
               style={{ maxHeight: '250px', objectFit: 'contain' }}
             />
        </div>

      </Card.Body>
      <Card.Footer className="text-center py-3 bg-light">
          <h5 className="mb-0 text-muted fw-bold d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faBox} className="me-2 text-warning" />
            {footerLabel}
          </h5>
      </Card.Footer>
    </Card>
  );
};

const Zone3 = ({ onNextZone }) => {
  const [step, setStep] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const totalSteps = 4;

  const handleSelection = () => {
    setStep(prev => prev + 1);
  };

  if (step > totalSteps) {
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
                <ResultCard title="FIRE" icon={TYPE_ICONS.FIRE} isPure={true} />
            </Col>
            <Col md={6}>
                <ResultCard title="WATER" icon={TYPE_ICONS.WATER} isPure={false} />
            </Col>
            <Col md={6}>
                <ResultCard title="GRASS" icon={TYPE_ICONS.GRASS} isPure={true} />
            </Col>
            <Col md={6}>
                <ResultCard title="DRAGON" icon={TYPE_ICONS.DRAGON} isPure={true} />
            </Col>
        </Row>

        <div className="text-center mt-5">
            <h3 className="fw-bold mb-2">Score: 3 / 4</h3>
            <p className="text-muted fs-5 mb-4">Some noisy data got in.</p>
            
            <div className="d-flex justify-content-center gap-3">
                <Button 
                    variant="warning" 
                    className="text-white fw-bold px-5 rounded-pill"
                    onClick={() => setShowReview(!showReview)}
                >
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    {showReview ? 'Hide Review' : 'Review My Choices'}
                </Button>
                <Button 
                    variant="success" 
                    size="lg" 
                    className="fw-bold px-5 rounded-pill"
                    onClick={onNextZone}
                >
                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                    Continue to Zone 4
                </Button>
            </div>

            {showReview && (
                <Container className="mt-5 text-start">
                    <h4 className="text-center mb-4 fw-bold text-secondary">Detailed Analysis</h4>
                    <ReviewComparison type="FIRE" userCorrect={true} icon={TYPE_ICONS.FIRE} />
                    <ReviewComparison type="WATER" userCorrect={false} icon={TYPE_ICONS.WATER} />
                    <ReviewComparison type="GRASS" userCorrect={true} icon={TYPE_ICONS.GRASS} />
                    <ReviewComparison type="DRAGON" userCorrect={true} icon={TYPE_ICONS.DRAGON} />
                </Container>
            )}
        </div>
      </div>
    );
  }

  // Determine current type label based on step
  const getCurrentType = () => {
      switch(step) {
          case 1: return "Fire";
          case 2: return "Water";
          case 3: return "Grass";
          case 4: return "Dragon";
          default: return "Unknown";
      }
  };

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
        instruction={`Big news, Researchers! RuleBot has been upgraded into DataBot. He doesn't need rules anymore—he learns from patterns! But watch out, Meowth has corrupted some training packages with 'noisy' data. We need to find the clean ones! (Step ${step}/${totalSteps})`}
      />
      
      <div className="mb-5">
        <label className="fw-bold mb-2">Progress: {getCurrentType()} Type ({step}/{totalSteps})</label>
        <ProgressBar 
            now={(step / totalSteps) * 100} 
            variant="success" 
            style={{ height: '25px', borderRadius: '15px' }}
        />
      </div>

      <div className="text-center mb-4">
          <h3 className="fw-bold text-secondary">Step {step}: Which package is the Clean (Pure) {getCurrentType().toLowerCase()} data?</h3>
      </div>

      <Row className="g-4 mb-5 pb-5">
        {PACKAGE_DATA[getCurrentType().toUpperCase()]?.map((pkg) => (
            <Col md={6} key={pkg.id}>
                <PackageCard 
                    title={pkg.label} 
                    footerLabel={pkg.label} 
                    imageSrc={pkg.image}
                    onClick={handleSelection}
                />
            </Col>
        ))}
      </Row>
    </>
  );
};

export default Zone3;
