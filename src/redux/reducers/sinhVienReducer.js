const initialState = {
   mangSinhVien: [
      {
         maSV: '0001',
         hoTen: 'Doan Kha',
         sdt: '012345678',
         email: 'doanvinhkha@gmail.com',
      },
   ],
   sinhVien: {
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
   },
};

export const sinhVienReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'THEM':
         state.mangSinhVien = [...state.mangSinhVien, action.sv];
         return { ...state };
      case 'XOA':
         state.mangSinhVien = state.mangSinhVien.filter((item) => {
            return item.maSV !== action.maSV;
         });
         return { ...state };
      case 'XEM':
         state.sinhVien.values = { ...action.sv };
         return { ...state };
      case 'SUA':
         let indexCapNhat = state.mangSinhVien.findIndex((sv) => {
            return sv.maSV === action.svSua.values.maSV;
         });

         if (indexCapNhat > -1) {
            state.mangSinhVien[indexCapNhat] = action.svSua.values;
         }
         state.mangSinhVien = [...state.mangSinhVien];
         console.log(state.mangSinhVien);

         return { ...state };
      default:
         return state;
   }
};
