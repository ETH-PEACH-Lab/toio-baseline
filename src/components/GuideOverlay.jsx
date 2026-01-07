import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const GuideOverlay = ({ show, onHide }) => {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // Custom styles to match the "book" look
  const modalContentStyle = {
    backgroundColor: '#fffef2', // Cream/Beige background
    borderRadius: '15px',
    border: '4px solid #e0c090' // Light brown border
  };

  const navButtonStyle = {
    width: '40px',
    height: '40px',
    minWidth: '40px', // Prevent squishing
    borderRadius: '50%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    backgroundColor: '#ff9f1a', // Orange
    borderColor: '#e67700',
    color: 'white',
    zIndex: 10,
    flexShrink: 0 // Prevent flexbox resizing
  };

  const imagePlaceholderStyle = {
    width: '100%',
    height: '350px',
    backgroundColor: '#dcdde1',
    border: '2px dashed #bdc3c7',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px',
    position: 'relative' // For adding image later
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="border-0 bg-transparent">
        <div className="modal-content" style={modalContentStyle}>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="w-100 text-center fw-bold" style={{ color: '#5d4037' }}>
                    🔥 Fire Type Analysis
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="position-relative px-5 py-4">
                
                <div className="d-flex align-items-center justify-content-between">
                    {/* Left Button */}
                    <Button 
                        variant="warning" 
                        style={{...navButtonStyle, opacity: page === 1 ? 0.5 : 1}} 
                        onClick={handlePrev} 
                        disabled={page === 1}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>

                    {/* Content Area */}
                    <div style={imagePlaceholderStyle}>
                         <div className="text-muted text-center p-3">
                            <h5>Illustration for Page {page}</h5>
                            <p className="small">Placeholder for rule book content</p>
                         </div>
                    </div>

                    {/* Right Button */}
                    <Button 
                        variant="warning" 
                        style={{...navButtonStyle, opacity: page === totalPages ? 0.5 : 1}} 
                        onClick={handleNext} 
                        disabled={page === totalPages}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>

                <div className="text-center mt-3">
                    <span className="text-muted fst-italic">Page {page} of {totalPages}</span>
                </div>
            </Modal.Body>
        </div>
    </Modal>
  );
};

export default GuideOverlay;
