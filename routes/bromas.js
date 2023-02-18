const { Router } = require('express');
const { allGetBromas, bromasGetRandom, createBroma, bromasGetId, updateBroma, deleteBroma } = require('../controllers/bromas');

const router = Router();

router.get('/', allGetBromas);

router.get('/:id', bromasGetId)

router.get('/random', bromasGetRandom);

router.post('/new', createBroma)

router.put('/update/:id', updateBroma)

router.delete('/delete/:id', deleteBroma)



module.exports = router