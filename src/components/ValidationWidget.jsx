import React from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faCheckCircle, faQuestionCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { TYPE_ICONS } from '../data/type';

const ValidationWidget = ({ 
  title, 
  instruction, 
  buttonLabel = "Run Experiment", 
  onRun, 
  showResults = false,
  results = {}
}) => {
  return (
    <div className="text-center w-100">
      <h4 className="fw-bold mb-3">{title}</h4>
      <p className="fs-5 mb-4 text-muted">"{instruction}"</p>
      
      <Button 
        variant="primary" 
        size="lg" 
        className="rounded-pill px-5 mb-4 fw-bold shadow-sm"
        style={{ backgroundColor: '#4a90e2', border: 'none' }}
        onClick={onRun}
      >
        <FontAwesomeIcon icon={faFlask} className="me-2" /> {buttonLabel}
      </Button>

      {showResults && (
        <Alert variant="light" className="border shadow-sm text-start mt-3">
          <div className="text-center mb-3">
             <h5 className="fw-bold text-success"><FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Experiment Results</h5>
          </div>
          
          <Row className="g-3 mb-3">
            {Object.entries(results).map(([key, data]) => {
              if (key === 'accuracy') return null;
              
              let color = '#6c757d';
              let iconContent = faQuestionCircle;
              let isImage = false;
              let label = key.charAt(0).toUpperCase() + key.slice(1);
              let bg = '#e9ecef';

              switch(key) {
                case 'fire': color = '#ff6b6b'; iconContent = TYPE_ICONS.FIRE; isImage = true; bg = '#fff5f5'; break;
                case 'water': color = '#4ecdc4'; iconContent = TYPE_ICONS.WATER; isImage = true; bg = '#f0fcfc'; break;
                case 'grass': color = '#6ab04c'; iconContent = TYPE_ICONS.GRASS; isImage = true; bg = '#f4f9f0'; break;
                case 'dragon': color = '#686de0'; iconContent = TYPE_ICONS.DRAGON; isImage = true; bg = '#f3f4fa'; break;
                case 'non_fire': 
                  color = '#6c757d'; 
                  iconContent = faBan; 
                  isImage = false;
                  bg = '#e9ecef'; 
                  label = 'Non-Fire'; 
                  break;
                default: break;
              }

              return (
                <Col md={6} key={key}>
                  <div className="p-3 rounded d-flex align-items-center h-100 shadow-sm border" style={{ backgroundColor: bg, borderColor: `${color}40` }}>
                    <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 bg-white shadow-sm"
                        style={{ width: '50px', height: '50px' }}
                    >
                         {isImage ? (
                             <img src={iconContent} alt={label} width="28" height="28" style={{ objectFit: 'contain' }} />
                         ) : (
                             <FontAwesomeIcon icon={iconContent} style={{ color: color, fontSize: '1.5rem' }} />
                         )}
                    </div>
                    <div>
                        <div className="small fw-bold text-uppercase mb-0" style={{ color: color, letterSpacing: '0.5px', fontSize: '0.75rem' }}>{label}</div>
                        <div className="fw-bold" style={{ fontSize: '1.5rem', lineHeight: '1.2', color: '#343a40' }}>
                            {data.count}<span className="text-secondary fs-6 ms-1" style={{ fontWeight: '600' }}>/ {data.total}</span>
                        </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          <div className="text-center border-top pt-3">
             <h4 className="fw-bold" style={{ color: '#4a90e2' }}>
               Total Accuracy: {results.accuracy}%
             </h4>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default ValidationWidget;
