import express from "express";
import cors from "cors";
import morgan from "morgan";

export default function appConfig(app) {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
}