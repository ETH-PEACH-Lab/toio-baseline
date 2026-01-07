import React from 'react';
import { Row, Col, Badge, Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

const TestWidget = ({
    progress = "0/3",
    pokemon = {
        name: "Dialga",
        type: "DRAGON",
        image: null // Placeholder
    },
    rules = [
        { name: "High Attack", stat: "Attack: 9 (High)", pass: true },
        { name: "High Defense", stat: "Defense: 9 (High)", pass: true }
    ],
    prediction = "FIRE",
    result = { isMatch: false, actualType: "DRAGON" },
    onNext
}) => {
    const isStart = progress.startsWith('0');
    const [currentStep, totalSteps] = progress.split('/').map(Number);
    const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

    if (isStart) {
        return (
            <div className="w-100">
                <p className="mb-2">
                    Wonderful! Now, let's open 3 mystery gifts to see if RuleBot makes the right call every time.
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

    return (
        <div className="w-100">
            <p className="mb-2 text-muted fs-5">
                Wonderful! Now, let's open 3 mystery gifts to see if RuleBot makes the right call every time.
            </p>

            <div className="border rounded p-4 bg-white shadow-sm">
                <Row>
                    {/* Left Column: Pokemon Image & Info */}
                    <Col md={4} className="text-center border-end d-flex flex-column align-items-center justify-content-center py-3">
                        <div
                            className="mb-4 bg-light rounded d-flex align-items-center justify-content-center text-muted border border-2 border-dashed"
                            style={{ width: '220px', height: '220px' }}
                        >
                            {pokemon.image ? (
                                <img src={pokemon.image} alt={pokemon.name} className="img-fluid" />
                            ) : (
                                <div className="text-center p-3">
                                    <small>Pokemon Image<br />Placeholder</small>
                                </div>
                            )}
                        </div>
                        <h2 className="fw-bold mb-3">{pokemon.name}</h2>
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
                        {/* Headers */}
                        <Row className="mb-3 text-muted fw-bold border-bottom pb-2 small text-uppercase spacing-1">
                            <Col xs={4}>Your Rule</Col>
                            <Col xs={5}>Pokémon Stat</Col>
                            <Col xs={3} className="text-end">Result</Col>
                        </Row>

                        {/* Rules List */}
                        <div className="mb-4">
                            {rules.map((rule, idx) => (
                                <Row key={idx} className="py-3 border-bottom align-items-center">
                                    <Col xs={4} className="fw-bold d-flex align-items-center">
                                        Rule {idx + 1}: {rule.icon && <img src={rule.icon} alt="" width="20" height="20" className="me-2" style={{ objectFit: 'contain' }} />}{rule.name}
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

                        {/* Prediction Result Box */}
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

                        {/* Action Button */}
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
