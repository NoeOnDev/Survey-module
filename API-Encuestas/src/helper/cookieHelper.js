class CookieHelper {
  setTokenCookie(res, token) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneWeek);

    res.cookie("Auth_Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: expirationDate,
    });
  }
}

export default CookieHelper;