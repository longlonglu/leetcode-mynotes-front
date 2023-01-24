import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export function questionColumns() {
  return [
    {
      editable: false,
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 0.4,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params) => (
        <div>
          {(() => {
            if (params.value === 1) {
              return (
                <Tooltip title="Got It" placement="right-end">
                  <CheckIcon color="success" />
                </Tooltip>
              );
            } else if (params.value === 2) {
              return (
                <Tooltip title="Still Need Practise" placement="right-end">
                  <QuestionMarkIcon color="warning" />
                </Tooltip>
              );
            } else if (params.value === 3) {
              return (
                <Tooltip title="Pice Of Shit" placement="right-end">
                  <ThumbDownAltIcon color="action" />
                </Tooltip>
              );
            }
            else {
              return (
                <Tooltip title="Not Yet" placement="right-end">
                  <CloseIcon color="error" />
                </Tooltip>
              );
            }
          })()}
        </div>
      ),
    },
    {
      editable: false,
      field: "title",
      headerName: "Title",
      align: "left",
      headerAlign: "left",
      flex: 2,
      disableColumnMenu: true,
      hideSortIcons: true,
      sortable: false,
    },
    {
      editable: false,
      field: "difficulty",
      headerName: "Difficulty",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      disableColumnMenu: true,
      hideSortIcons: true,
      sortable: false,
      renderCell: (params) => (
        <div>
          {(() => {
            if (params.value === "Easy") {
              return <Chip label="Easy" color="success" variant="outlined" />;
            } else if (params.value === "Medium") {
              return <Chip label="Medium" color="warning" variant="outlined" />;
            } else {
              return <Chip label="Hard" color="error" variant="outlined" />;
            }
          })()}
        </div>
      ),
    },
    {
      editable: false,
      field: "tags",
      headerName: "Tag",
      align: "center",
      headerAlign: "center",
      flex: 2,
      disableColumnMenu: true,
      hideSortIcons: true,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.value && (
            <div>
              {params.value.map((data, key) => (
                <Chip
                  style={{ marginLeft: "0.5vw" }}
                  key={key * key + data}
                  label={data}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      editable: false,
      field: "frequency",
      headerName: "Frequency",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params) => (
        <div>
          <Typography variant="button" display="block" gutterBottom>
            {params.value}
          </Typography>
        </div>
      ),
    },
    {
      editable: false,
      field: "date",
      headerName: "Last Submit",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params) => (
        <div>
          {(() => {
            if (params.value !== null) {
              return (
                <Typography variant="overline" display="block" gutterBottom>
                  {params.value.split("T")[0]}
                </Typography>
              );
            } else {
              return (
                <Typography variant="overline" display="block" gutterBottom>
                  01-01-1970
                </Typography>
              );
            }
          })()}
        </div>
      ),
    },
  ];
}
