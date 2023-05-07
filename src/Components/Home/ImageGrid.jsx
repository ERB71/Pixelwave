import { Grid } from "@mui/material"

function ImageGrid(){
    return(
        <div style={{ height: "25%", display: "flex", flexDirection: "column", flexWrap: "noWrap", alignItems: "center", justifyContent: "center"}}>
            <Grid container margin = "0px" padding = "0px" rowSpacing={{xs: 1, sm: 2, md: 3}} columnSpacing={{ xs: 2, sm: 3, md: 5 }} > 
                <Grid item xs={12} sm={6} md={4}>
                    <img src= {require("./Images/Mbappe.jpg")} alt="Kylian Mbappe" style={{ width: "100%", height: "400px", border: "2px solid red"}} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <img src= {require("./Images/Saka.jpg")} alt="Bukayo Saka" style={{ width: "100%", height: "400px", border: "2px solid red"}} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <img src= {require("./Images/Messi.jpg")} alt="Lionel Messi" style={{ width: "100%", height: "400px", border: "2px solid red"}} />
                </Grid>
            </Grid>
        </div>
    )
}
export default ImageGrid;