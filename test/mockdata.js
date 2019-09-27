const schema = require('../schema.js');

const TX = schema.TX;
const Block = schema.Block;


const tx0 = new TX({
    hash: 'Hash comes here',
    height: '4',
    kind: 'I\'m kind',
    timestamp: new Date('2019-09-26 12:21:04.000'),
    memo: '',
    amount: 'Much money',
    from_addr: '',
    to_addr: '',
    delegator_addr: 'Madmen',
    validator_addr: 'Chuck Norris',
    vote: {
        proposal_id: '0',
        option: 'Whatever',
    },
})

const block0 = new Block ({
    height: 5,
    scanDate: new Date('2019-09-26 12:21:04.000')
})

const mockLunieTX = new TX({
    hash: 'Hashhhhhhhhhhh',
    height: '10',
    kind: 'One transaction more in this world',
    timestamp: new Date('2019-09-27 18:43:04.000'),
    memo: 'Sent via Lunie',
    amount: '50000',
})

const mockBlocks = [
    {
        txs: [ 'tAHwYl3uCjCMTXENChS9qylhiGPaDUEBgah/3lXsg1tnIRIUx8IB1mO1bXRY0vHThzr6b+PHVyESEAoKCgV1YXRvbRIBMRCgjQYaagom61rphyECPeTCBfk7afFDIubduqb1adR5uzFuIopW4kIpQfW4ZnMSQKIGOahdobYpSbldvHENAF4P86aa1Fw17wkpCjDFSxFOAc9HySg5/TDxtsUV4xEt5ILpZPeajeq+zAwZ4IXWW8s=' ]
    },
    {
        txs:['xAHwYl3uCjySHS5OChQm+iBfyvkJ0K2f1fWdzOuAl26WLRIUcEsp5ouOa957h0JyEr0ULJ4G3DkaCgoFdWF0b20SATESBBCaiQcaagom61rphyECVgvl/uEn59LNVTy525Sc7oeiRftYS9+9mDx1vEbqPt0SQKxAOMAXl/UFjIQXH4D1773hPg711Zc42yr2EgJwGUJzStetEwlOCFa9GA7+hZoufMuNCTf5H1D2/98ZKIO30DAiDlNlbnQgdmlhIEx1bmll',            // Sent via Lunie
        '5QHwYl3uCkSoo2GaChTDkyrWy0GyqpYu00Y/s/XnLzDI6xIUJkiLvIcaScS3AriIvH4hzeEzMK0aEgoFdWF0b20SCTE5OTg5NTAwMBITCg0KBXVhdG9tEgQ1MDAwEMCaDBpqCibrWumHIQPxXANDlHvwVbyX6DTCj2hbBmN8PGJMjLwKvip0f0cEgxJAD3lJ3hOLvr0fU0HE8q70JkeOdgJwIpsnHfGSqwTU4fAtPdXu+sZhlowSE3Op3z0AGGDsJRUc1ZeGp0jgJFmLSSIYTWFkZSBieSBDaXJjbGUgd2l0aCBsb3Zl'] 
    },
    {
        txs: [ 'tAHwYl3uCjCMTXENChS9qylhiGPaDUEBgah/3lXsg1tnIRIUG678G75TYk/mI6/OhvmEDce5EVYSEAoKCgV1YXRvbRIBMRCgjQYaagom61rphyECPeTCBfk7afFDIubduqb1adR5uzFuIopW4kIpQfW4ZnMSQOL8FneZdq2RU5xVm8At++TPCKa4Bakj9eS0li7KcahqDYM5uaVudprzTpcO+DqwsChlBhsk/7+a1UaOzyEuXA4=' ]
    },
    {
        txs: ['2wHwYl3uCkSSHS5OChQ00Zjjmo0VCKBgbGUHVGDIL8S79RIUdnVp7ODo173dQ3gSGAtBA+Hs7ZEaEgoFdWF0b20SCTUwMDAwMDAwMBITCg0KBXVhdG9tEgQyODU5ELD9BhpqCibrWumHIQPcu10gUQHgTmIF7FCEXgVqCL/nVrr1eQT5ON4MC/rSgBJA1H0B3z3iBTpuwnbXfXq0JkQluUh6MYwf6+LtkHaIpcglIEETMkk9eOdAvB8+zU7cRIlaW108BfQCihedS+yjlyIOU2VudCB2aWEgTHVuaWU='] // Sent via Lunie
    },
    {
        txs: [ 'lwLwYl3uCjCMTXENChSaZEwfgu68YGgUp8EgLnlc6SVP0xIUG678G75TYk/mI6/OhvmEDce5EVYKQJIdLk4KFJpkTB+C7rxgaBSnwSAueVzpJU/TEhQbrvwbvlNiT+Yjr86G+YQNx7kRVhoOCgV1YXRvbRIFODU0ODISEgoMCgV1YXRvbRIDNjkwEPCEDhpqCibrWumHIQKV/vqylrIyMmfe++AdPs4wH5syrbSrN0/npBteID3hoxJAmYpTIlIHk31dObfAwUU+Yeq5G3NzMtV9ihK2wUjfKPA4DO+XlHniaF5VmXFvMFOAscaz08DL/2BcKgq26TruhSIdUmVpbnZlc3QgcmV3YXJkcyBmcm9tIGltVG9rZW4=',
        '0QHwYl3uCkNcgIENChRe5uvcQ/GiJGJKY/pI9AeiutZwMRIUhL/4TH3a0Ry4wHOG6RkoxWdcpLwaEQoFdWF0b20SCDE2MTMxMDAwEhMKDQoFdWF0b20SBDEwMDAQwJoMGmoKJuta6YchAuq4UC+Tr7s5/2CaGyqQ5ovr+bZ84JEXaX5DxUuYtrLlEkB8aJoD9glope8z0lKTW318r5OSPlvBU3Bku6Yxu8Y0aC2i/KQK5v3R9nPbjPZrw+S1IKYlyczvro4oIlNsWmHqIgV3ZXRleg==' ]
    },
    {
        txs: [ '3gHwYl3uCkGSHS5OChSaZEwfgu68YGgUp8EgLnlc6SVP0xIUG678G75TYk/mI6/OhvmEDce5EVYaDwoFdWF0b20SBjEwMDAwMBISCgwKBXVhdG9tEgM0NTAQ8JMJGmoKJuta6YchApX++rKWsjIyZ9774B0+zjAfmzKttKs3T+ekG14gPeGjEkBXd3PKP7cNknH7xvs25swAJKhQZpb6t3P926BdikN4tVxI4FXv4vEf3clW5znecT8K2KLvAsQq6FqGMARYTpWVIhVkZWxlZ2F0ZSBmcm9tIGltVG9rZW4=' ]
    },
    {
        txs: [ 'ygHwYl3uCkKoo2GaChQoyq28xYHSUuQT3ohIY7Tnx8HXfBIUGNK1Yw0SqV5s7pgOLqbuimGK7/EaEAoFdWF0b20SBzM3NzUwMDASEgoMCgV1YXRvbRIDNzAzELXbARpqCibrWumHIQPRNqKbe9/JaEa4MdgRdpFZDQZM7ZigxYd1GvLEUqymXBJAnqIF/dcQBnVw5PN4kLLl1RvKhRF3VpQGzlQTNU29Z7J+Sy7Rr5EkC+mJ3sM01ORCc9Mcha6nClumHISAuffbVyIA' ]
    },
    {
        txs: [ 'yQHwYl3uCkSoo2GaChSlIMhqCDZpQc2Q0i4RrBx+76LbNxIUWYCZ0lvC4PM8HrDaaR1oSU65PLoaEgoFdWF0b20SCTE3NzAwMDAwMBIRCgsKBXVhdG9tEgIzMBCw6gEaagom61rphyED8/RMnoDiztwaKQljGjreqIZu4yGH900JEjhzWbD/NqISQEe0AMviQiVcOczTbdFFSZNUYAOXQjf+UhK7LkMVAqL3Kcm3+9NaiIjHMf0FLARR07LkInq5mVBbeSY8jJQroHw=' ]
    },
    {
        txs: [ 'xwHwYl3uCkKoo2GaChQY0rVjDRKpXmzumA4upu6KYYrv8RIUq0izqf/bcjC9KKaypXahrJ4NTiQaEAoFdWF0b20SBzM3NzQ5OTASEQoLCgV1YXRvbRICMTAQwJoMGmoKJuta6YchAiIOk21zzoM/z6LR0UQqtZ7cUgpVzTp5HwMOqk/wJE2rEkAvBd0K+eGlE485m9m90XFDj6J8hn36C524/oXHdtlCuB9XvbFJuQcXH8Hi5cKf84A+OW4XpwqOxC3g1nk1dcQK',
        '4wHwYl3uCkKoo2GaChRcWAQCX7PELBoqly4AXDOnejejkBIUxJDjs74llbIl7vGZGDnhi3qnfT8aEAoFdWF0b20SBzE5ODgwMDASEwoNCgV1YXRvbRIENTAwMBDAmgwaagom61rphyEDQeGQnFfjkTut00L8PhZ+/00tXBvHzqDI5rzBzBBtC0MSQNPaL7VbGRoWQa+1GV0KEDCfLDnp9idDU7oNR+e3gf9fW3IDk2Sa3VmuPrIX4m7KKPCD2cKxK6v61C0N7OfhSVgiGFNUQUtJTkcgV0lUSERSQVcgUkVRVUVTVA==' ]
    },
    {
        txs: [ '3gHwYl3uCkGSHS5OChSaZEwfgu68YGgUp8EgLnlc6SVP0xIUG678G75TYk/mI6/OhvmEDce5EVYaDwoFdWF0b20SBjEwMDAwMBISCgwKBXVhdG9tEgM0NTAQ8JMJGmoKJuta6YchApX++rKWsjIyZ9774B0+zjAfmzKttKs3T+ekG14gPeGjEkBXd3PKP7cNknH7xvs25swAJKhQZpb6t3P926BdikN4tVxI4FXv4vEf3clW5znecT8K2KLvAsQq6FqGMARYTpWVIhVkZWxlZ2F0ZSBmcm9tIGltVG9rZW4=' ]
    },
    {
        txs: [ 'mALwYl3uCjCMTXENChSpzLaTg6aNRldvCWWlR4DD0itu8RIUG678G75TYk/mI6/OhvmEDce5EVYKQZIdLk4KFKnMtpODpo1GV28JZaVHgMPSK27xEhQbrvwbvlNiT+Yjr86G+YQNx7kRVhoPCgV1YXRvbRIGMTYxOTEzEhIKDAoFdWF0b20SAzY5MBDwhA4aagom61rphyECOV2/n6BNIe5FlkyKrImFZslEHjlRu4Ii/pkNfDxR6LsSQGjRiu/17tOeuQP0WeaXfExM7s5KjL1mNSnmfGGUVbriR9urRo+e4gZYKTcxPRWjYGUbz0c8M12e9/TKDhnGNGQiHVJlaW52ZXN0IHJld2FyZHMgZnJvbSBpbVRva2Vu',
        'yAHwYl3uCkSoo2GaChRZgJnSW8Lg8zwesNppHWhJTrk8uhIUmSc4HyYqQahKSZHt4pN2aKsALu8aEgoFdWF0b20SCTE3Njk5OTk5ORIQCgoKBXVhdG9tEgExEKCNBhpqCibrWumHIQOahXCQSbxCv3zphAGNAxzVsEkWfUxHzWch/FaFbw7QKhJAyZmPQIEL+hXBz9rSZZDIr0cEzd0ikL3b3XUJW3HGRxBhIwpKZCyJYVKxHhGPlHKhqyyKqVPzs+m1zGtjyTevGw==' ]
    },
]

module.exports = {tx0, block0, mockLunieTX, mockBlocks}