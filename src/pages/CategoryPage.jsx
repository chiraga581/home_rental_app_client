import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import "../styles/List.scss"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setListings } from "../redux/state"
import ListingCard from "../components/ListingCard"
import Footer from "../components/Footer"

const CategoryPage = () => {
    const [loading, setLoading] = useState(true)
    
    const {category} = useParams();
    
    const dispatch = useDispatch()
    
    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(
                    `http://localhost:5000/properties?category=${category}`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            dispatch(setListings({ listings: data }))
            setLoading(false)

        } catch (error) {
            console.log("Fetch listings fails", error.message)
        }
    }

    useEffect(() => {
        getFeedListings();
    }, [category]);

    return loading ? (<Loader />) : (
        <>
            <Navbar />
            <h1 className='title-list'>{category} Listings</h1>
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

export default CategoryPage