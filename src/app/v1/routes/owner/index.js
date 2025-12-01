const express = require("express");
const asyncHandlerUtils = require("../../../../utils/asyncHandler.utils");
const ownerControllers = require("../../controllers/owner.controllers");
const AuthMiddlewares = require("../../../../middlewares/auth.middlewares");
const RBACMiddlewares = require("../../../../middlewares/rbac.middlewares");
const router = express.Router();

//* Method: POST
/**
 * @openapi
 * /auth/bootstrap:
 *   post:
 *     summary: Bootstrap owner account
 *     description: |
 *       Tạo tài khoản Owner (chủ hệ thống / chủ cửa hàng) lần đầu.
 *       - Yêu cầu đã đăng nhập và có quyền phù hợp (RBAC).
 *       - Nếu Owner đã tồn tại hoặc email đã được sử dụng sẽ trả về lỗi.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []   # AuthMiddlewares.verifyAccessToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: owner@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Tai123@@
 *     responses:
 *       200:
 *         description: Owner account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-12-01T05:28:01.902Z
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Owner account created successfully.
 *                     owner:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: b6e0e964-bce0-4ef9-93bc-e74d289560dc
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: tai@gmail.com
 *                 options:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Validation error or owner/email already exists
 */
router.post(
  "/bootstrap",
  AuthMiddlewares.verifyAccessToken,
  RBACMiddlewares.requirePermission(),
  asyncHandlerUtils(ownerControllers.bootstrapOwner)
);

module.exports = router;
