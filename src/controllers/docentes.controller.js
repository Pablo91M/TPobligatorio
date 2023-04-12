const docentes = require ('../../datos/docentes.json')


const getAllDocentes = (req,res)=>{
    res.json(docentes).status(200)
}

const getDocentesBylegajo = (req,res)=>{
    const legajo = req.params.legajo
    const resultado = docentes.find( docente => docente.legajo == legajo)
    if( resultado ){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json ( { mensaje: `el docente con el legajo ${legajo} no fue encontro!`})
    }
}

const deleteDocentesByLegajo = (req,res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docente => docente.legajo == legajo)
    if( indice == -1 ){
        res.status(404).json({
            resultado: "La opereracion de borrado no pudo realizarse",
            mensaje: `el docente con el legajo ${legajo} no fue encontrado`
        })
    } else {
        const docente = docentes[indice]
        const resultado = docentes.splice( indice,1 )
        res.status(200).json({
            resultado: "la operacion de borrado pudo realizarse con exito!",
            docente : docente
        })

    }
}

const crearDocente = (req,res) =>{
    const docentesData = req.body
    const existe = docentes.find(docente => docente.legajo == docentesData.legajo)
    if( !existe ){
        docentesData.concursado = false
        if(!docentesData.nombre){
            res.status(400).json({ mensaje: `no se puede generar el docente con legajo ${docentesData.legajo} por no tener nombre!`})
        } else {
            docentes.push(docentesData)
            res.status(201).json({mensaje: `el docente con legajo ${docentesData.legajo} fue creado con exito!`})
        }
    } else {
        res.status(400).json({mensaje: `el docente con legajo ${docentesData.legajo} ya esta en la base de datos`})
    }
}

const modificarDocentes = (req,res) => {
    const legajo = req.params.legajo
    const docentesData = req.body
    const indice = docentes.findIndex( docente => docente.legajo == legajo)
    if( indice >= 0 ){
        docente[indice].nombre = docentesData.nombre
        res.status(201).json({"docente": docente[indice] })
    }
    res.status(400).json({
        resultado: "L operacion de modificado no pudo ser realizada!",
        mensaje: `El docente con el legajo ${legajo} no fue encontrado`
    })
    res.status(400).json({ legajo, docentesData })
}

module.exports = 
{
    getAllDocentes,
    getDocentesBylegajo,
    deleteDocentesByLegajo,
    crearDocente,
    modificarDocentes
}