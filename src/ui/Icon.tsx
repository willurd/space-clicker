import * as React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.span`
  color: ${props => props.color};
  display: inline-block;
  height: ${props => ('height' in props ? props.height : props.size)}px;
  text-align: center;
  width: ${props => ('width' in props ? props.width : props.size)}px;
`;

StyledIcon.defaultProps = {
  color: '#999',
  size: 16,
};

const Icon = ({ name, ...props }) => (
  <StyledIcon {...props}>
    <i className={`fas fa-${name}`} />
  </StyledIcon>
);

export default Icon;
