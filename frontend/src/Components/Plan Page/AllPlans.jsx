import React, { useState, useEffect } from 'react'
import '../Styles/allplans.css'
import Tick from '../Images/check-mark.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AllPlans() {
    const [plans, setPlans] = useState([])

    useEffect(() => {
        async function fetchAllPlans(){
            try {
                const response = await axios.get('http://127.0.0.1:5000/plan')
                setPlans(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllPlans()
       
    }, [])

    return (
        <div className='allplansCard'>
            <div className='h1Box'>
                <h1 className='h1'>START EATING HEALTHY TODAY</h1>
                <div className="line"></div>
            </div>
            <div className='allplanDetails'>
                <div className='planDetails'>
                    {plans && plans?.map((plan, key) =>
                        <div className='apCard' key={key}>
                            <h3 className='h3'>{plan.name}</h3>
                            <div className='pCard1'>
                                <div className='priceBox'>
                                    <div className='price'>$ {plan.price}</div>
                                    <div className="duration">/month</div>
                                </div>
                                <p className="point">That’s only 2$ per meal</p>
                            </div>

                            <div className='pCard2'>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{plan.duration} meals.</p>
                                </div>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{plan.discount} discount available.</p>
                                </div>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{plan.ratingsAverage} rated meal.</p>
                                </div>
                            </div>

                            <button className='btn'> <Link to={`/planDetail/${plan._id}`} >I'm Hungry</Link></button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AllPlans