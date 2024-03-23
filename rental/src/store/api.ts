import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IBooking } from "../types/Booking";
import { IGuest } from "../types/Guest";
import { IUnit } from "../types/Unit";

export const api = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["Bookings", "Units"],
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
    units: build.query<IUnit[], void>({
      query: () => "/units",
      providesTags: ["Units"],
    }),
    newGuest: build.mutation<{ guestId: string; message: string }, IGuest>({
      query: (payload) => ({
        url: "/guests",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
export const {
  useBookingsQuery,
  useNewBookingMutation,
  useUnitsQuery,
  useNewGuestMutation,
} = api;
