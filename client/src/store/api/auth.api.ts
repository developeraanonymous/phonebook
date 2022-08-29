import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { CurrentTimeZone } from '../@types/interfaces';

// interface Zone {
// 	zones: string[]
// 	zone: string
// }

export const authApi = createApi({
	reducerPath: 'api/auth',
	// Произвольное название в tagTypes
	// tagTypes: ['allZones', 'currentZone'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/register',
	}),
	endpoints: (build) => ({
		getTimeZones: build.query({
			query: () => `timezone`,
			// providesTags: ['allZones'],
			// С чем мы работаем вообще
		}),
		getTimeZone: build.query({
			query: (zone) => `timezone/${zone}`,
			// Работает с этим тегом
			// providesTags: (result) => ['currentZone'],
			// С чем мы работаем вообще
		}),
		// getCurrentTime: build.mutation({
		// 	query: (note) => ({
		// 		url: `timezone/${note}`,
		// 		method: 'POST',
		// 		body: note,
		// 	}),
		// Говорит о том, что эти данные становятся неактульны и сделать новый запрос после добавления
		// invalidatesTags: (result, error, id) => [
		// 	{ type: 'currentZone', id },
		// ],
		// 		// // Pick out data and prevent nested properties in a hook or selector
		// 		// transformResponse: (response) => response.data,
		// 		// // `result` is the server response
		// 		// // trigger side effects or optimistic updates
		// 		// onQueryStarted(
		// 		// 	id,
		// 		// 	{
		// 		// 		dispatch,
		// 		// 		getState,
		// 		// 		extra,
		// 		// 		requestId,
		// 		// 		queryFulfilled,
		// 		// 		getCacheEntry,
		// 		// 	},
		// 		// ) {},
		// 		// // handle subscriptions etc
		// 		// onCacheEntryAdded(
		// 		// 	id,
		// 		// 	{
		// 		// 		dispatch,
		// 		// 		getState,
		// 		// 		extra,
		// 		// 		requestId,
		// 		// 		cacheEntryRemoved,
		// 		// 		cacheDataLoaded,
		// 		// 		getCacheEntry,
		// 		// 	},
		// 		// ) {},
		// }),
	}),
});

// export const {
// 	useGetTimeZonesQuery,
// 	useGetTimeZoneQuery,
// 	// useGetCurrentTimeMutation,
// } = timeZonesApi;
