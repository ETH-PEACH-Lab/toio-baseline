import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import GuideOverlay from './GuideOverlay';

const InstructionCard = ({ title, subtitle, instruction }) => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="mb-5">
      <GuideOverlay show={showGuide} onHide={() => setShowGuide(false)} />

      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: '#686de0' }}>
          {title}
        </h2>
        {subtitle && <p className="text-muted fst-italic fs-5">{subtitle}</p>}
      </div>

      <Alert variant="primary" className="shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="fs-3 me-2" />
            <h5 className="mb-0 fw-bold">Professor Oak</h5>
          </div>
          <Button 
            variant="warning" 
            className="rounded-pill px-4 fw-bold shadow-sm"
            style={{ 
              border: '2px solid #fff', 
              fontSize: '1.1rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => setShowGuide(true)}
          >
            <FontAwesomeIcon icon={faBookOpen} className="me-2" /> Open Guide
          </Button>
        </div>
        <p className="mb-0 fs-5" style={{ lineHeight: '1.6' }}>
          "{instruction}"
        </p>
      </Alert>
    </div>
  );
};

export default InstructionCard;
