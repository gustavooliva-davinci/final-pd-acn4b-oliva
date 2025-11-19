import express from "express";
import {
    getPeliculas,
    getPeliculaById,
    addPelicula,
    deletePelicula
} from "../controllers/peliculasController.js";

const router = express.Router();

router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);
router.post("/", addPelicula);
router.delete("/:id", deletePelicula);

export default router;