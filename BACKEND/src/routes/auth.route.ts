import {Hono} from "hono";
import {register_user, login_user, logout_user} from "@/controller/auth.controller";

const auth_routes = new Hono();

auth_routes.post("/register", register_user);
auth_routes.post("/login", login_user   );
auth_routes.post("/logout", logout_user);

export default auth_routes;