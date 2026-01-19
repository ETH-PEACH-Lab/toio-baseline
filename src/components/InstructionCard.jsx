import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import GuideOverlay from './GuideOverlay';

// Added onGuidebookOpen prop
const InstructionCard = ({ title, subtitle, instruction, onGuidebookOpen }) => {
  const [showGuide, setShowGuide] = useState(false);

  const handleOpenGuide = () => {
      setShowGuide(true);
      if (onGuidebookOpen) {
          onGuidebookOpen(); // Notify parent (Zone1) that guide was opened
      }
  };

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
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="fs-3 me-2" />
          <h5 className="mb-0 fw-bold">Professor Oak</h5>
        </div>
        <p className="mb-0 fs-5" style={{ lineHeight: '1.6' }}>
          "{instruction}"
        </p>
      </Alert>

      <div className="text-center mt-3">
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
          onClick={handleOpenGuide} // Use local handler
        >
          <FontAwesomeIcon icon={faBookOpen} className="me-2" /> Open Guide
        </Button>
      </div>
    </div>
  );
};

export default InstructionCard;