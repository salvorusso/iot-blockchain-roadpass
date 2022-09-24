async function main() {
    const RoadPassChain = await ethers.getContractFactory("RoadPassChain")
  
    // Start deployment, returning a promise that resolves to a contract object
    const mainContract = await RoadPassChain.deploy()
    await mainContract.deployed()
    const mainContractAddress = mainContract.address
    console.log("RoadPassChain Contract deployed to address: ", mainContractAddress)

    const companyWallet = '0x8F58fA4A09A794b2d96BC8056E3958cf930EAa7d'

    //NFT deploy
    const RoadPassTicket = await ethers.getContractFactory("RoadPassTicket")
    const ticketContract = await RoadPassTicket.deploy(companyWallet, mainContractAddress)
    await ticketContract.deployed()
    const ticketContractAddres = ticketContract.address
    console.log("RoadPassTicket Contract deployed to address: ", ticketContractAddres)

    //Totems deploy
    const RoadPassTotem = await ethers.getContractFactory("RoadPassTotem")
    const cataniaContract = await RoadPassTotem.deploy(companyWallet, 'Catania', 0, ticketContractAddres, mainContractAddress)
    await cataniaContract.deployed()
    const cataniaContractAddress = cataniaContract.address
    console.log("Catania Totem Contract deployed to address: ", cataniaContractAddress)
    const taorminaContract = await RoadPassTotem.deploy(companyWallet, 'Taormina', 20, ticketContractAddres, mainContractAddress)
    await taorminaContract.deployed()
    const taorminaContractAddress = taorminaContract.address
    console.log("Taormina Totem Contract deployed to address: ", taorminaContractAddress)
    const messinaContract = await RoadPassTotem.deploy(companyWallet, 'Messina', 50, ticketContractAddres, mainContractAddress)
    await messinaContract.deployed()
    const messinaContractAddress = messinaContract.address
    console.log("Messina Totem Contract deployed to address: ", messinaContractAddress)

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  