import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export interface Invoice {
    Id: number,
    Name: string,
    Date: string,
    Value: number,
    Sum:number,
    Active: boolean
}

const Invoices: React.FC<{invoices:Invoice[]}> = (props) => {
    
    const [chartOptions,setChartOptions] = useState<ApexOptions>({})
    const [series,setSeries] = useState<any[]>([])
    useEffect(()=>{
        setChartOptions({
                chart: {
                  id: 'invoices'
                },
                xaxis: {
                    type: 'datetime',
                    categories: props.invoices.map((value: Invoice) => { return Date.parse(value.Date) }),
                    tickAmount: 10,
                    labels: {
                        formatter: function(value:any, timestamp:number, opts:any) {
                          return new Date(value).toLocaleDateString()
                        }
                    }
                  }
            });
        setSeries([
            {
              name: 'Budget',
              data: props.invoices.map((value: Invoice) => { return value.Sum }) ,
            },
          ]);
    },[props.invoices])
    
      return (
        <ReactApexChart type="area" options={chartOptions} series={series} height={350} />
      )
  }
  export default Invoices;