import {Button, makeStyles, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import { categories } from '../../Constants/data';
import {Link} from 'react-router-dom';

const useStyles =  makeStyles({
    create: {
        // backgroundColor: "#6495ED",
        color: "#fff",
        margin: 20,
        width: "86%",
    },
    table: {
        border: "1px solid rgba(224, 224, 224, 1)"
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    categoryLink: {
        textDecoration: "none",
        color: "inherit",
    },
    
})

const Categories = () => {
    const classes = useStyles();
    return(
        <>
            <Link to='/create' className={classes.link}>
                <Button variant="contained" className={classes.create} color="primary">CREATE</Button>
            </Link>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={`/`} className={classes.categoryLink}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    categories.map(category => (
                    <TableRow>
                        <TableCell>
                            <Link to={`/?category=${category}`} className={classes.categoryLink}>
                                {category}
                            </Link>
                        </TableCell>
                    </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </>
    )
}

export default Categories;