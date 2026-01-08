import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faSync } from '@fortawesome/free-solid-svg-icons';
import { RULE_ICONS } from '../data/rules'; // Ensure this path is correct

// Mapping for Stats Display
const STAT_CONFIG = [
    { key: 'Attack', label: 'Attack', icon: RULE_ICONS.ATTACK },
    { key: 'Defense', label: 'Defense', icon: RULE_ICONS.DEFENSE },
    { key: 'Speed', label: 'Speed', icon: RULE_ICONS.SPEED },
    { key: 'HasWings', label: 'Wings', icon: RULE_ICONS.WING },
    { key: 'HabitatTemperature', label: 'Temp', icon: RULE_ICONS.TEMP },
    { key: 'HabitatAltitude', label: 'Altitude', icon: RULE_ICONS.ALTITUDE }
];

const PokemonFlipCard = ({ pokemon }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Reset flip when pokemon changes
    useEffect(() => {
        setIsFlipped(false);
    }, [pokemon]);

    const handleFlip = () => setIsFlipped(!isFlipped);

    // Helper to format stat values
    const formatStat = (key, value) => {
        if (key === 'HasWings') {
            const hasWings = value === 1;
            return {
                text: hasWings ? 'Yes' : 'No',
                color: hasWings ? '#2ecc71' : '#e74c3c' // Green : Red
            };
        }
        
        // For numeric stats 0-10
        const isHigh = value > 5;
        return {
            text: `${value}/10 (${isHigh ? 'High' : 'Low'})`,
            color: isHigh ? '#2ecc71' : '#e74c3c'
        };
    };

    return (
        <div 
            style={{ 
                perspective: '1000px', 
                width: '220px', 
                height: '320px', 
                cursor: 'pointer' 
            }} 
            onClick={handleFlip}
        >
            <div 
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* --- FRONT SIDE --- */}
                <div 
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '15px',
                        border: '2px dashed #dee2e6',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    {pokemon.image ? (
                        <img 
                            src={pokemon.image} 
                            alt={pokemon.name} 
                            style={{ maxWidth: '180px', maxHeight: '180px', objectFit: 'contain', marginBottom: '15px' }} 
                        />
                    ) : (
                        <div className="text-center text-muted">No Image</div>
                    )}
                    
                    <h5 className="fw-bold mb-2">{pokemon.name}</h5>
                    
                    <div className="text-muted small mt-2">
                        <FontAwesomeIcon icon={faSync} className="me-1" /> Click to view stats
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div 
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        border: '2px solid #6c757d',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '15px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    <h6 className="text-center fw-bold border-bottom pb-2 mb-3">{pokemon.name} Stats</h6>
                    
                    <div className="d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
                        {STAT_CONFIG.map((stat) => {
                            // We need access to the full pokemon object passed from parent
                            // Since `pokemon` prop here only has name/type/image in some contexts,
                            // we need to ensure the parent passes the FULL object.
                            // Assuming `pokemon` prop HAS these fields (it should based on testPokemon.js)
                            
                            const val = pokemon[stat.key];
                            if (val === undefined) return null; // Skip if missing

                            const formatted = formatStat(stat.key, val);

                            return (
                                <div key={stat.key} className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center text-secondary fw-bold">
                                        <img src={stat.icon} alt="" width="16" height="16" className="me-2" />
                                        {stat.label}
                                    </div>
                                    <div style={{ color: formatted.color, fontWeight: 'bold' }}>
                                        {formatted.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestWidget = ({
    progress = "0/3",
    pokemon = null,
    rules = [],
    prediction = "",
    result = { isMatch: false, actualType: "" },
    onNext,
    botName = "RuleBot",
    mode = "default"
}) => {
    const isStart = progress.startsWith('0');
    const [currentStep, totalSteps] = progress.split('/').map(Number);
    const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

    if (isStart) {
        return (
            <div className="w-100">
                <p className="mb-2">
                    Wonderful! Now, let's open 3 mystery gifts to see if <strong>{botName}</strong> makes the right call every time.
                </p>

                <div className="text-center p-5 border rounded bg-white shadow-sm d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <Button
                        size="lg"
                        className="rounded px-5 py-3 fw-bold shadow"
                        style={{ backgroundColor: '#5836a9', border: 'none' }}
                        onClick={onNext}
                    >
                        <div className="fs-3"><FontAwesomeIcon icon={faGift} /></div>
                        <div>Open Mystery Box</div>
                    </Button>
                </div>
                <div className="mb-4 mt-4 mx-auto" style={{ maxWidth: '300px' }}>
                    <ProgressBar now={percentage} label={progress} variant="info" />
                </div>
            </div>
        );
    }

    // Default Fallback
    if (!pokemon) return null;

    return (
        <div className="w-100">
            <p className="mb-2 text-muted fs-5">
                Wonderful! Now, let's open 3 mystery gifts to see if <strong>{botName}</strong> makes the right call every time.
            </p>

            <div className="border rounded p-4 bg-white shadow-sm">
                <Row>
                    {/* Left Column: Pokemon Card (With Flip) */}
                    <Col md={4} className="text-center border-end d-flex flex-column align-items-center justify-content-center py-3">
                        <div className="mb-4">
                            <PokemonFlipCard pokemon={pokemon} />
                        </div>
                        
                        <Badge
                            bg={
                                pokemon.type.toLowerCase() === 'fire' ? 'danger' :
                                    pokemon.type.toLowerCase() === 'water' ? 'info' :
                                        pokemon.type.toLowerCase() === 'grass' ? 'success' :
                                            pokemon.type.toLowerCase() === 'dragon' ? 'primary' : 'secondary'
                            }
                            className="px-5 py-2 rounded-pill fs-6 text-uppercase"
                            style={{ backgroundColor: pokemon.type.toLowerCase() === 'dragon' ? '#0d6efd' : undefined }}
                        >
                            {pokemon.type}
                        </Badge>
                    </Col>

                    {/* Right Column: Rules & Results */}
                    <Col md={8} className="ps-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                        <Row className="mb-3 text-muted fw-bold border-bottom pb-2 small text-uppercase spacing-1">
                            {mode === "zone1" ? (
                                <>
                                    <Col xs={4}>Your Rule</Col>
                                    <Col xs={5}>Pokémon Stat</Col>
                                    <Col xs={3} className="text-end">Result</Col>
                                </>
                            ) : (
                                <>
                                    <Col xs={4}>Type</Col>
                                    <Col xs={5}>Score</Col>
                                    <Col xs={3} className="text-end">Result</Col>
                                </>
                            )}
                        </Row>


                        <div className="mb-4">
                            {rules.map((rule, idx) => (
                                <Row key={idx} className="py-3 border-bottom align-items-center">
                                    <Col xs={4} className="fw-bold d-flex align-items-center">
                                        {rule.name.length > 2 ? 
                                            <>{rule.icon && <img src={rule.icon} alt="" width="20" height="20" className="me-2" style={{ objectFit: 'contain' }} />}{rule.name}</>
                                            : rule.name
                                        }
                                    </Col>
                                    <Col xs={5}>
                                        {rule.stat}
                                    </Col>
                                    <Col xs={3} className="text-end text-success fw-bold">
                                        {rule.pass ? (
                                            <span><span className="me-1">✅</span>Pass</span>
                                        ) : (
                                            <span className="text-danger"><span className="me-1">❌</span>Fail</span>
                                        )}
                                    </Col>
                                </Row>
                            ))}
                        </div>

                        <div
                            className={`rounded p-3 mb-4 text-center border ${result.isMatch ? 'bg-success bg-opacity-10 border-success' : 'bg-danger bg-opacity-10 border-danger'
                                }`}
                            style={{ backgroundColor: !result.isMatch ? '#ffe6e6' : undefined }}
                        >
                            <h5 className={`fw-bold mb-1 ${result.isMatch ? 'text-success' : 'text-danger'}`} style={{ color: !result.isMatch ? '#dc3545' : undefined }}>
                                🤖 AI Prediction: {prediction}
                            </h5>
                            {!result.isMatch && (
                                <h4 className="fw-bold" style={{ color: '#dc3545' }}>
                                    ❌ Mistake. It is actually {result.actualType}.
                                </h4>
                            )}
                            {result.isMatch && (
                                <h4 className="fw-bold text-success">
                                    ✅ Correct! It matches.
                                </h4>
                            )}
                        </div>

                        <div className="text-center">
                            {progress.split('/')[0] === progress.split('/')[1] ? (
                                <Button
                                    variant="secondary"
                                    className="rounded-pill px-4 shadow-sm fw-bold border"
                                    disabled
                                    style={{ backgroundColor: '#95a5a6', borderColor: '#95a5a6', color: 'white' }}
                                >
                                    🎉 All Processed
                                </Button>
                            ) : (
                                <Button
                                    variant="light"
                                    className="rounded-pill px-4 shadow-sm fw-bold border"
                                    onClick={onNext}
                                >
                                    🔄 Test Another Pokémon
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mb-4 mt-4 mx-auto" style={{ maxWidth: '300px' }}>
                <ProgressBar
                    now={percentage}
                    label={progress}
                    variant={percentage === 100 ? "success" : "info"}
                    animated={percentage < 100}
                    style={{ height: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}
                />
            </div>
        </div>
    );
};

export default TestWidget;