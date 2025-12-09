import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  metadata: {
    blockTimestamp: string;
  };
  value: number;
  usdValue?: number;
  asset: string;
  chainName: string;
  blockNum: string;
}

interface UserState {
  username: string;
  address: string;
  additionalGameCustomization: any;
  shouldSignAfterConnect: boolean;
  profileImage: string; 
  transactions: Transaction[]
}

const initialState: UserState = {
  username: "",
  address: "",
  additionalGameCustomization: null,
  shouldSignAfterConnect: false,
  profileImage: "", 
  transactions: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(
      state,
      action: PayloadAction<{ username: string; address: string }>
    ) {
      state.username = action.payload.username;
      state.address = action.payload.address;
    },
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setAdditionalGameCustomizatiom(state, action: PayloadAction<any>) {
      state.additionalGameCustomization = action.payload;
    },
    setShouldSignAfterConnect(state, action: PayloadAction<boolean>) {
      state.shouldSignAfterConnect = action.payload;
    },
    updateProfileImage(state, action: PayloadAction<string>) {
      state.profileImage = action.payload; 
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
  },
});

export const {
  setUserData,
  updateUsername,
  updateAddress,
  setAdditionalGameCustomizatiom,
  setShouldSignAfterConnect,
  updateProfileImage, 
  setTransactions,
} = userSlice.actions;

export default userSlice.reducer;

