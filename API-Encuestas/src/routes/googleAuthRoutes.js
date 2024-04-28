import { Router } from "express";

function createGoogleAuthRoutes(googleAuthController) {
  const router = Router();

  router.get("/auth/google", googleAuthController.authenticate);
  router.get("/auth/google/callback", googleAuthController.callback);

  return router;
}

export default createGoogleAuthRoutes;
