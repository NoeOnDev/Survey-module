import passport from "passport";

export function googleAuth(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
}

export function googleAuthCallback(req, res, next) {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:5173/");
      });
    }
  )(req, res, next);
}