export enum TypeOfFriendship {
  requested,
  friend,
  blocked,
}

export type CreateBodyRequest = {
  SourceId: number;
  TargetName: string;
};

export type FindAllByUserBodyRequest = {
  UserId: number;
};

export type ReactToFriendRequestBodyRequest = {
  UserId: number;
  FriendshipId: number;
  React: boolean;
};
