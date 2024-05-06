import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "../styles/ListingDetails.scss"
import { facilities } from '../data.js'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRange } from "react-date-range"
import Loader from '../components/Loader.jsx'
import Navbar from "../components/Navbar.jsx"
import { useSelector } from 'react-redux'
import Footer from '../components/Footer.jsx'


const ListingDetails = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const { listingId } = useParams()

    const [listing, setListing] = useState(null)

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/properties/${listingId}`,
                {
                    method: "GET",
                }
            )

            const data = await response.json()
            setListing(data)
            setLoading(false)
        } catch (error) {
            console.log("Fetch listing detaials failed", error.message)
        }
    }

    useEffect(() => {
        getListingDetails()
    }, [])


    /* BOOKING CALENDAR */
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    const handleSelect = (ranges) => {
        // update selected Date range when user make selection 
        setDateRange([ranges.selection])
    }

    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)

    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24) // calculate the difference in date units

    
    /*  Submit booking */

    const customerId = useSelector((state) => state?.user?._id)

    const handleSubmit = async () => {
        try {
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * dayCount,

            }

            const response = await fetch("http://localhost:5000/bookings/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingForm)
            })

            if (response.ok) {
                navigate(`/${customerId}/trips`)
            }

        } catch (error) {
            console.log("Submit booking failed", error.message)
            
        }
    }

    return loading ? <Loader /> : (
        <>
            <Navbar />
            <div className='listing-details'>
                <div className='title'>
                    <h1>{listing.title}</h1>
                    <div></div>
                </div>

                <div className='photos'>
                    {listing.listingPhotoPaths?.map((item , index) => (
                        <img key={index}
                            src={`http://localhost:5000/${item.replace("public", "")} `} alt='listingPhotos' />
                    ))}
                </div>

                <h2>{listing.type} in {listing.city}, {listing.province} , {listing.country} </h2>
                <p>{listing.guestCount} Guests -  {listing.bedroomCount} Bedrooms - {listing.bedCound} Beds - {listing.bathroomCount} Bathroom</p>

                <hr />

                <div className='profile'>
                    <img
                        src={`http://localhost:5000/${listing.creator.profileImagePath?.replace(
                            "public",
                            ""
                        )}`}
                        alt='profile'
                    />
                    <h3>Hosted by {listing.creator.firstName} {listing.creator.lastName}</h3>
                </div>

                <hr />

                <h3>Description</h3>

                <p>{listing.description}</p>

                <hr />

                <h3>{listing.highlight}</h3>
                <p>{listing.highlightDesc}</p>

                <hr />

                <div className='booking'>

                    <div>
                        <h2>What this place offers ?</h2>
                        <div className='amenities'>
                            {listing.amenities[0].split(",").map((item, index) => (

                                <div className='facility' key={index}>
                                    <div className='facility_icon'>
                                        {facilities.find((facility) => facility.name === item)?.icon}
                                    </div>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2>How long do you want to stay ?</h2>
                        <div className='date-range-calendar'>
                            <DateRange ranges={dateRange} onChange={handleSelect} />
                            {
                                dayCount > 1 ? (
                                    <h2> ${listing.price} X {dayCount} Nights</h2>
                                ) : (
                                    <h2> ${listing.price} X {dayCount} Night</h2>
                                )
                            }
                            <h2>Total Price: $ {listing.price * dayCount}</h2>
                            <p>Start Date " {dateRange[0].startDate.toDateString()}</p>
                            <p>End Date " {dateRange[0].endDate.toDateString()}</p>
                            
                            <button type='submit' className='button' onClick={handleSubmit}> BOOKING </button>
                        </div>
                       
                    </div>
                </div>
            </div>

            {/* FOOTER TO BE ADDED */}
            <Footer /> 

        </>
    )
}

export default ListingDetails;