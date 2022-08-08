import { FC } from 'react';
import styled from 'styled-components';
import Layout from './components/Layout';

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(90deg, rgba(220,240,218,1) 0%, rgba(228,216,255,1) 100%)',
  minHeight: '100vh',
  maxHeight: '100%'
});

const App: FC = () => {

  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  )

}

export default App;
