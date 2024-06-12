import './App.css';

import Invoices from './Invoices';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';


import useInvoice from './useInvoice';
import InvoicesGrid from './InvoiceGrid';

export interface Budget {
  Year: number,
  Value: number,
  Date: string
}

function App() {
  const {invoices,getInvoices,datas} = useInvoice();

  useEffect(() => {
    getInvoices();
    
  }, []);

  
  return (
    <div className="App">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Balance">
          <Invoices invoices={invoices}/>
        </Tab>
        <Tab eventKey="grid" title="Tableau">
          <InvoicesGrid invoices={datas}/>
          
        </Tab>

      </Tabs>


    </div>
  );
}

export default App;
