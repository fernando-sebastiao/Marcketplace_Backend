import { Router } from "express";
import { signIn } from "./SessionController";
import {
  acessDelete,
  createAcess,
  getallAcess,
} from "./controller/AcessController";
import { createProduct, getallProducts } from "./controller/ProductController";
import {
  DeleteAllStores,
  DeleteStore,
  createStore,
  getallStore,
} from "./controller/StoreController";
import {
  DeleteAllUser,
  DeleteUser,
  UpdateUser,
  createUser,
  getallUser,
} from "./controller/UserController";
import { authMiddleware } from "./middlewares/AuthMiddleware";

export const router = Router();

router.post("/users", createUser);
router.get("/users", authMiddleware(["adm"]), getallUser);
router.delete("/users", authMiddleware(["adm"]), DeleteAllUser);
router.delete("/users/:id", authMiddleware(["adm"]), DeleteUser);
router.put("/user-update/:id", authMiddleware(["Comprador"]), UpdateUser);

router.post("/acess", authMiddleware(["SuperManager"]), createAcess);
router.get("/acesses", authMiddleware(["SuperManager"]), getallAcess);
router.delete("/delete-acess", authMiddleware(["SuperManager"]), acessDelete);

router.post("/store/:userId", authMiddleware(["SuperManager"]), createStore);
router.get("/stores", authMiddleware(["SuperManager"]), getallStore);
router.delete("/store/:id", authMiddleware(["SuperManager"]), DeleteStore);
router.delete("/stores", authMiddleware(["SuperManager"]), DeleteAllStores);

router.post("/product/:storeId", authMiddleware(["adm"]), createProduct);
router.get("/product", authMiddleware(["adm"]), getallProducts);

//make authenticate//
router.post("/sign-in", signIn);
