import React, { useEffect, useState } from 'react'
import '../styles/List.scss'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setTripList } from '../redux/state'
import ListingCard from '../components/ListingCard'
import Footer from '../components/Footer'

const TripList = () => {


    const [loading, setLoading] = useState(true)
    const tripList = useSelector((state) => state.user.tripList)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user._id)

    const getTripList = async () => {
        try {

            const response = await fetch(`http://localhost:5000/users/${userId}/trips`, {
                method: "GET"
            })

            const data = await response.json()
            dispatch(setTripList(data))
            
            setLoading(false)

            

        } catch (error) {
            console.log("Fetch Trip List Failed : " , error.message)
        }
    }

    useEffect(() => {
        getTripList();
    },[])


    return loading ? <Loader /> : (
        <>
            <Navbar />

            <h1 className='title-list'>Your Trip Lists</h1>

            <div className='list'>
                {tripList?.map(({ listingId, hostId,startDate, endDate, totalPrice, booking=true }) => (
                    <ListingCard
                        listingId={listingId._id}
                        creator={hostId._id}
                        startDate={startDate}
                        endDate={endDate}
                        totalPrice={totalPrice}
                        listingPhotoPaths={listingId.listingPhotoPaths}
                        city={listingId.city}
                        province={listingId.province}
                        country={listingId.country}
                        category={listingId.category}
                        booking={booking}
                    />
                ))}
            </div>
            <Footer /> 

        </>
    )
}

export default TripList