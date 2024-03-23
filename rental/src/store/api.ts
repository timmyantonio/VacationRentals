import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IBooking } from "./../../../server/src/types/Booking";

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
  }),
});
export const { useBookingsQuery } = api;
