import * as React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  background-color: rgba(255, 190, 0, 0.1);
  border: 1px solid #f90;
  border-radius: 10px;
  color: #f90;
  padding: 20px;
`;

const Error = ({ error }) => {
  if (!error) {
    return null;
  }

  return <StyledError>{error.toString()}</StyledError>;
};

export default Error;
