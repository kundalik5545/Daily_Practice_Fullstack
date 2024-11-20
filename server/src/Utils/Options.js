const logoutOptions = {
  httpOnly: true,
  secure: "",
};

if ((process.env.ENV = "Prod")) {
  logoutOptions.secure = true;
} else {
  logoutOptions.secure = false;
}

const accessTokenOptions = {
  httpOnly: true,
  // secure: "",
  expires: process.env.ACCESS_TOKEN_EXPIRY,
};

// if ((process.env.ENV = "Prod")) {
//   accessTokenOptions.secure = true;
// } else {
//   accessTokenOptions.secure = false;
// }

const refreshTokenOptions = {
  httpOnly: true,
  secure: "",
  expires: new Date(
    Date.now() + process.env.REFRESH_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
  ),
};

if ((process.env.ENV = "Prod")) {
  refreshTokenOptions.secure = true;
} else {
  refreshTokenOptions.secure = false;
}

/*
 Notes:-
   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
   sameSite: "none",  Adjust if needed based on your setup
   path: "/",  Make sure the path is root
*/
export { logoutOptions, accessTokenOptions, refreshTokenOptions };
