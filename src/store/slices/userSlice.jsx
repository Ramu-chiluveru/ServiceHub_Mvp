// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  mandal: "",
  village: "",
  district: "",
  pincode: "",
  state: "",
  status: "",       // "active", "inactive", "suspended"
  imageUrl: "",
  createdAt: "",
  updatedAt: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => { state.email = action.payload; },
    setFirstName: (state, action) => { state.firstName = action.payload; },
    setLastName: (state, action) => { state.lastName = action.payload; },
    setPhone: (state, action) => { state.phone = action.payload; },
    setStreet: (state, action) => { state.street = action.payload; },
    setMandal: (state, action) => { state.mandal = action.payload; },
    setVillage: (state, action) => { state.village = action.payload; },
    setDistrict: (state, action) => { state.district = action.payload; },
    setPincode: (state, action) => { state.pincode = action.payload; },
    setState: (state, action) => { state.state = action.payload; },
    setImageUrl: (state, action) => { state.imageUrl = action.payload; },
    setCreatedAt: (state, action) => { state.createdAt = action.payload; },
    setUpdatedAt: (state, action) => { state.updatedAt = action.payload; },
    setStatus: (state, action) => {
      const validStatus = ['active', 'inactive', 'suspended'];
      if (validStatus.includes(action.payload)) {
        state.status = action.payload;
      }
    },
    resetUser: () => initialState
  }
});

export const {
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
  setStreet,
  setMandal,
  setVillage,
  setDistrict,
  setPincode,
  setState,
  setImageUrl,
  setCreatedAt,
  setUpdatedAt,
  setStatus,
  resetUser
} = userSlice.actions;

export default userSlice.reducer;
