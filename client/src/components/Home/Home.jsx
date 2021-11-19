import Banner from './Banner';
import Categories from './Categories';
import Posts from './Posts';
import {Grid} from '@material-ui/core';

const Home = () => {
    return (
        <>  
        {/* <> - otherwise everthing act as parent component */}
        <Banner/>
        <Grid container style={{display:"flex"}}>
            <Grid item lg={2} sm={2} xs={12}>
                <Categories/>
            </Grid>
            <Grid container item item lg={10} sm={10} xs={12}>
                <Posts/>
            </Grid>
        </Grid>
        </>
    )
}

export default Home;