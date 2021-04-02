const CakeInfos = ({ cakeNumber, nbrPersons }) => {
    return (
        <>
            <div className="flex  md:flex-grow justify-around my-8 py-8 rounded-md shadow-lg bg-white">
                <div className="text-center">
                    <img src="icon_cake.svg" alt="Number of cakes" />
                    <p className="text-gray-400 my-1">cakes</p>
                    <p className="text-blue-400 font-semibold text-lg">{cakeNumber}</p>
                </div>
                <div className="text-center">
                    <img src="icon_persons.svg" alt="Total number of persons" />
                    <p className="text-gray-400 my-1">persons</p>
                    <p className="text-blue-400 font-semibold text-lg">{nbrPersons}</p>
                </div>
            </div>
        </>
    )
}

export default CakeInfos
