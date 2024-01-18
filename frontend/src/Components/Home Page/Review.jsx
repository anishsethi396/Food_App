import React, {useState, useEffect} from 'react'
import Star from '../Images/star.png'
import axios from 'axios'
import '../Styles/review.css'

function Review() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function fetchTopReviews(){
            try {
                const response = await axios.get('http://127.0.0.1:5000/review/top3')
                setReviews(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTopReviews()
    }, [])

    return (
        <div className="reviewImg">
            <div className="reviewCard">
                <div className='h1box'>
                    <h1 className='h1'>REVIEWS</h1>
                    <div className="line"></div>
                </div>
                <div className="rDetail">
                    {reviews.map((review, index) => (
                        <div className="rCard" key={index}>
                            <div className='rheader'>
                                <h3 className="rh3">{review.user?.name || 'Unknown user'}</h3>
                            </div>
                            <div className='rsummary'>
                                <p className='para'>
                                    {review.review || 'No review Available'}
                                </p>
                            </div>
                            <div><h4>Plan Name: {review.plan?.name || 'N/A'}</h4></div>
                            <div className='frate'>
                                {review.rating && Array.from(Array(review.rating).keys()).map((star, starIndex) => (
                                    <img key={starIndex} alt='' src={Star} className='img' />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Review