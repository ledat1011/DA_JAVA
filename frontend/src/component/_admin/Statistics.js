import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HeaderTemp from './_headerAdmin';
import { doanhthuHeler } from '../../_helper';

export default class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state={
            options : {
                title: {
                    text: 'Số tiền thu được'
                },
            
                subtitle: {
                    text: 'Tro123.com'
                },
            
                yAxis: {
                    title: {
                        text: 'Number of Money'
                    }
                },
            
                xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
            
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
            
            
            
                series: [{
                    name: 'Số tiền',
                    data:[]
            
                }],
            
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
              }
        }

     
    }
    componentDidMount() {
        doanhthuHeler.GET().then(res=>{
           if(res.status){
            //    console.log(res.data.map(c=> parseInt(c.total_amount)).length<=12? res.data.map(c=> parseInt(c.total_amount)):12 );
           var totalArr = res.data.map(c=> parseInt(c.total_amount));
            var newArr = [...totalArr];
             
             for(let i = 0; i<(12- totalArr.length);i++){
                 newArr.push(0)
                 
             }
         
               this.setState({
                options:{
                    ...this.state.options,
                    series:[{...this.state.options.series[0],data:newArr }]
                    
                }
               })
           }else
           {
               console.log(res);
           }
        })
    }
    
    render() {
      
        return (
            <div>
                    <HeaderTemp />
                    <HighchartsReact highcharts={Highcharts} options={this.state.options} />
            </div>
        
        )
    }
}
