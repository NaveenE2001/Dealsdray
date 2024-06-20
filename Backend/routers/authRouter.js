import express from "express";
import {
  LoginControler,
  SigninControler,
} from "../controlers/AuthControler.js";

const route = express.Router();

route.post("/sigup", SigninControler);

route.post("/login", LoginControler);

export default route;
