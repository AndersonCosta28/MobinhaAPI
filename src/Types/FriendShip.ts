export enum TypeOfFriendShip {
  requested,
  friend,
  blocked,
}

export type BodyRequestCreate = {
  SourceId: number;
  TargetName: string;
};

export type BodyRequestFindAllByUser = {
  UserId: number;
};

export type BodyRequestReactToFriendRequest = {
  UserId: number;
  FriendId: number;
  React: boolean;
};
