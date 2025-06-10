export interface UpdatedUserInfo {
  email: string;
  name: string;
  phone: string;
  surname: string;
}

export interface UserProfile {
  block_expiration: string;
  created_at: string;
  email: string;
  is_blocked: boolean;
  is_deleted: boolean;
  name: string;
  phone: string;
  surname: string;
  updated_at: string;
  user_id: number;
  user_role: string;
  username: string;
}

export interface UserState {
  userProfile: null | UserProfile;
}
