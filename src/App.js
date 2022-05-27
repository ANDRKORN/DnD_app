import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import MapDnDContainer from './component/Map/MapDnDContainer';
import PlayersPageContainer from './component/PlayersPage/PlayersPageContainer';
import SelectRoleContainer from './component/SelectRole/SelectRoleContainer';
import storeMap from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={storeMap}>
        <BrowserRouter>
          <Routes>
            <Route path="/players" element={<PlayersPageContainer />} />
            <Route path="/map" element={<MapDnDContainer />} />
            <Route path="/" element={<SelectRoleContainer />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
