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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/users", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/users", authMiddleware(["adm"]), getallUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users deleted
 */
router.delete("/users", authMiddleware(["adm"]), DeleteAllUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/users/:id", authMiddleware(["adm"]), DeleteUser);

/**
 * @swagger
 * /user-update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/user-update/:id", authMiddleware(["Comprador"]), UpdateUser);

/**
 * @swagger
 * /acess:
 *   post:
 *     summary: Create a new access
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Access created successfully
 */
router.post("/acess", authMiddleware(["SuperManager"]), createAcess);

/**
 * @swagger
 * /acesses:
 *   get:
 *     summary: Get all accesses
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: A list of accesses
 */
router.get("/acesses", authMiddleware(["SuperManager"]), getallAcess);

/**
 * @swagger
 * /delete-acess:
 *   delete:
 *     summary: Delete an access
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Access deleted
 */
router.delete("/delete-acess", authMiddleware(["SuperManager"]), acessDelete);

/**
 * @swagger
 * /store/{userId}:
 *   post:
 *     summary: Create a new store for a user
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Store created successfully
 */
router.post("/store/:userId", authMiddleware(["SuperManager"]), createStore);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Store]
 *     responses:
 *       200:
 *         description: A list of stores
 */
router.get("/stores", authMiddleware(["SuperManager"]), getallStore);

/**
 * @swagger
 * /store/{id}:
 *   delete:
 *     summary: Delete a store by ID
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The store ID
 *     responses:
 *       200:
 *         description: Store deleted
 */
router.delete("/store/:id", authMiddleware(["SuperManager"]), DeleteStore);

/**
 * @swagger
 * /stores:
 *   delete:
 *     summary: Delete all stores
 *     tags: [Store]
 *     responses:
 *       200:
 *         description: All stores deleted
 */
router.delete("/stores", authMiddleware(["SuperManager"]), DeleteAllStores);

/**
 * @swagger
 * /product/{storeId}:
 *   post:
 *     summary: Create a new product for a store
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The store ID
 *     responses:
 *       200:
 *         description: Product created successfully
 */
router.post("/product/:storeId", authMiddleware(["adm"]), createProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get("/product", authMiddleware(["adm"]), getallProducts);

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Sign in
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
router.post("/sign-in", signIn);
