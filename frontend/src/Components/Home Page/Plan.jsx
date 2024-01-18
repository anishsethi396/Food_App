import React, { useEffect, useState } from 'react';
import '../Styles/plan.css';
import Tick from '../Images/check-mark.png'
import axios from 'axios';


function Plan() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function fetchTopPlans(){
            try {
                const response = await axios.get('http://127.0.0.1:5000/plan/top3')
                setPlans(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTopPlans()
    }, [])

    return (
        <div className='plansCard'>
            <div className='h1Box'>
                <h1 className='h1'>START EATING HEALTHY TODAY</h1>
                <div className="line"></div>
            </div>
            <div className='planDetails'>
                {plans && plans?.map((plan, key) =>
                    <div className='pCard' key={key}>
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
                                <p className='point'>{plan.duration} meals</p>
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
                        <button className='btn'>I'm Hungry</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Plan
