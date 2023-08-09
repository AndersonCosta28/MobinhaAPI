import Profile from "Profile/Profile.entity"

export enum TypeOfFriendship {
  "Requested",
  "Friend",
  "Blocked",
  "Removed"
}

export enum FriendshipRequestType { Sent, Received }

export interface ICreateBodyRequest {
  ProfileSourceId: number
  ProfileTargetName: string
}

export interface IFindAllByUserBodyRequest {
  ProfileId: number
}

export type IReactToFriendRequestBodyRequest = {
  ProfileId: number
  FriendshipId: number
  React: boolean
}

export interface IMessage {
  FriendshipId: number
  FromId: number
  ToId: number
  Message: string
  Id: number
}

export interface IFriend {
  FriendshipId: number
  FriendProfile: Profile
  Type: TypeOfFriendship | string
  FriendshipRequestType: FriendshipRequestType,
}