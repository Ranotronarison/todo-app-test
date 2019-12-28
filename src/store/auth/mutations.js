export function updateUserInfo (state, { isConnected, username }) {
  state.isConnected = isConnected
  state.user = { username }
}
