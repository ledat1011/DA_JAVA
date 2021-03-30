// class TabsChange extends React.Component {
//     constructor(props) {
//       super();
//       this.state = {
//         active: 0,
//       };
//     }
  
//     select = (i) => {
//       this.setState({
//         active: i,
//       });
//     };
  
//     renderTabs = () => {
//       return React.Children.map(this.props.children, (item, i) => {
//         if (i % 2 === 0) {
//           let _active = this.state.active === i ? "active" : null;
//           return (
//             <a onClick={(i) => this.select(i)} className={`${_active}`}>
//               {item}
//             </a>
//           );
//         }
//       });
//     };
  
//     renderContents = () => {
//       return React.Children.map(this.props.children, (item, i) => {
//         if (i - 1 === this.state.active) {
//           return (
//             <div>
//               <div className="col-md-8">{item}</div>
//             </div>
//           );
//         } else {
//           return;
//         }
//       });
//     };
  
//     render() {
//       return (
//         <div>
//           <ul className="list-vertical">
//             <li>{this.renderTabs(4)}</li>
//           </ul>
  
//           {this.renderContents}
//           {/* <ul className="list-vertical" style={{ float: "left" }}>
//             <li></li>
//           </ul> */}
//         </div>
//       );
//     }
//   }
  