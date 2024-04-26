class CookieHelper {
    setSecureCookie(res, name, value) {
      res.cookie(name, value, { httpOnly: true, secure: true });
    }
  }
  
  export default CookieHelper;