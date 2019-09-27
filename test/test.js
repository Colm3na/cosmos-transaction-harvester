const schema = require('../schema.js');
const { extractSignatures, avoidDupliAndSave, getTx } = require('../src/aux-methods');
const TX = schema.TX;
const Block = schema.Block;
const { tx0, block0, mockLunieTX, mockBlocks } = require('./mockdata');


describe('DB connection & Saving avaliability', () => {

    it('Should save the transaction in the DB', async () => {
        try {
            let hash = tx0.hash;
            await tx0.save();
            const result = await TX.findOne({hash})
            expect(result).not.toBeNull();
            // await tx0.remove();
        } catch (error) {
            throw error;
        }
    })

    it('Should save the block in the DB', async () => {
        try {
            let height = block0.height;
            await block0.save();
            const savedBlock = await Block.findOne({height})
            expect(savedBlock).not.toBeNull();
            await block0.remove();
        } catch (error) {
            throw error;
        }
    })
})

describe('Check functions with mockBlocks', () => {

    it('Should extract two hashes', () => {
        const hashes = extractSignatures(mockBlocks[1].txs);
        expect(hashes.length).toBe(2);
    })

    it('Should find and save one Lunie transaction in DB', async () => {
        const hash = extractSignatures(mockBlocks[3].txs);
        await getTx(hash);
        let savedHash = hash[0].toUpperCase();
        const savedTX = await TX.findOne({hash: savedHash});
        expect(savedTX).toBeTruthy();
    })

    it('Should find a duplicate transaction', async () => {
        await tx0.save();
        const bool = await avoidDupliAndSave(tx0);
        console.log('BOOL IS ', bool)
        expect(bool).toBeTruthy();
    })
})
