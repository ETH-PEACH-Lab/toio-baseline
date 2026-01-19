import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faStar, faRedo } from '@fortawesome/free-solid-svg-icons';

const EndingPage = ({ score, onRestart, caughtPokemon = [] }) => {
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
            Congratulations, young researcher! You have successfully trained the bots across all zones.
          </p>

          <div className="mb-5 p-4 bg-white rounded-3 shadow-sm border border-light">
            <h3 className="text-muted mb-4">Your Collection</h3>
            {caughtPokemon.length === 0 ? (
                <p className="text-muted fst-italic">No Pokémon caught this time. Try again!</p>
            ) : (
                <Row className="justify-content-center g-3">
                    {caughtPokemon.map((p, idx) => (
                        <Col key={idx} xs={4} sm={3} md={2}>
                             <div className="text-center">
                                <div className="rounded-circle bg-light border p-2 mb-2 shadow-sm" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={p.image} alt={p.name} style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'contain' }} />
                                </div>
                                <small className="fw-bold d-block text-truncate">{p.name}</small>
                             </div>
                        </Col>
                    ))}
                </Row>
            )}
            
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 pt-3 border-top">
                <h2 className="display-4 fw-bold text-primary mb-0">{score}</h2>
                <FontAwesomeIcon icon={faStar} className="text-warning fs-2" />
                <span className="text-muted fs-5 ms-2">Total Score</span>
            </div>
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
