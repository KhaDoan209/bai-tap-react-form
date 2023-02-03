import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableHienThi extends Component {
   renderTable = () => {
      let stt = 0;
      return this.props.mangSinhVien.map((item) => {
         stt++;
         return (
            <tbody key={stt}>
               <tr>
                  <th scope='row'>{item.maSV}</th>
                  <td>{item.hoTen}</td>
                  <td>{item.sdt}</td>
                  <td>{item.email}</td>
                  <td>
                     <button
                        onClick={() => {
                           let action = {
                              type: 'XEM',
                              sv: item,
                           };
                           this.props.dispatch(action);
                        }}
                        type='button'
                        className='btn btn-primary mr-3'
                     >
                        Xem
                     </button>

                     <button
                        onClick={() => {
                           let action = {
                              type: 'XOA',
                              maSV: item.maSV,
                           };
                           this.props.dispatch(action);
                        }}
                        className='btn btn-danger'
                     >
                        Xóa
                     </button>
                  </td>
               </tr>
            </tbody>
         );
      });
   };

   render() {
      return (
         <div>
            <table className='table mt-5'>
               <thead className='thead-dark'>
                  <tr>
                     <th scope='col'>Mã SV</th>
                     <th scope='col'>Họ Tên</th>
                     <th scope='col'>Số điện thoại</th>
                     <th scope='col'>Email</th>
                     <th scope='col'>Thao tác</th>
                  </tr>
               </thead>
               {this.renderTable()}
            </table>
         </div>
      );
   }
}
const mapStateToProps = (rootReducer) => {
   return {
      mangSinhVien: rootReducer.sinhVienReducer.mangSinhVien,
   };
};

export default connect(mapStateToProps)(TableHienThi);
