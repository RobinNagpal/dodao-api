export function isSuperAdmin(user: string) {
  const isWhiteListedAdmin = !!process.env.DODAO_WHITELISTED_ADMINS?.split(',')
    .map((admin) => admin.toLowerCase())
    .includes(user);

  const isBlacklistedAdmin = process.env.DODAO_BLACKLISTED_ADMINS?.split(',')
    .map((admin) => admin.toLowerCase())
    .includes(user);

  return isWhiteListedAdmin && !isBlacklistedAdmin;
}
