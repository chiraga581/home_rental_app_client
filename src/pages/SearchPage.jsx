import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ListingCard from '../components/ListingCard'
import { setListings } from '../redux/state'
import Loader from '../components/Loader'
import Footer from '../components/Footer'


const SearchPage = () => {

    const { search } = useParams()
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const getSearchListing = async () => {
        try {
            const response = await fetch(`http://localhost:5000/properties/search/${search}`, {
                method: 'GET'
            })

            const data = await response.json()
            dispatch(setListings({ listings: data }))
            setLoading(false)
        } catch (error) {
            console.log("Fetch search list failed", error.message)
        }
    }

    useEffect(() => {
        getSearchListing()
    }, [search])


    return loading ? (<Loader />) : (
        <>
            <Navbar />
            <h1 className='title-list'> You searched for {search}...</h1>
            <div className='list'>
                {listings.map(({
                    _id,
                    creator,
                    listingPhotoPaths,
                    city,
                    province,
                    country,
                    category,
                    type,
                    price,
                    booking = false
                }) => (
                    <ListingCard
                        listingId={_id}
                        creator={creator}
                        listingPhotoPaths={listingPhotoPaths}
                        city={city}
                        province={province}
                        country={country}
                        category={category}
                        type={type}
                        price={price}
                        booking={booking}
                    />
                ))}
            </div>
            <Footer /> 

        </>
    )
}

export default SearchPage