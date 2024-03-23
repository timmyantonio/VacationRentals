import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IBooking } from "../types/Booking";

export const api = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["Bookings"],
  endpoints: (build) => ({
    bookings: build.query<IBooking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),
    newBooking: build.mutation<
      { bookingId: string; message: string },
      IBooking
    >({
      query: (payload) => ({
        url: "/bookings",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});
export const { useBookingsQuery, useNewBookingMutation } = api;
