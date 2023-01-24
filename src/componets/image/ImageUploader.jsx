import { useState } from "react";
import ImageUploading from "react-images-uploading";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import customAxios from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { imageActions, alertActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const axios = customAxios();

export function ImageUploader() {
  const images = useSelector((state) => state.imageReducer);
  const { setAlert } = bindActionCreators(alertActions, useDispatch());
  const { storeImage } = bindActionCreators(imageActions, useDispatch());
  const [loading, setLoading] = useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    storeImage(imageList);
  };

  const uploadImage = async (index) => {
    setLoading(true);
    var formData = new FormData();
    formData.append("image", images[index].file);
    const { data } = await axios.post("/answer/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (data === null) {
      setAlert({
        open: true,
        severity: "error",
        message: "Something bad happened",
      });
    } else {
      images[index].imageUrl = data;
      setAlert({
        open: true,
        severity: "success",
        message: "Image uploaded",
      });
    }
    setLoading(false);
  };

  const copyImageUrl = (index) => {
    var copyText = images[index].imageUrl;
    navigator.clipboard.writeText(copyText);
    setAlert({
      open: true,
      severity: "success",
      message: "Image Url copied",
    });
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            <div
              style={{
                margin: "auto",
                width: "80%",
                marginTop: "5%",
                backgroundColor: "#F2F2F2",
                padding: "5%",
                boxShadow: "3px 3px 3px 3px #888888",
                borderRadius: "3%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                onClick={onImageUpload}
                fullWidth
                color="success"
              >
                Add Image
              </Button>
              <div
                style={
                  isDragging
                    ? {
                        marginTop: "5%",
                        height: "20vh",
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "#1FB264",
                        border: "4px dashed #2e7d32",
                      }
                    : {
                        marginTop: "5%",
                        height: "20vh",
                        width: "100%",
                        textAlign: "center",
                        border: "4px dashed #2e7d32",
                      }
                }
                {...dragProps}
              >
                <Typography style={{ marginTop: "10%", color: "#2e7d32" }}>
                  DRAG AND DROP AN IMAGE
                </Typography>
              </div>
            </div>

            {
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  marginTop: "5%"
                }}
              >
                <ImageList cols={2}>
                  {imageList &&
                    imageList.map((image, index) => (
                      <div style={{ marginTop: "3vh" }} key={index}>
                        <ImageListItem>
                          <img src={image["data_url"]} alt="" loading="lazy" />

                          <ImageListItemBar
                            subtitle={
                              image.imageUrl ? image.imageUrl : "Not upload yet"
                            }
                            position="top"
                          />
                          <ImageListItemBar
                            actionIcon={
                              <>
                                {image.imageUrl ? (
                                  <Tooltip title="Copy Image Url">
                                    <IconButton
                                      sx={{
                                        color: "rgba(255, 255, 255, 0.54)",
                                      }}
                                    >
                                      <ContentCopyIcon
                                        onClick={() => copyImageUrl(index)}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                ) : loading ? (
                                  <CircularProgress
                                    color="secondary"
                                    size="1.2rem"
                                  />
                                ) : (
                                  <Tooltip title="Upload Image">
                                    <IconButton
                                      sx={{
                                        color: "rgba(255, 255, 255, 0.54)",
                                      }}
                                    >
                                      <FileUploadIcon
                                        onClick={() => uploadImage(index)}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <IconButton
                                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                >
                                  <Tooltip title="Remove This Image Locally">
                                    <DeleteIcon
                                      onClick={() => onImageRemove(index)}
                                    />
                                  </Tooltip>
                                </IconButton>
                              </>
                            }
                          />
                        </ImageListItem>
                      </div>
                    ))}
                </ImageList>
              </div>
            }
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
