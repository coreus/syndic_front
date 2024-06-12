
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { h } from 'gridjs';
import { Grid, _ } from 'gridjs-react';
import useInvoice from './useInvoice';
import React, { useEffect, useState } from 'react';
import "gridjs/dist/theme/mermaid.css";

export interface Invoice {
    Id: number,
    Name: string,
    Date: string,
    Value: number,
    Sum:number,
    Active: boolean
}

const InvoicesGrid: React.FC<{invoices:Invoice[]}> = (invoices) => {
    const {updateState} = useInvoice();
    const [gridDatas,setGridDatas] = useState<any[]>([]);
    useEffect(()=>{
        setGridDatas(invoices.invoices.map((value: Invoice) => { return [value.Date, value.Name, value.Value, _(<BootstrapSwitchButton checked={value.Active} onstyle="success" offstyle="danger"
            onChange={(checked: boolean) => {
                value.Active = checked;
                console.log(value);
                updateState(value);
            }}
    
            />
            ) ]; }));
    },[invoices])
    
      return (
        
        <Grid 
            data={gridDatas}
            columns={["Date", "Libellé", {
            name: "Montant (€)",
            formatter: (cell: number) => {
                return h('b', {
                style: {
                    'color': cell != null && cell > 0 ? 'green' : 'red'
                }
                }, cell);
            }
            },
            "Validé"]}
            search={true}/>
        
      )
  }
  export default InvoicesGrid;