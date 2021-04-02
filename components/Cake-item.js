import { useRouter } from 'next/router';
import Moment from 'react-moment';

const Cake = ({ cakes }) => {
    const router = useRouter();
    return (
        <>
            {cakes.map(cake => (
                <div key={cake._id} onClick={() => router.push(`/cakes/${cake._id}`)} className="container flex justify-between rounded-md transition duration-500 ease-in-out shadow-md p-3 my-5 md:max-w-lg bg-white cursor-pointer hover:shadow-xl">
                    <div className="flex-row">
                        <p className="font-semibold">{cake.client.name}</p>
                        <div className="flex">
                            {cake.isForDelivery
                                ? <img src="delivery-truck.svg" alt="Need a delivery" className="mr-2" />
                                : null
                            }
                            <p className="text-gray-400 font-light">
                                <Moment format="D MMMM YY HH:mm">{cake.deliveryDate}</Moment>
                            </p>
                        </div>
                        
                    </div>
                    <div className="text-right">
                        <p>{cake.nbrPersons} persons</p>
                        {cake.state === 'Not started'
                            ? <p className='text-gray-400'>{cake.state}</p>
                            : (cake.state === 'Done')
                            ? <p className='text-green-400'>{cake.state}</p>
                            : <p className='text-red-400'>{cake.state}</p>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}

export default Cake;
