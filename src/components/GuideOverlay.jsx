import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Import Guidebook Images
import G1 from '../assets/G1.png';
import G2 from '../assets/G2.png';
import G3 from '../assets/G3.png';
import G4 from '../assets/G4.png';

const PAGES = [
  { id: 1, title: "🔥 Fire Type Page", img: G1 },
  { id: 2, title: "💧 Water Type Page", img: G2 },
  { id: 3, title: "🍃 Grass Type Page", img: G3 },
  { id: 4, title: "🐉 Dragon Type Page", img: G4 }
];

const GuideOverlay = ({ show, onHide }) => {
  const [page, setPage] = useState(1);
  const totalPages = PAGES.length;
  const currentPageData = PAGES[page - 1];

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  // Custom styles to match the "book" look
  const modalContentStyle = {
    backgroundColor: '#fffef2', // Cream/Beige background
    borderRadius: '15px',
    border: '4px solid #e0c090', // Light brown border
    overflow: 'hidden'
  };

  const navButtonStyle = {
    width: '40px',
    height: '40px',
    minWidth: '40px',
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
    flexShrink: 0
  };

  const imageContainerStyle = {
    width: '100%',
    height: '400px', // Increased slightly to fit content
    backgroundColor: '#fff',
    border: '2px solid #bdc3c7',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px',
    overflow: 'hidden',
    padding: '5px'
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="border-0 bg-transparent">
        <div className="modal-content" style={modalContentStyle}>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="w-100 text-center fw-bold" style={{ color: '#5d4037' }}>
                    {currentPageData.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="position-relative px-4 py-4">
                
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
                    <div style={imageContainerStyle}>
                         <img 
                            src={currentPageData.img} 
                            alt={`Guide Page ${page}`} 
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%', 
                                objectFit: 'contain' 
                            }} 
                         />
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