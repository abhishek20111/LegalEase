import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    name: '',
    role: '',
    email: '',
    id : '',
    token: localStorage.getItem('token') || '',
    details: [],
    loading: false,
    isLogin: false,
};

const extractUserInfoFromToken = (token)=>{
    try{
        const decodeToken = jwtDecode(token);
        return { 
            name: decodeToken.name,
            role: decodeToken.role,
            email: decodeToken.email,
            id: decodeToken.id
        }
    }catch(error){
        return{
            name:'',
            role:'',
            email:'',
            id:''
        }
    }
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
      addName: (state, action) => {
        state.name = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      updateRole: (state, action) => {
        state.role = action.payload;
      },
      updateId: (state, action) => {
        state.id = action.payload;
      },
      updateToken: (state, action) => {
        state.token = action.payload ;
        const { name, role, email, id } = extractUserInfoFromToken(action.payload);
        state.name = name;
        state.role = role;
        state.email = email;
        state.id = id;
        state.isLogin = true;
      },
      addDetail: (state, action) => {
        state.details.push(action.payload);
      },
      removeDetail: (state, action) => {
        const index = state.details.findIndex(
          (detail) => detail.id === action.payload
        );
        if (index !== -1) {
          state.details.splice(index, 1);
        }
      },
      setIsLogin: (state, action) => {
        state.isLogin = action.payload;
      },
      resetState: () => initialState,
    },
  });
  
  export const {
    addName,
    setLoading,
    updateRole,
    updateId,
    updateToken,
    addDetail,
    removeDetail,
    setIsLogin,
    resetState,
  } = userSlice.actions;
  
  export const selectLoading = (state) => state.userData.loading;
  export const selectIsLogin = (state) => state.userData.isLogin;
  
  export default userSlice.reducer;