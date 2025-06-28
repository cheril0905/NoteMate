import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}


export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    resetAllPastes: (state,action) => {
      state.pastes=[];
      localStorage.removeItem(pastes);
     
    },
    addToPastes: (state,action) => {
      const paste=action.payload;

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));


      toast.success("Paste created successfully")
    },


    updateToPastes: (state, action) => {
      const paste = action.payload;

      // 🔍 Find index of the paste to update using _id
      const index = state.pastes.findIndex(item => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      } else {
        toast.error("Paste does not exist");
      }
    },


    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);

      // Find index of the paste with matching _id
      const index = state.pastes.findIndex(item => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Deleted successfully");
      } else {
        toast.error("Paste not found");
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToPastes,  updateToPastes,resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer