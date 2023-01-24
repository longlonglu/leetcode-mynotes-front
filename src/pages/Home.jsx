import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { questionColumns } from "../componets/table/questionColumns";
import { SearchToolbar } from "../componets/table/SearchToolbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { questionActions } from "../redux/actions";
import { bindActionCreators } from "redux";

export default function Home() {
  let navigate = useNavigate();

  const rows = useSelector((state) => state.questionReducer);
  const { loadAllQuestion } = bindActionCreators(
    questionActions,
    useDispatch()
  );

  useEffect(() => {
    if (rows.allQuestions.length === 0) {
      loadAllQuestion();
    }
  }, []);

  const handleEvent = (e) => {
    navigate("/question/" + e.row.id);
  };

  return (
    <div style={{ height: "95vh", width: "100%" }}>
      <DataGrid
        density="standard"
        hideFooterSelectedRowCount={true}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important",
          },
        }}
        rowsPerPageOptions={[100]}
        onRowClick={(e) => {
          handleEvent(e);
        }}
        rows={rows.showAll ? rows.allQuestions : rows.doneQuestions}
        columns={questionColumns()}
        components={{ Toolbar: SearchToolbar }}
      />
    </div>
  );
}
