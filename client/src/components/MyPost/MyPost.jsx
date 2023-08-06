import React, { useState } from "react";
//import div from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../UserImage/UserImage";
// import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/authSlice";

//import "./MyPostWidget.scss";

const MyPost = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { picturePath } = useSelector((state) => state.user);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    console.log(response+"hii");
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };


  return (
    <>
      <div className="post-widget">
        < >
          <UserImage image={picturePath} />
          <textarea
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            className="post-input"
          />
        </>
        {isImage && (
          <div className="image-dropzone">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <>
                  <div
                    {...getRootProps()}
                    className="dropzone-content"
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <div>
                        <span>{image.name}</span>
                      </div>
                    )}
                  </div>
                  {image && (
                    <button
                      onClick={() => setImage(null)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </Dropzone>
          </div>
        )}

        <div className="divider" />

        <div>
          <div
            gap="0.25rem"
            onClick={() => setIsImage(!isImage)}
            className="action-button"
          >
            <span>Image</span>
          </div>

          <button
            disabled={!post}
            onClick={handlePost}
            className="post-button"
          >
            POST
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPost;
