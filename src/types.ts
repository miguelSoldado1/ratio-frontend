export interface User {
  id: string;
  displayName: string;
  imageUrl: string;
}

export interface UserRatings {
  data: PersonalRating[];
  next: string | null;
}

export interface FollowingRatings {
  data: FeedRating;
  next: string | null;
}

export interface PersonalRating {
  _id: string;
  user_id: string;
  album_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  liked_by_user: boolean;
  album: Album;
}

export interface FeedRating extends PersonalRating {
  user: User;
}

export interface Album {
  name: string;
  album_uri: string;
  artist: Artist[];
  artist_id: string;
  id: string;
  release_date: string;
  image: string;
  release_date_precision: string;
}

export interface DetailedAlbum {
  name: string;
  album_uri: string;
  artist: Artist[];
  artist_id: string;
  id: string;
  release_date: string;
  image: string | null;
  release_date_precision: "year" | "month" | "day";
  tracks?: Track[];
}

export interface Track {
  id: string;
  name: string;
  trackNumber: number;
  artists: Artist[];
  track_url: string;
  duration_ms: number;
  explicit: boolean;
}

export interface FollowingInfo {
  isFollowing: boolean;
  followers: number;
  following: number;
  numberOfPosts: number;
}

export interface Artist {
  name: string;
  uri: string;
  id: string;
}

export interface AlbumRating {
  profile: User;
  album_id: string;
  comment: string;
  rating: number;
  createdAt: string;
  likes: number;
  liked_by_user: boolean;
  _id: string;
}

export interface CommunityAlbumRatings {
  next: string | null;
  previous: string | null;
  ratings: AlbumRating[];
}

export interface LikeMutationResult {
  message: string;
  numberOfLikes: number;
}

export interface ModalUser {
  createdAt: string;
  isFollowing: boolean;
  _id: string;
  profile: User;
}

export interface ListModal {
  users: ModalUser[];
  next: string | null;
}

export interface RailResponse {
  data?: Album[];
  description: string;
}
