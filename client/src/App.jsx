import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg text-textMain selection:bg-primary/30">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
