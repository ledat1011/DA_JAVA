import React from "react";
import FooterAdmin from "./_footerAdmin";


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HeaderTemp from './_headerAdmin';
import { doanhthuHeler } from '../../_helper';
import { NavLink as Active } from "react-router-dom";
import MapAdminComponent from "../_admin/MapAdminComponent";

// class ListingTable extends React.Component {
//   render() {
//     return (
//       <div>
//         <table
//           className="table table-bordered"
//           id="dataTable"
//           width="100%"
//           cellSpacing={0}
//         >
//           <thead>
//             <tr>
//               <th>{this.props.colunmName}</th>
//               <th>{this.props.colunmName2}</th>
//               <th>{this.props.colunmName3}</th>
//               <th>{this.props.colunmName4}</th>
//               <th>{this.props.colunmName5}</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//     );
//   }
// }

export default class adminTemp extends React.Component {
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
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1
              className="h3 mb-0 text-gray-800"
              style={{ marginLeft: "20px" }}
            >
              Dashboard
            </h1>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              Tạo báo cáo
            </a>
          </div>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Doanh thu (theo tháng)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $40,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Doanh thu (theo năm)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Tasks
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          50%
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "50%" }}
                            aria-valuenow={50}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Requests Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <Active to="/manageuser" className="card bg-primary text-white shadow w-100 btn-card">
              Quản lý người dùng
            </Active>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <Active to="/managepost" className="card bg-info text-white shadow w-100 btn-card">
              Quản lý bài đăng
            </Active>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <Active to="/managebanner" className="card bg-success text-white shadow w-100 btn-card">
              Quản lý banner
            </Active>
          </div>
          {/* Pending Requests Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <Active to="/managereport" className="card bg-danger text-white shadow w-100 btn-card">
              Quản lý phản hồi
            </Active>
          </div>
       
                    
        </div>

        <HighchartsReact highcharts={Highcharts} options={this.state.options} />

        <div className="row">
       
        <MapAdminComponent/>
          </div>
      
       
        {/* <FooterAdmin /> */}
      </div>
    );
  }
}
