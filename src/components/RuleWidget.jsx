import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { getDraggedItem, clearDraggedItem } from '../utils/dragState';

import { TYPE_ICONS } from '../data/type';

const THEMES = {
  fire: {
    color: '#f87842ff', // Red
    icon: TYPE_ICONS.FIRE,
    title: 'Fire Rules',
  },
  water: {
    color: '#4ecdc4', // Cyan
    icon: TYPE_ICONS.WATER,
    title: 'Water Rules',
  },
  grass: {
    color: '#6ab04c', // Green
    icon: TYPE_ICONS.GRASS,
    title: 'Grass Rules',
  },
  dragon: {
    color: '#686de0', // Purple/Blue
    icon: TYPE_ICONS.DRAGON,
    title: 'Dragon Rules',
  }
};

const RuleWidget = ({ type = 'fire', slots = [null, null, null, null], onDropRule = () => {}, onReset = () => {}, showPoints = false }) => {
  const [isRotating, setIsRotating] = React.useState(false);
  const theme = THEMES[type] || THEMES.fire;
  
  const labels = showPoints 
    ? ['1st (3pts)', '2nd (2pts)', '3rd (2pts)', '4th (1pt)']
    : ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'];

  const handleRefresh = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    onReset();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, idx) => {
    e.preventDefault();
    let rule = null;
    
    // Try getting data from dataTransfer
    const ruleData = e.dataTransfer.getData('text/plain');
    if (ruleData) {
      try {
        rule = JSON.parse(ruleData);
      } catch (err) {
        console.error('Failed to parse dropped rule', err);
      }
    }

    // Fallback to global state if dataTransfer failed (common on mobile)
    if (!rule) {
      rule = getDraggedItem();
    }

    if (rule) {
      onDropRule(idx, rule);
      clearDraggedItem();
    }
  };
  
  const cardStyle = {
    border: `3px solid ${theme.color}`,
    borderRadius: '20px',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden'
  };

  const placeholderStyle = {
    border: '3px dashed #d1d5db',
    borderRadius: '15px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6c757d',
    fontWeight: '500',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  };

  const activePlaceholderStyle = {
    ...placeholderStyle,
    border: `3px solid #d1d5db`,
    backgroundColor: '#fff',
    color: '#212529',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const refreshButtonStyle = {
    width: '40px', 
    height: '40px', 
    borderRadius: '50%',
    fontSize: '1.2rem',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '2px', // optical adjustment
    transition: 'transform 0.5s ease',
    transform: isRotating ? 'rotate(360deg)' : 'none',
    cursor: 'pointer' // explicit cursor for better touch feeling
  };

  return (
    <Card style={cardStyle} className="h-100 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h3 style={{ color: theme.color, margin: 0, fontWeight: 'bold' }}>
            <img src={theme.icon} alt={theme.title} width="32" height="32" className="me-2" style={{ objectFit: 'contain' }} />
            {theme.title}
          </h3>
          <Button 
            variant="outline-secondary" 
            style={refreshButtonStyle}
            onClick={handleRefresh}
            aria-label="Refresh rules"
          >
            ↻
          </Button>
        </div>

        <Row className="g-3">
          {labels.map((label, idx) => (
            <Col xs={6} key={idx}>
              <div 
                style={slots[idx] ? activePlaceholderStyle : placeholderStyle}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDrop={(e) => handleDrop(e, idx)}
              >
                {slots[idx] ? (
                  <div className="text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="mb-1">
                        <img src={slots[idx].icon} alt={slots[idx].label} width="40" height="40" style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="fw-bold small" style={{
                      color: (slots[idx].id.startsWith('high') || slots[idx].id.startsWith('has')) ? '#2ecc71' : '#e74c3c'
                    }}>
                      {slots[idx].label}
                    </div>
                  </div>
                ) : label}
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RuleWidget;
