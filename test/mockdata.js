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

const mockTXs = [
    {
        "height": "30227",
        "txhash": "6D1A3390F8672A5A95F332C067C7A1BAB80A4418ED877757A99547B058AF4874",    
        "tags": [
            {
                "key": "action",
                "value": "send"
            },
            {
                "key": "sender",
                "value": "cosmos1cwfj44ktgxe2493w6drrlvl4uuhnpj8t0a9d2c"
            },
            {
                "key": "recipient",
                "value": "cosmos1yeygh0y8rfyufdczhzytcl3pehsnxv9d3wsnlg"
            }
            ],
            "tx": {
                "type": "auth/StdTx",
                "value": {
                "msg": [
                {
                "type": "cosmos-sdk/MsgSend",
                    "value": {
                    "from_address": "cosmos1cwfj44ktgxe2493w6drrlvl4uuhnpj8t0a9d2c",
                    "to_address": "cosmos1yeygh0y8rfyufdczhzytcl3pehsnxv9d3wsnlg",
                    "amount": [
                        {
                            "denom": "uatom",
                            "amount": "199895000"
                        }
                    ]
                }
            }
        ],
        "fee": {
            "amount": [
                {
                    "denom": "uatom",
                    "amount": "5000"
                }
                ],
                "gas": "200000"
            },
                "memo": "Made by Circle with love"
            }
        },
        "timestamp": "2019-04-25T02:26:04Z"
    },
    {
        "height": "30227",
        "txhash": "D89717AA69F96AB8DC4215448EE3279938C0947F965EC8CF77A3E50D257BE235",    
        "tags": [
            {
                    "key": "action",
                    "value": "delegate"
                },
                {
                    "key": "delegator",
                    "value": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4"
                },
                {
                    "key": "destination-validator",
                    "value": "cosmosvaloper1wp9jne5t3e4au7u8gfep90g59j0qdhpeqvlg7n"
                }
            ],
        "tx": {
            "type": "auth/StdTx",
            "value": {
            "msg": [
            {
            "type": "cosmos-sdk/MsgDelegate",
                "value": {
                    "delegator_address": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4",
                    "validator_address": "cosmosvaloper1wp9jne5t3e4au7u8gfep90g59j0qdhpeqvlg7n",
                "amount":
                    {
                        "denom": "uatom",
                        "amount": "1"
                    }
                }
            }
        ],
        "fee": {
            "amount": null,
            "gas": "115866"
            },
                "memo": "Sent via Lunie"
            }
        },
        "timestamp": "2019-04-25T02:26:04Z"
    },
    {
        "height": "4925",
        "txhash": "B0A79E4C2539132782DF19D46E97BC3D4874A548836A722E69C4091AAE20ED79",    
        "tags": [
            {
                "key": "action",
                "value": "send"
            },
            {
                "key": "sender",
                "value": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4"
            },
            {
                "key": "recipient",
                "value": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4"
            }
            ],
            "tx": {
                "type": "auth/StdTx",
                "value": {
                "msg": [
                {
                "type": "cosmos-sdk/MsgSend",
                    "value": {
                    "from_address": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4",
                    "to_address": "cosmos1ymazqh72lyyaptvl6h6emn8tsztka93djc07l4",
                    "amount": [
                        {
                            "denom": "uatom",
                            "amount": "10000"
                        }
                    ]
                }
            }
        ],
        "fee": {
                "amount": null,
                "gas": "35287"
            },
                "memo": "Sent via Lunie"
            }
        },
        "timestamp": "2019-04-23T02:24:27Z"
    },
    {
        "height": "30227",
        "txhash": "6D1A3390F8672A5A95F332C067C7A1BAB80A4418ED877757A99547B058AF4874",    
        "tags": [
            {
                "key": "action",
                "value": "send"
            },
            {
                "key": "sender",
                "value": "cosmos1cwfj44ktgxe2493w6drrlvl4uuhnpj8t0a9d2c"
            },
            {
                "key": "recipient",
                "value": "cosmos1yeygh0y8rfyufdczhzytcl3pehsnxv9d3wsnlg"
            }
            ],
            "tx": {
                "type": "auth/StdTx",
                "value": {
                "msg": [
                {
                "type": "cosmos-sdk/MsgSend",
                    "value": {
                    "from_address": "cosmos1cwfj44ktgxe2493w6drrlvl4uuhnpj8t0a9d2c",
                    "to_address": "cosmos1yeygh0y8rfyufdczhzytcl3pehsnxv9d3wsnlg",
                    "amount": [
                        {
                            "denom": "uatom",
                            "amount": "199895000"
                        }
                    ]
                }
            }
        ],
        "fee": {
            "amount": [
                {
                    "denom": "uatom",
                    "amount": "5000"
                }
                ],
                "gas": "200000"
            },
                "memo": "Made by Circle with love"
            }
        },
        "timestamp": "2019-04-25T02:26:04Z"
    },
    {
        "height": "5172",
        "txhash": "F2EAB64512C1D9FE6C195C19131B65BA858489499DBF978DDAC977FC63614FD1",    
        "tags": [
            {
                "key": "action",
                "value": "send"
            },
            {
                "key": "sender",
                "value": "cosmos1w7r7juymfdfk5gwjrn4m9ed8c6t7z0mv2j2tdj"
            },
            {
                "key": "recipient",
                "value": "cosmos1s8n824e5p5chavmq6j2se3npxyquvxttxy6ass"
            }
            ],
            "tx": {
                "type": "auth/StdTx",
                "value": {
                "msg": [
                {
                "type": "cosmos-sdk/MsgSend",
                    "value": {
                    "from_address": "cosmos1w7r7juymfdfk5gwjrn4m9ed8c6t7z0mv2j2tdj",
                    "to_address": "cosmos1s8n824e5p5chavmq6j2se3npxyquvxttxy6ass",
                    "amount": [
                        {
                            "denom": "uatom",
                            "amount": "1000000"
                        }
                    ]
                }
            }
        ],
        "fee": {
            "amount": [
                {
                    "denom": "uatom",
                    "amount": "975"
                }
                ],
                "gas": "38971"
            },
                "memo": "I was Lunie once"
            }
        },
        "timestamp": "2019-04-23T02:52:42Z"
    },
]

module.exports = {tx0, block0, mockLunieTX, mockTXs}