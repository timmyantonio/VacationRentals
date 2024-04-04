import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IBooking } from "../types/Booking";
import { IGuest } from "../types/Guest";
import { IUnit } from "../types/Unit";

export const api = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["Bookings", "Units", "Guests"],
  endpoints: (build) => ({
    bookings: build.query<IBooking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),
    guests: build.query<IGuest[], void>({
      query: () => "/guests",
      providesTags: ["Guests"],
    }),
    guestByMobileNumber: build.query<IGuest, string>({
      query: (mobile) => `/guests/mobile/${mobile}`,
    }),
    getUnitsByDescriptionAndStatus: build.query<
      IUnit[],
      { description: string; status: string }
    >({
      query: ({ description, status }) => {
        return {
          url: "units/",
          params: { description, status },
        };
      },
      providesTags: ["Units"],
    }),
    // guestByMobileParams: build.query<IGuest, { mobile: string }>({
    //   query: ({ mobile }) => {
    //     return {
    //       url: "guests/",
    //       params: { mobile },
    //     };
    //   },
    //   providesTags: ["Guests"],
    // }),
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
      invalidatesTags: ["Guests"],
    }),
  }),
});
export const {
  useBookingsQuery,
  useNewBookingMutation,
  useUnitsQuery,
  useNewGuestMutation,
  useGuestByMobileNumberQuery,
  useGuestsQuery,
  useGetUnitsByDescriptionAndStatusQuery,
} = api;
