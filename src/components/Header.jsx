import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

const Header = ({ activeZone, onZoneChange }) => {
  const zones = ['Zone 1: Clearview Meadow', 'Zone 2: Azure Coast', 'Zone 3: Whispering Woods', 'Zone 4: Sunrise Desert'];

  return (
    <div className="bg-light border-bottom mb-3 shadow-sm">
      <Container className="py-4">
        <Row>
          <Col className="text-center">
            <h1 className="mb-3">Pokémon AI Quest</h1>
            <ButtonGroup aria-label="Zone selection">
              {zones.map((zone) => (
                <Button
                  key={zone}
                  variant={activeZone === zone ? "primary" : "outline-primary"}
                  onClick={() => onZoneChange(zone)}
                >
                  {zone}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
