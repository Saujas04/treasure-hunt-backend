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

const express = require('express');
const router = express.Router();
const WrongAttempt = require('../models/WrongAttempt');
const qrMap = require('../utils/qrMap');

// POST /api/qr/scan
router.post('/scan', async (req, res) => {
    try {
        const { teamId, clueNumber, qrId } = req.body;

        // 1. Validate incoming parameters
        if (!teamId || clueNumber === undefined || !qrId) {
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });
        }

        // 2. Get the clue data object { qrId, clue } from the map
        const clueData = qrMap[teamId]?.[clueNumber];

        console.log("Expected Clue Data:", clueData);
        console.log("Received QR ID:", qrId);

        // 3. Check if a clue exists for the given team and clue number
        if (!clueData) {
            return res.status(404).json({ status: 'error', message: 'No such clue for this team' });
        }

        // 4. Compare the received qrId with the expected qrId from the clue data
        if (qrId.trim() === clueData.qrId.trim()) {
            // Correct QR code scanned
            return res.json({
                status: 'correct',
                item: clueData.clue, // Return the actual clue text
                clueNumber
            });
        } else {
            // Incorrect QR code scanned, log the attempt
            await WrongAttempt.create({
                teamId,
                attemptedQrId: qrId,
                clueNumber
            });

            return res.json({
                status: 'wrong',
                redirect: '/rickroll' // Or any other response for a wrong scan
            });
        }
    } catch (error) {
        console.error('Error in /scan:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;

    }
});

module.exports = router;
