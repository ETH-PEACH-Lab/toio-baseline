import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Header = ({ activeZone, onZoneChange, zones = [], unlockedIndex = 0 }) => {
  // If zones prop is not provided, fallback (though App.jsx should provide it)
  const zoneList = zones.length > 0 ? zones : ['Zone 1: Clearview Meadow', 'Zone 2: Azure Coast', 'Zone 3: Whispering Woods', 'Zone 4: Sunrise Desert'];

  return (
    <div className="bg-light border-bottom mb-3 shadow-sm">
      <Container className="py-4">
        <Row>
          <Col className="text-center">
            <h1 className="mb-3">Pokémon AI Quest</h1>
            <ButtonGroup aria-label="Zone selection">
              {zoneList.map((zone, idx) => {
                const isLocked = idx > unlockedIndex;
                return (
                  <Button
                    key={zone}
                    variant={activeZone === zone ? "primary" : "outline-primary"}
                    onClick={() => !isLocked && onZoneChange(zone)}
                    disabled={isLocked}
                    style={{ 
                      opacity: isLocked ? 0.6 : 1,
                      cursor: isLocked ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLocked && <FontAwesomeIcon icon={faLock} className="me-2" size="sm" />}
                    {zone.split(':')[0]} 
                  </Button>
                );
              })}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
