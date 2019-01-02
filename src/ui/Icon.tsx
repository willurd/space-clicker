import * as React from 'react';
import styled, { css } from 'styled-components';
import { unit } from 'ui/utils';

const StyledIcon = styled.span`
  color: ${props => props.color};
  display: inline-block;
  font-size: ${props => unit(props.fontSize)};
  height: ${props => ('height' in props ? props.height : props.size)}px;
  text-align: center;
  width: ${props => ('width' in props ? props.width : props.size)}px;
`;

StyledIcon.defaultProps = {
  color: '#999',
  size: 16,
  fontSize: 16,
};

const typeToPrefix = type =>
  ({
    solid: 'fas',
    regular: 'far',
    light: 'fal',
    brand: 'fab',
  }[type]);

const Icon = ({ name, type = 'solid', ...props }) => {
  return (
    <StyledIcon {...props}>
      <i className={`${typeToPrefix(type)} fa-${name}`} />
    </StyledIcon>
  );
};

export default Icon;
