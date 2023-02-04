import React, { Component } from 'react';
import { connect } from 'react-redux';

class FormDangKy extends Component {
   state = {
      values: {
         maSV: '',
         hoTen: '',
         sdt: '',
         email: '',
      },
      errors: {
         maSV: '',
         hoTen: '',
         sdt: '',
         email: '',
      },
   };

   handleOnChange = (event) => {
      let { name, value } = event.target;
      let newValues = { ...this.state.values };
      newValues[name] = value;

      let typeform = event.target.getAttribute('typeform');
      let messageError = '';
      if (value.trim() === '') {
         messageError = `${name} không được để trống`;
      }
      let regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (typeform == 'email') {
         if (!regexp.test(value)) {
            messageError = `Email không đúng định dạng`;
         }
      }
      let newErrors = { ...this.state.errors };
      newErrors[name] = messageError;

      this.setState(
         {
            values: newValues,
            errors: newErrors,
         },
         () => {
            console.log(this.state);
         }
      );
   };

   handleOnSubmit = (event) => {
      event.preventDefault();

      let isValid = true;

      for (const property in this.state.errors) {
         if (this.state.errors[property] !== '') {
            isValid = false;
         }
      }

      for (const property in this.state.values) {
         if (this.state.values[property] === '') {
            isValid = false;
         }
      }
      this.props.mangSinhVien.map((item) => {
         if (this.state.values.maSV === item.maSV) {
            isValid = false;
         }
      });

      if (isValid) {
         let action = {
            type: 'THEM',
            sv: this.state.values,
         };
         this.props.dispatch(action);
      } else {
         alert('Vui lòng kiểm tra lại form');
      }
   };

   componentWillReceiveProps(newProps) {
      this.setState({
         values: newProps.sinhVien,
      });
   }
   render() {
      let { maSV, hoTen, sdt, email } = this.state.values;
      return (
         <div>
            <h2 className='text-center text-white bg-dark mt-3'>
               Thông Tin Sinh Viên
            </h2>
            <form onSubmit={this.resetForm}>
               <div className='row'>
                  <div className='col-6'>
                     <div className='form-group'>
                        <label htmlFor='maSV'>Mã SV</label>
                        <input
                           onChange={this.handleOnChange}
                           typeform='text'
                           className='form-control'
                           name='maSV'
                           value={maSV}
                        />
                        <p className='text-danger'>{this.state.errors.maSV}</p>
                     </div>
                  </div>
                  <div className='col-6'>
                     <div className='form-group'>
                        <label htmlFor='hoTen'>Họ Tên</label>
                        <input
                           onChange={this.handleOnChange}
                           typeform='text'
                           className='form-control'
                           name='hoTen'
                           value={hoTen}
                        />
                        <p className='text-danger'>{this.state.errors.hoTen}</p>
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-6'>
                     <div className='form-group'>
                        <label htmlFor='sdt'>Số điện thoại</label>
                        <input
                           onChange={this.handleOnChange}
                           type='number'
                           typeform='number'
                           className='form-control'
                           name='sdt'
                           value={sdt}
                        />
                        <p className='text-danger'>{this.state.errors.sdt}</p>
                     </div>
                  </div>
                  <div className='col-6'>
                     <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                           onChange={this.handleOnChange}
                           typeform='email'
                           className='form-control'
                           name='email'
                           value={email}
                        />
                        <p className='text-danger'>{this.state.errors.email}</p>
                     </div>
                  </div>
               </div>
               <div className='row justify-content-end'>
                  <button
                     type='submit'
                     className='btn btn-primary mr-3'
                     onClick={this.handleOnSubmit}
                  >
                     <i className='fa-solid fa-user-plus'></i>
                  </button>
                  <button
                     onClick={() => {
                        let action = {
                           type: 'SUA',
                           svSua: this.state,
                        };
                        this.props.dispatch(action);
                     }}
                     type='submit'
                     className='btn btn-warning mr-3'
                  >
                     Edit
                  </button>
               </div>
            </form>
         </div>
      );
   }
}

let mapStateToProps = (rootReducer) => {
   return {
      sinhVien: rootReducer.sinhVienReducer.sinhVien.values,
      mangSinhVien: rootReducer.sinhVienReducer.mangSinhVien,
   };
};
export default connect(mapStateToProps)(FormDangKy);
