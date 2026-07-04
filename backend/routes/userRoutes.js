const router = require("express").Router();
const ctrl = require("../controllers/userController");

router.get("/:id", ctrl.getUser);
router.put("/:id", ctrl.updateUser);
router.put("/password/:id", ctrl.changePassword);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;