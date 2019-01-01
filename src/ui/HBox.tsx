import styled from 'styled-components';

const HBox = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: ${props => props.spacing}px;
  }
`;

HBox.defaultProps = {
  spacing: 0,
};

export default HBox;
