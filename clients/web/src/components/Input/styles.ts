import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  color: #666360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f3ede8;

    &::placeholder {
      color: #666360;
    }
  }

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }
`;
