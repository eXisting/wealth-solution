import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import CalculateFromTotalSavings from './FigmaUX/CalculateFromTotalSavings';

const RootApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RootApp>
            <Routes>
              <Route path="/" element={<CalculateFromTotalSavings store={store}/>} />
              {/* <Route path="/initial-data" element={<InitialValuesPage />} />
              <Route path="/savings-graph" element={<SavingsGraphPage />} />
              <Route path="/decade-one" element={<DecadeOnePage />} />
              <Route path="/decade-two" element={<DecadeTwoPage />} />
              <Route path="/decade-three" element={<DecadeThreePage />} />
              <Route path="/pre-result" element={<PreResultPage />} />
              <Route path="/calculated" element={<CalculatedPage />} />
              <Route path="/follow-steps" element={<FollowSteps />} />
              <Route path="/one-more-thing" element={<OneMoreThing />} /> */}
            </Routes>
          </RootApp>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);