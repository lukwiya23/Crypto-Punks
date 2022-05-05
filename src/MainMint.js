import React, { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { Button, Box, Flex, Input, Text } from '@chakra-ui/react'
import RoboPunksNFT from './RoboPunksNFT.json'

const roboPunksAddress = "0x70fA7781C174DDd119cefE0CA0B5bd3214b85D86"

const MainMint = ({ accounts, setAccounts }) => {

    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0])

    //Mint NFT Function
    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksAddress,
                RoboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value:ethers.utils.parseEther((0.02 * mintAmount).toString())
                })
                console.log('response', response);
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    //Decrease nfts to mint
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1)

    }

    //Increase nfts to mint
    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1)

    }


    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px" >
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks 3000</Text>
                    <Text fontSize="30px" letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        It's the Year 3000. Can the RoboPunks NFT save
                        the human race from the destructive rampant NFT
                        speculation ? Mint RoboPunks to find out</Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                type="button" onClick={handleDecrement}>-</Button>

                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number" value={mintAmount} />

                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px   2px 1px #0F0F0F"
                                color="white" ontFamily="inherit"
                                padding="15px"
                                cursor="pointer"
                                fontFamily="inherit"
                    
                                marginTop="10px"
                                type="button" onClick={handleIncrement}>+</Button>
                        </Flex>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0 2px   2px 1px #0F0F0F"
                            color="white" ontFamily="inherit"
                            padding="15px"
                            cursor="pointer"
                            fontFamily="inherit"
                           
                            marginTop="10px"
                            type="button" onClick={handleMint}>Mint</Button>
                    </div>
                ) : (
                    <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000000"
                    color="#D6517D"

                    >You must be connected to Mint</Text>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint