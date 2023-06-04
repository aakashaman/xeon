'use client';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from './userSlice';

const initialState = {
  contact: null,
  loading: false,
  error: null,
};

export const addContact = createAsyncThunk(
  'contact/add',
  async (contactData, thunkAPI) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userId: contactData.userId,
          userPassword: contactData.userPassword,
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          address: contactData.address,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        thunkAPI.dispatch(loginUser(JSON.parse(localStorage.getItem('user'))));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contact/update',
  async (contactData, thunkAPI) => {
    try {
      const response = await fetch(`/api/contact/${contactData.contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          userId: contactData.userId,
          userPassword: contactData.userPassword,
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          address: contactData.address,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (contactData, thunkAPI) => {
    try {
      const response = await fetch(`/api/contact/${contactData.contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          userId: contactData.userId,
          userPassword: contactData.userPassword,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addContact.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateContact.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(updateContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteContact.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
