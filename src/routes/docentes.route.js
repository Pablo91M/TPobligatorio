const express = require('express')
const docentes = require ('../../datos/docentes.json')
const docentesContoller = require('../controllers/docentes.controller')
const router = express.Router()

router.get('/', (req,res)=>{
    res.json( docentes ).status(200)
})

router.get('/',docentesContoller.getAllDocentes)
router.get('/:legajo',docentesContoller.getDocentesBylegajo)
router.delete('/:legajo', docentesContoller.deleteDocentesByLegajo)
router.post('/', docentesContoller.crearDocente)
router.put('/:legajo',docentesContoller.modificarDocentes )

module.exports = { router }