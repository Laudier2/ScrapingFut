import { Router } from "express";
import { ControllerFind } from "../controllers/FindScraping";
import { ControllerPost } from "../controllers/PostScraping";
import { controllerDelete, controllerDeleteTodos } from "../controllers/DelScraping";


const router = Router();//

/* ============================== OBJETO CRIADOS PARA ROTAS ====================== */
const createFind = new ControllerFind();
const createPost = new ControllerPost();
const createDell = new controllerDelete();
const createDellTodos = new controllerDeleteTodos();

/*=================================== ROTA DE PRODUCT =============================*/

router.get("/", createFind.handle);
router.delete("/del/:id", createDell.handle);
router.delete("/del", createDellTodos.handle);
router.post("/api", createPost.handle);

export { router };
