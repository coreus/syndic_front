import { useState } from "react";
import { Invoice} from "./Invoices";


export default function useInvoice() {
    const [datas,setDatas] = useState<Invoice[]>([]);
    const [invoices,setInvoices] = useState<Invoice[]>([]);
   

      async function _get():Promise<void> {
          let url = window.location.origin.split(':').slice(0,2).join(':')
            const response = await fetch(url+":8085",{
                method: "GET"
            });
            var data = await response.json();
            data = data.sort((a: Invoice, b: Invoice) => { return Date.parse(a.Date) > Date.parse(b.Date) ? 1 : -1; }).filter((value: Invoice) => { return Date.parse(value.Date) <= Date.now() });
            
            
            setDatas(data);
            
            let sum = 0;
            setInvoices(data.filter((value: Invoice) => { return value.Active}).map((value: Invoice) => { sum += value.Value; value.Sum = Math.round(sum); return value; }));
            console.log(datas);
      }
      async function _updateState(invoice:Invoice): Promise<void> {
            let url = window.location.origin.split(':').slice(0,2).join(':')
            await fetch(url + ":8085/active?id="+invoice.Id+"&active="+invoice.Active,{
              method: "GET"
            });
            let sum = 0;
            console.log(invoices);
            //console.log(invoice);
            //console.log(datas);
            //console.log(datas.map((value: Invoice)=>{ if (value.Id === invoice.Id) {value.Active = invoice.Active} return value;}).filter((value: Invoice) => { return value.Active}).map((value: Invoice) => { sum += value.Value; value.Value = Math.round(sum); return value; }));
            //setDatas(datas.map((value: Invoice)=>{ if (value.Id == invoice.Id) {value.Active = invoice.Active} return value;}).filter((value: Invoice) => { return value.Active}).map((value: Invoice) => { sum += value.Value; value.Value = Math.round(sum); return value; }));
            //setInvoices(datas.map((value: Invoice)=>{ if (value.Id == invoice.Id) {value.Active = invoice.Active} return value;}).filter((value: Invoice) => { return value.Active}).map((value: Invoice) => { sum += value.Value; value.Value = Math.round(sum); return value; }));
      }
      

      return {
        getInvoices:() =>_get(),
        updateState: (invoice:Invoice)=>_updateState(invoice),
        invoices,
        datas
      }
}
