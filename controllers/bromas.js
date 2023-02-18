const { response, request } = require('express')
const Bromas = require('../models/broma');

const allGetBromas = async (req, res = response) => {
    try {
        const bromas = await Bromas.find({});
        res.json({
            ok: true,
            bromas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener chistes de la base de datos.'
        });
    }
}


const bromasGetId = async (req, res) => {
    try {
        const { id } = req.params;
        const bromas = await Bromas.findById(id);
        if (!bromas) {
            return res.status(404).json({
                ok: false,
                message: 'Broma not found'
            });
        }
        res.json({
            ok: true,
            bromas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener la broma de la Base de Datos'
        });
    }
}

const bromasGetRandom = async (req, res) => {
    try {
        const count = await Bromas.countDocuments();
        const random = Math.floor(Math.random() * count);
        const broma = await Bromas.findOne().skip(random).limit(1);
        res.json({
            ok: true,
            broma
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador por favor.'
        });
    }
}

const createBroma = async (req, res = response) => {

    try {
        const { setup, punchline } = req.body;
        const bromas = new Bromas({ setup, punchline });
        await bromas.save();
        res.json({
            ok: true,
            bromas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al crear una broma en la base de datos.'
        });
    }
}


const updateBroma = async (req, res) => {
    try {
        const { id } = req.params;
        const { setup, punchline } = req.body;
        const bromas = await Bromas.findByIdAndUpdate(id, { setup, punchline }, { new: true });
        if (!bromas) {
            return res.status(404).json({
                ok: false,
                message: 'Broma not found'
            });
        }
        res.json({
            ok: true,
            bromas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error en actualizar la broma en la Base de Datos'
        });
    }
}

const deleteBroma = async (req, res) => {
    try {
        const { id } = req.params;
        const bromas = await Bromas.findByIdAndDelete(id);
        if (!bromas) {
            return res.status(404).json({
                ok: false,
                message: 'Broma not found'
            });
        }
        res.json({
            ok: true,
            bromas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar la broma de la Base de datos.'
        })
    }
}

module.exports = {
    allGetBromas,
    bromasGetId,
    bromasGetRandom,
    createBroma,
    updateBroma,
    deleteBroma
}