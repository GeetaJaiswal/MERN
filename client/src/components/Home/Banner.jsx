import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    image: {
        background: `url(${'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg'}) center/100% #000`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        '& :first-child' : {
            fontSize: 66,
            color: "#ffffff",
            lineHeight: 1.5,
        },
        '& :last-child' : {
            fontSize: 20,
            background: "#ffffff",
        }
        
    }
});


const Banner = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.image}>
                <Typography>BLOG</Typography>
                <Typography>Code for Interview</Typography>
            </Box>
        </>
    )
}

export default Banner;