import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Provider } from './web3/index';
import { BlockChainProvider } from './stores/BlockChain';
import { ToastContainer } from 'react-toastify';
// import { SarcophagiDataProvider } from './components/Context/SarcophagiContext';
// import { ArchaeologistDataProvider } from './components/Context/ArchaeologistContext';

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <BlockChainProvider>
        <div> 
        {/* <SarcophagiDataProvider >
          <ArchaeologistDataProvider > */}
            <App />
            <ToastContainer closeButton={true} position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
          {/* </ArchaeologistDataProvider>
        </SarcophagiDataProvider> */}
        </div>
      </BlockChainProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
