import { Router } from "express";
import { ControllerFind } from "../controllers/FindScraping";
import { ControllerPost } from "../controllers/PostScraping";
import { ControllerPost2 } from "../controllers/PostScraping2";
import { ControllerPost3 } from "../controllers/PostScraping3";
import { controllerDelete, controllerDeleteTodos } from "../controllers/DelScraping";


const router = Router();//

/* ============================== OBJETO CRIADOS PARA ROTAS ====================== */
const createFind = new ControllerFind();
const createPost = new ControllerPost();
const createPost2 = new ControllerPost2();
const createPost3 = new ControllerPost3();
const createDell = new controllerDelete();
const createDellTodos = new controllerDeleteTodos();

/*=================================== ROTA DE PRODUCT =============================*/

router.get("/", createFind.handle);
router.delete("/del/:id", createDell.handle);
router.delete("/del", createDellTodos.handle);
router.post("/api", createPost.handle);
router.post("/api2", createPost2.handle);
router.post("/api3", createPost3.handle);

export { router };
