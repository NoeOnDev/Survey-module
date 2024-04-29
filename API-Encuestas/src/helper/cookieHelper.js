class CookieHelper {
  setTokenCookie(res, token) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneWeek);

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: expirationDate,
    });
  }
}

export default CookieHelper;
