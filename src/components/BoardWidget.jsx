import { FEATURES, TYPES } from '../data/board';

// 2️⃣ Minimal change inside BoardWidget (Added showAll prop)
const BoardWidget = ({ activeType, currentRules = [], allRules = {}, usePoints = false, showAll = false, style = {} }) => {
  
  const getFeatureState = (typeId, featureId) => {
    let rulesForType = [];

    if (Object.keys(allRules).length > 0) {
      rulesForType = allRules[typeId] || [];
    } else if (typeId === activeType) {
      rulesForType = currentRules;
    } else {
      return null;
    }

    const ruleIndex = rulesForType.findIndex(r => r && r.id.includes(featureId));
    const rule = rulesForType[ruleIndex];
    
    if (!rule) return null;

    if (rule.weight !== undefined) {
        return { type: rule.weight > 0 ? 'high' : 'low', points: Math.abs(rule.weight) };
    }

    let points = 3;
    if (usePoints) {
      const pointsMap = [3, 2, 2, 1];
      points = pointsMap[ruleIndex] || 1;
    }

    if (rule.id.startsWith('high') || rule.id.startsWith('has')) {
      return { type: 'high', points };
    }
    return { type: 'low', points };
  };

  const renderDots = (state) => {
    if (!state) return (
       <div className="d-flex gap-1 justify-content-center">
        {[1,2,3].map(i => (
          <div key={i} className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#e0e0e0' }} />
        ))}
      </div>
    );

    const { type, points } = state;
    
    const dots = [1, 2, 3];
    const highColor = '#2ecc71'; 
    const lowColor = '#e74c3c'; 
    const inactiveColor = '#e0e0e0';

    let filledCount = points;
    let currentColor = (type === 'high') ? highColor : lowColor;

    return (
      <div className="d-flex gap-1 justify-content-center">
        {dots.map(i => (
          <div 
            key={i}
            className="rounded-circle"
            style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: i <= filledCount ? currentColor : inactiveColor,
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="p-1 mx-auto"
      style={{
        backgroundColor: '#2c3e50',
        borderRadius: '30px',
        border: '12px solid #2c3e50',
        width: '100%',
        minHeight: '300px',
        ...style
      }}
    >
      <div 
        className="bg-white overflow-hidden h-100 w-100 d-flex flex-column" 
        style={{ 
          borderRadius: '20px',
          border: '4px solid #000' 
        }}
      >
        <div className="table-responsive h-100">
          <table className="table table-borderless mb-0 text-center align-middle h-100 w-100">
            <thead className="border-bottom" style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ width: '50px' }}></th>
                {FEATURES.map(f => (
                  <th key={f.id} className="text-secondary py-1 px-1" title={f.label}>
                     <img src={f.icon} alt={f.label} width="24" height="24" style={{ objectFit: 'contain' }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPES.map(type => (
                // 3️⃣ Change ONLY row brightness (LED effect) logic
                <tr 
                  key={type.id} 
                  className={type.id === activeType || showAll ? 'bg-white' : 'bg-light'} 
                  style={{ 
                    opacity: showAll 
                        ? 1 
                        : type.id === activeType 
                            ? 1 
                            : 0.4,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <td className="border-end py-1 px-1" style={{ backgroundColor: type.id === activeType ? '#fff' : '#f8f9fa' }}>
                    <img src={type.icon} alt={type.id} width="24" height="24" style={{ objectFit: 'contain' }} />
                  </td>
                  {FEATURES.map(f => (
                    <td key={f.id} className="py-1 px-1">
                      {renderDots(getFeatureState(type.id, f.id))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardWidget;