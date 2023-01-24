import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { ImageUploader } from "./ImageUploader";
import { GooglePhotoIcon } from "../icons/icons";

export default function ImageDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div>
      <div
        fontSize="large"
        onClick={toggleDrawer()}
        style={{ position: "fixed", left: "0.5%", bottom: "1%", zIndex: 1000 }}
      >
        <GooglePhotoIcon />
      </div>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer()}>
        <Box sx={{ width: "50vw" }}>
          <ImageUploader />
        </Box>
      </Drawer>
    </div>
  );
}
