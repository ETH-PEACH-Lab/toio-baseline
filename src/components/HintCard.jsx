import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const HintCard = ({ hints = [] }) => {
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    if (!show) {
      setShow(true);
      setCurrentIndex(0);
    } else {
      if (currentIndex === hints.length - 1) {
        setShow(false);
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => (prev + 1) % hints.length);
      }
    };

    if (hints.length === 0) return null;
  }

  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <Button
        variant="warning"
        onClick={handleClick}
        className="rounded-pill px-4 fw-bold text-dark mb-3 shadow-sm"
      >
        <FontAwesomeIcon icon={faLightbulb} className="me-2" /> Need a Hint?
      </Button>

      {show && (
        <Alert variant="warning" className="w-100 text-center shadow-sm border border-warning" style={{ backgroundColor: '#fff3cd' }}>
          <p className="mb-2 fs-5">{hints[currentIndex]}</p>
          <div className="text-muted small fst-italic">
            Hint {currentIndex + 1} of {hints.length} (Click button for next)
          </div>
        </Alert>
      )}
    </div>
  );
};

export default HintCard;
