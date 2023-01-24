import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { questionActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { Button } from "@mui/material";

export function SearchToolbar() {
  const questionState = useSelector((state) => state.questionReducer);
  const { showAll } = bindActionCreators(questionActions, useDispatch());
  const setShowAll = () => {
    showAll(!questionState.showAll);
  };
  return (
    <div style={{ width: "100%" }}>
      <Button
        color="secondary"
        size="small"
        variant="outlined"
        style={{ float: "right", marginRight: "1%", marginTop: "1%", minWidth: "20vw" }}
        onClick={() => setShowAll()}
      >
        {questionState.showAll
          ? "Show Only Did Questions"
          : "Show All Questions"}
      </Button>
      <GridToolbarQuickFilter
        style={{ float: "left", marginLeft: "2%", marginTop: "1%" }}
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </div>
  );
}
