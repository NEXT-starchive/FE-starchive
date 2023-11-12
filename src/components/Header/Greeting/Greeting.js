import { styled } from "styled-components";

const Greeting = () => {
  return <GreetingContainer>Greeting</GreetingContainer>;
};

export default Greeting;

const GreetingContainer = styled.div`
  flex: 1;
  width: 322px;
  height: 135px;
  box-sizing: border-box;
  border: 1px solid #000;
`;
