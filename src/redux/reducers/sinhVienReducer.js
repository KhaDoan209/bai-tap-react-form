const initialState = {
   mangSinhVien: [
      {
         maSV: '0001',
         hoTen: 'Vinh Kha',
         sdt: '012345678',
         email: 'tonhanhgia@gmail.com',
      },
      {
         maSV: '0002',
         hoTen: 'Duy Hy',
         sdt: '987654321',
         email: 'giahanhton@gmail.com',
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
   mangTimKiem: [],
   mangReset: [],
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
         return { ...state };
      case 'TIM':
         state.mangReset = [];
         state.mangTimKiem = [];
         state.mangSinhVien.map((item) => {
            let nameSearch = item.hoTen.replace(/\s+/g, '').toLowerCase();
            if (nameSearch.match(action.nameToSearch)) {
               state.mangTimKiem.push(item);
            }
         });
         state.mangReset = state.mangSinhVien;
         state.mangSinhVien = state.mangTimKiem;
         return { ...state };
      case 'XEM_HET':
         state.mangTimKiem = [];
         state.mangSinhVien = state.mangReset;
         return { ...state };
      default:
         return state;
   }
};
