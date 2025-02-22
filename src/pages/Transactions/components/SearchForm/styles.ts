import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-600']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }

`
export const SearchRadios = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme['green-500']};
  border-radius: 6px;
  background: ${(props) => props.theme['gray-800']}; 
  width: 150px; 
`;

export const RadioButton = styled(RadioGroup.Item)`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${(props) => props.theme['green-300']};
  font-size: 0.875rem;

  &:before {
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: none;
    display: inline-block;
  }

  &[data-state='checked']::before {
    border: none;
    background-color: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
  }
`;