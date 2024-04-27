class CookieHelper {
  setTokenCookie(res, token) {
    res.cookie("Auth_Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  }
}

export default CookieHelper;
