import { Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import InstructionCard from '../InstructionCard';

const Zone4 = () => {
  return (
    <>
      <InstructionCard 
        title={<span><FontAwesomeIcon icon={faMountain} className="me-2" />Zone 4: Dragon's Peak</span>}
        subtitle="Master Challenge"
        instruction="You've reached the summit! This final challenge combines every skill you've learned. Program RuleBot to navigate the treacherous path to the Dragon's lair."
      />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Zone 4 Item #1</Accordion.Header>
          <Accordion.Body>
            This is the detail view for Zone 4. It uses an accordion to organize complex information.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Zone 4 Item #2</Accordion.Header>
          <Accordion.Body>
            More details can be found here.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Zone4;
