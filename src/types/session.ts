export interface DoDaoJwtTokenPayload {
  spaceId: string;
  userId: string;
  username: string;
  accountId: string;
  isAdminOfSpace?: boolean;
  isSuperAdminOfDoDAO?: boolean;
}
