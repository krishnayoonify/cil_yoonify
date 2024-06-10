export const updateAnyUserState = (data) => ({
  type: "UPDATE_ANY_USER_STATE",
  payload: data,
});

export const loginUser = (data) => ({
  type: "LOGIN_USER",
  payload: { data },
});

export const loginUserSuccess = (data) => ({
  type: "LOGIN_USER_SUCCESS",
  payload: { data },
});

export const loginUserFailure = (error) => ({
  type: "LOGIN_USER_FAILURE",
  payload: { error },
});
