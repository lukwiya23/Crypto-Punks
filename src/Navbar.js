import React from 'react'
import { Button, Box, Flex, Image, Spacer } from '@chakra-ui/react'
import Facebook from './assets/assets/social-media-icons/facebook_32x32.png'
import Twitter from './assets/assets/social-media-icons/twitter_32x32.png'
import Email from './assets/assets/social-media-icons/email_32x32.png'

function Navbar({ accounts, setAccounts }) {
    const isConnected = Boolean(accounts[0])

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">

            {/* left side- social media icons*/}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Image src={Facebook} boxSize="42" margin="0 15px" />

                <Image src={Twitter} boxSize="42" margin="0 15px" />

                <Image src={Email} boxSize="42" margin="0 15px" />
            </Flex>


            {/* right side - section and connect*/}
            <Flex justify="space-around" align="center" width="40%" padding="30px">
                <Box margin="0 15px">Mint NFT</Box>
                <Spacer />
                <Box margin="0 15px">Connect Wallet</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />

                {/* isConnected*/}
                {isConnected ? (
                    <Box margin="0 15px">Connected</Box>
                ) : (
                    <Button
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                    type="button" onClick={connectAccount}>Connect Wallet</Button>
                )}
            </Flex>



        </Flex>
    )
}

export default Navbar