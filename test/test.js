const schema = require('../schema.js');
const { extractSignatures, avoidDupliAndSave, getTx } = require('../src/aux-functions');
const { getLastScannedBlock } = require('../src/functions');
const followBlockchain = require('../src/subscribe');
const TX = schema.TX;
const Block = schema.Block;
const { tx0, block0, mockLunieTX, mockBlocks } = require('./mockdata');


beforeAll( () => { console.log('BEGINNING TESTS') });

// after all will kill all the open handles left by Jest
afterAll(() => setTimeout(() => process.exit(), 3000))

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

describe('Checks functions with mock data', () => {

    it('Should extract two hashes', () => {
        const hashes = extractSignatures(mockBlocks[1].txs);
        expect(hashes.length).toBe(2);
    })

    it('Should save a Lunie transaction', async () => {
        try {
            await avoidDupliAndSave(mockLunieTX);
            const lunieTX = await TX.findOne({hash: 'Hashhhhhhhhhhh'});
            expect(lunieTX).not.toBeNull();
            await lunieTX.remove();
        } catch (error) {
            throw error;
        }
    })

    it('Should find and save a Lunie transaction in DB', async () => {
        try {
            const hash = extractSignatures(mockBlocks[3].txs);
            await getTx(hash);
            let savedHash = hash[0].toUpperCase();
            const savedTX = await TX.findOne({hash: savedHash});
            expect(savedTX).toBeTruthy();
        } catch (error) {
            throw error;
        }

    })

    it('Should find a duplicate transaction', async () => {
        try {
            await tx0.save();
            const bool = await avoidDupliAndSave(tx0);
            expect(bool).toBeTruthy();
            await tx0.remove();
        } catch (error) {
            throw error;
        }
    })

    it('Should find a last scanned block of height 5', async () => {
        try {
            const savedBlock = await Block.findOne({height: 5});
            getLastScannedBlock().then( height => {
                expect(height).toBe(5);
                savedBlock.remove();

            })
        } catch (error) {
            throw error;
        }
    })
})

describe('Checks the subscription function', () => {

    it('Should subscribe to the blockchain', async () => {
        const lastBlock = await Block.findOne().sort({_id: -1});
        await followBlockchain();
        setTimeout( async () => {
            const newlastBlock = await Block.findOne().sort({_id: -1});
            expect(newlastBlock.height).toBeGreaterThan(lastBlock.height);
        }, 10000)
    })
}) 
