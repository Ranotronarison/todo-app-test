export default {
  signIn: function (currentUser, userList) {
    const exists = userList.filter(
      user => user.username === currentUser.username &&
      user.password === currentUser.password
    ).length > 0
    return { exists, username: currentUser.username }
  }
}
