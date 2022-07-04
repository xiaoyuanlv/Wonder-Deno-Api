import { Router } from "https://deno.land/x/oak/mod.ts";
import { addWonder, getAllWonders, getWonder, removeWonder, updateWonder } from "./controller/wonder.ts";

const router = new Router();

router.get('/wonders', getAllWonders)
.get("/wonders/:id", getWonder)
.post("/wonders", addWonder)
.put("/wonders/:id", updateWonder)
.delete("/wonders/:id", removeWonder)

export default router;