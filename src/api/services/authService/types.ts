/* #region SignIn */
export interface SignInParams {
  identifier: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}
/* #endregion */

/* #region SignUp */
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse extends MessageResponse {
  userId: string;
  name: string;
  email: string;
  role: string;
}
/* #endregion */

/* #region VerifyEmail */
export interface VerifyEmailParams {
  email: string;
  code: string;
}

export interface VerifyEmailResponse extends MessageResponse {}
/* #endregion */

/* #region ForgotPassword */
export interface ForgotPasswordParams {
  email: string;
}

export interface ForgotPasswordResponse extends MessageResponse {}
/* #endregion */

/* #region ConfirmForgotPassword */
export interface ConfirmForgotPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

export interface ConfirmForgotPasswordResponse extends MessageResponse {}
/* #endregion */

/* #region ResendCode */
export interface ResendCodeParams {
  email: string;
}

export interface ResendCodeResponse extends MessageResponse {}
/* #endregion */
