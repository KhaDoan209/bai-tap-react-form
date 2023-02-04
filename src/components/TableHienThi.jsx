import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableHienThi extends Component {
   state = {
      nameToSearch: '',
   };

   handleSearchInput = (event) => {
      let { name, value } = event.target;
      let nameToSearch = { ...this.state.nameToSearch };
      nameToSearch[name] = value.trim().replace(/\s+/g, '').toLowerCase();
      this.setState({
         nameToSearch: nameToSearch[name],
      });
   };

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
            <div className='d-flex justify-content-between mt-4'>
               <form className='form-inline mt-2 my-lg-0'>
                  <input
                     name='search'
                     className='form-control mr-sm-2'
                     type='search'
                     placeholder='Search by name'
                     onChange={this.handleSearchInput}
                  />
                  <button
                     className='btn btn-outline-success my-2 my-sm-0'
                     type='submit'
                     onClick={(event) => {
                        event.preventDefault();
                        if (this.state.nameToSearch === '') {
                           alert('Please type in name to search');
                        } else {
                           let action = {
                              type: 'TIM',
                              nameToSearch: this.state.nameToSearch,
                           };
                           this.props.dispatch(action);
                        }
                     }}
                  >
                     <i className='fa-solid fa-magnifying-glass'></i>
                  </button>
               </form>
               <button
                  onClick={() => {
                     let action = {
                        type: 'XEM_HET',
                     };
                     this.props.dispatch(action);
                  }}
                  className='btn btn-dark'
               >
                  View All
               </button>
            </div>

            <table className='table mt-3'>
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
