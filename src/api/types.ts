import { FilterQueries, RailTitles } from "@/enums";

// Section 1: ProfileScreen
export interface GetUserProfileParams {
  userId?: string;
}

export interface FollowMutationParams {
  followingId?: string;
}

export interface GetFollowingInfoParams {
  followingId?: string;
}

// userId may be undefined here because of the useParams hook, see if there's a solution for this
export interface GetUserRatingsParams {
  userId?: string;
  next?: string;
  filter: FilterQueries;
}

export interface GetUserProfile {
  userId?: string;
}

export interface GetUserFollowingParams {
  userId?: string;
  next?: string;
}

export interface GetUserFollowersParams {
  userId?: string;
  next?: string;
}

// Section 2: AlbumDetails

//artistId may be undefined here because of the useParams hook, see if there's a solution for this
export interface GetRelatedAlbumsParams {
  albumId?: string;
  artistId?: string;
}

export interface GetAverageAlbumRatingParams {
  albumId?: string;
}

export interface GetPersonalRatingParams {
  albumId?: string;
  userId?: string;
}

export interface GetCommunityAlbumRatingsParams {
  albumId?: string;
  filter: string;
  next?: string;
  previous?: string;
}

export interface GetUsersProfileParams {
  userId: string;
}

export interface GetPostLikesParams {
  postId: string;
  next?: string;
}

export interface LikeMutationParams {
  ratingId: string;
}

export interface DeleteRatingParams {
  ratingId: string;
}

export interface GetAlbumParams {
  albumId?: string;
}

export interface CreateRatingParams {
  album_id: string;
  rating: number;
  comment: string;
}

// Section 2: HomeScreen

export interface GetFollowingRatingsParams {
  next?: string;
}

export interface GetRailsParams {
  railKey: keyof typeof RailTitles;
}

// Section 2: NavigationBar
export interface SearchForAlbumParams {
  searchQuery: string;
}
