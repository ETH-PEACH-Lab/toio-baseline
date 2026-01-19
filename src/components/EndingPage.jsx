import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faStar, faRedo } from '@fortawesome/free-solid-svg-icons';

const EndingPage = ({ score, onRestart }) => {
  return (
    <Container className="text-center py-5">
      <Card className="shadow-lg border-0 p-5 rounded-3" style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
        <Card.Body>
          <div className="mb-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-warning text-white rounded-circle shadow pulse-animation" style={{ width: '120px', height: '120px', fontSize: '3.5rem' }}>
              <FontAwesomeIcon icon={faTrophy} />
            </div>
          </div>
          
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#2c3e50' }}>Mission Complete!</h1>
          <p className="lead text-secondary mb-5">
            Congratulations, AI Researcher! You have successfully trained DataBot across all zones.
          </p>

          <div className="mb-5 p-4 bg-white rounded-3 shadow-sm border border-light">
            <h3 className="text-muted mb-3">Final Score</h3>
            <div className="d-flex justify-content-center align-items-center gap-2">
                <h2 className="display-1 fw-bold text-primary mb-0">{score}</h2>
                <FontAwesomeIcon icon={faStar} className="text-warning fs-1" />
            </div>
            <p className="text-muted mt-2">Wild Pokémon Correctly Identified</p>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            className="px-5 py-3 rounded-pill fw-bold shadow hover-lift"
            onClick={onRestart}
          >
            <FontAwesomeIcon icon={faRedo} className="me-2" /> Start New Journey
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EndingPage;
