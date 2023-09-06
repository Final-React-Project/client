import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { CloudinaryContext, Image } from "cloudinary-react";


function EditExperience() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { experienceId, location } = useParams();
  const [title, setTitle] = useState("");
  const [experienceType, setExperienceType] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchExperienceData();
  }, [experienceId]);

  const fetchExperienceData = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/country/${location}/${experienceId}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const {
          title,
          experienceType,
          description,
          duration,
          price,
          imageUrl,
        } = data;
        setTitle(title);
        setExperienceType(experienceType);
        setDescription(description);
        setDuration(duration);
        setPrice(price);
        setImageUrl(imageUrl);
      } else {
        console.log("ërror");
      }
    } catch (error) {
      console.error("Error fetching experience data: ", error);
    }
  };
  //  WE DO NOT ADD LOCATION BECAUSE WE CANNOT EDIT LOCATION
  const handleTitle = (e) => setTitle(e.target.value);
  const handleExperienceType = (e) => setExperienceType(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleDuration = (e) => setDuration(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);

  const handleImage = (e) => {};

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/experience/edit/${experienceId}`;
    const requestBody = {
      title,
      location,
      experienceType,
      description,
      duration,
      price,
      imageUrl,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error editing experience: ", error);
    }
  };

  return (
    <>
      {user?.admin && (
        <div>
          <h2>Edit Experience in {location}</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={handleTitle}
                required
                name="title"
              />
            </label>
            <br />
            <label>
              Experience Type:
              <input
                type="text"
                value={experienceType}
                onChange={handleExperienceType}
                required
                name="experienceType"
              />
            </label>
            <br />

            <label>
              Description:
              <textarea
                value={description}
                onChange={handleDescription}
                required
                name="description"
              />
            </label>
            <br />

            <label>
              Duration:
              <input
                type="text"
                value={duration}
                onChange={handleDuration}
                required
                name="duration"
              />
            </label>
            <br />

            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={handlePrice}
                required
                name="price"
              />
            </label>
            <br />

            <label>
              Upload Image:
              <input
                type="file"
                onChange={handleImage}
                accept="image/*"
                name="imageUrl"
              />
            </label>
            <br />
            <CloudinaryContext
              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            >
              <Image publicId={imageUrl} width="150" />
            </CloudinaryContext>

            <button type="submit">Edit Experience</button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditExperience;
