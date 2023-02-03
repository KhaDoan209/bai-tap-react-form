import React, { Component } from 'react';
import FormDangKy from './FormDangKy';
import TableHienThi from './TableHienThi';

export default class BTForm extends Component {
   render() {
      return (
         <div className='container'>
            <FormDangKy />
            <TableHienThi />
         </div>
      );
   }
}
