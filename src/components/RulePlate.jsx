import React from 'react';
import { RULES } from '../data/rules';
import { setDraggedItem } from '../utils/dragState';

const RulePlate = ({ activeRules = [] }) => {
  const handleDragStart = (e, rule) => {
    setDraggedItem(rule);
    e.dataTransfer.setData('text/plain', JSON.stringify(rule));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const isRuleDisabled = (rule) => {
    const index = RULES.findIndex(r => r.id === rule.id);
    if (index === -1) return false;
    
    // Find pair (assuming adjacent pairs in RULES array)
    const pairIndex = index % 2 === 0 ? index + 1 : index - 1;
    const pairId = RULES[pairIndex].id;

    return activeRules.some(r => r && (r.id === rule.id || r.id === pairId));
  };

  // Split rules into two rows
  const row1 = RULES.filter((_, i) => i % 2 === 0);
  const row2 = RULES.filter((_, i) => i % 2 !== 0);

  const renderRule = (rule) => {
    const disabled = isRuleDisabled(rule);
    const isHigh = rule.id.startsWith('high') || rule.id.startsWith('has');
    const labelColor = isHigh ? '#2ecc71' : '#e74c3c';

    return (
     <div
        key={rule.id}
        draggable={!disabled}
        onDragStart={(e) => !disabled && handleDragStart(e, rule)}
        className={`bg-white shadow-sm border p-2 rounded ${disabled ? 'opacity-50' : ''}`}
        style={{ 
          cursor: disabled ? 'default' : 'grab', 
          minWidth: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: '0.9rem',
          color: labelColor,
          border: '1px solid #dee2e6',
          flex: '1 1 0px' 
        }}
     >
        <span className="me-2 d-flex align-items-center">
            <img src={rule.icon} alt={rule.label} width="24" height="24" style={{ objectFit: 'contain' }} />
        </span>
        <span className="text-nowrap">{rule.label}</span>
     </div>
   );
  };

  return (
    <div 
      className="p-4 mb-4 mx-auto shadow-sm" 
      style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '20px',
        maxWidth: '100%',
        border: '1px solid #dee2e6'
      }}
    >
      <div className="d-flex flex-column gap-3">
        {/* Row 1: High/Has */}
        <div className="d-flex flex-nowrap overflow-auto pb-2 gap-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           {row1.map(rule => renderRule(rule))}
        </div>
        
        {/* Row 2: Low/No */}
        <div className="d-flex flex-nowrap overflow-auto pb-2 gap-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           {row2.map(rule => renderRule(rule))}
        </div>
      </div>
    </div>
  );
};

export default RulePlate;
