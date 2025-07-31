// const express = require('express');
// const router = express.Router();
// const WrongAttempt = require('../models/WrongAttempt');
// const qrMap = require('../utils/qrMap');

// router.post('/scan', async (req, res) => {
//   const { teamId, clueNumber, qrId } = req.body;

//   const correctQrId = qrMap[teamId]?.[clueNumber];

//   if (qrId !== correctQrId) {
//     await WrongAttempt.create({ teamId, clueNumber, qrId });
//     return res.json({ status: 'wrong', redirect: '/rickroll' });
//   }

//   return res.json({
//     status: 'correct',
//     item: `Bring an object for clue #${clueNumber}`,
//     clueNumber
//   });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const WrongAttempt = require('../models/WrongAttempt');
// const qrMap = require('../utils/qrMap');

// // POST /api/qr/scan
// router.post('/scan', async (req, res) => {
//     try {
//         const { teamId, clueNumber, qrId } = req.body;

//         if (!teamId || clueNumber === undefined || !qrId) {
//             return res.status(400).json({ status: 'error', message: 'Missing parameters' });
//         }

//         // Get expected QR from qrMap
//         const expectedQrId = qrMap[teamId]?.[clueNumber];

//         console.log("Expected:", expectedQrId);
//         console.log("Received:", qrId);

//         if (!expectedQrId) {
//             return res.status(404).json({ status: 'error', message: 'No such clue for this team' });
//         }

//         if (qrId.trim() === expectedQrId.trim()) {
//             return res.json({
//                 status: 'correct',
//                 item: `Clue ${clueNumber} unlocked successfully!`, // You can replace this with your actual clue content
//                 clueNumber
//             });
//         } else {
//             // ❌ Log wrong attempt
//             await WrongAttempt.create({
//                 teamId,
//                 attemptedQrId: qrId,
//                 clueNumber
//             });

//             return res.json({
//                 status: 'wrong',
//                 redirect: '/rickroll'
//             });
//         }
//     } catch (error) {
//         console.error('Error in /scan:', error);
//         res.status(500).json({ status: 'error', message: 'Server error' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const WrongAttempt = require('../models/WrongAttempt');
const Inventory = require('../models/Inventory');
const qrMap = require('../utils/qrMap');

// POST /api/qr/scan
router.post('/scan', async (req, res) => {
    try {
        const { teamId, clueNumber, qrId } = req.body;

        if (!teamId || clueNumber === undefined || !qrId) {
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });
        }

        // Get expected QR from qrMap
        const expectedQrId = qrMap[teamId]?.[clueNumber];

        console.log("Expected:", expectedQrId);
        console.log("Received:", qrId);

        if (!expectedQrId) {
            return res.status(404).json({ status: 'error', message: 'No such clue for this team' });
        }

        if (qrId.trim() === expectedQrId.trim()) {
            // ✅ Correct QR: Fetch corresponding clue from Inventory
            const clueEntry = await Inventory.findOne({ qrId: expectedQrId });

            if (!clueEntry) {
                return res.status(404).json({ status: 'error', message: 'Clue not found in inventory' });
            }

            return res.json({
                status: 'correct',
                item: clueEntry.clue,
                clueNumber
            });
        } else {
            // ❌ Wrong QR: Log the attempt
            await WrongAttempt.create({
                teamId,
                attemptedQrId: qrId,
                clueNumber
            });

            return res.json({
                status: 'wrong',
                redirect: '/rickroll'
            });
        }
    } catch (error) {
        console.error('Error in /scan:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;

