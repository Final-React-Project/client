import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from "../../components/Review/Review";
import ReviewCard from "../../components/Review/ReviewCard";
import { CartContext } from "../../context/cart.context";
import './ExperienceDetail.css'
import DeleteExperience from "../../components/DeleteExperience/DeleteExperience";
import { AuthContext } from "../../context/auth.context";
import Rating from "../../components/Ratings";

import {
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";

function ExperienceDetail() {
    const {user} = useContext(AuthContext)
    const { cart, cartUpdate } = useContext(CartContext)
    const { experienceId, location } = useParams();
    const [experience, setExperience] = useState(null);
    const [expReviews, setExpReviews] = useState(null);

    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/country/${location}/${experienceId}`
    const apiUrlReviews = `${process.env.REACT_APP_SERVER_URL}/reviews/${experienceId}`
    console.log(cart);
    function getReviews() {
        fetch(apiUrlReviews)
            .then(response => response.json())
            .then((data) => {
                console.log(data, 'reviews');
                return setExpReviews(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {

        fetch(apiUrl)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                return setExperience(data)
            })
            .catch((err) => console.log(err))

    }, []);

    useEffect(() => {

        getReviews()

    }, []);


    return (
        <>
            {(!experience || !expReviews || !expReviews.reviews) ? <p>Loading...</p>
                :
                <>
                    <div className="container-fluid mt-5">
                        <div className="row d-flex">
                            <div className="col-md-6">
                                <div className="d-flex align-items-center h-100 w-100 justify-content-center">
                                    <img src={experience.imageUrl}
                                        alt={experience.title}
                                        className="img-fluid"
                                        style={{ width: '1200px', height: '630px' }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h1 className="mt-4">{experience.title}</h1>
                                <p className="lead">{experience.description}</p>
                                <p className="mt-4" style={{ fontFamily: 'Share', fontSize: '19px' }}>
                                    Price: ${experience.price}
                                    <button className="text-center btn btn-sm btn-dark rounded border border-warning" style={{ width: '130px', maxHeight: '35px', fontFamily: 'Share', fontSize: '14px' }} onClick={() => { cartUpdate(experience) }}>Purchase</button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {<Review experienceId={experienceId} getReviews={getReviews} />}
                        <section className="vh-100">
                            <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                                <MDBRow className="justify-content-center">
                                    {expReviews.reviews.map((review) => (
                                        <React.Fragment key={review._id}>
                                            <ReviewCard review={review} experienceId={experienceId} getReviews={getReviews} />
                                        </React.Fragment>
                                    ))}
                                </MDBRow>
                            </MDBContainer>
                        </section>
                       { user?.admin &&<> <Link to={`/country/${location}/${experienceId}/edit`}>EDIT</Link></>}
                        {user?.admin && <DeleteExperience location = {location}></DeleteExperience>}
                    </div>
                </>
            }
        </>

    );
}

export default ExperienceDetail;
