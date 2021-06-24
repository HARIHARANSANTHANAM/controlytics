import { Typography } from '@material-ui/core';
import { CardMedia, Container ,List,ListItemText} from '@material-ui/core';
import { Card , CardContent} from '@material-ui/core';
import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom';

function Home() {

    const user = useSelector(state => state.user);
    const history=useHistory();

    const renderCard=()=>{
        return <Card>
            <h1>Hai</h1>
        </Card>
    }




    return (
        <div>
            {
               user!=null?
               <>
               <Container>
               <Container>    
               <center>
               <Card>
                   <CardMedia>
                       <img src={'https://t3.ftcdn.net/jpg/02/05/89/68/240_F_205896803_e6YSDCGQ23Sg8ctel0n1Ca9OqcIObHj6.jpg'} 
                       alt=""/>
                   </CardMedia>
                   <CardContent>
                       <Container>
                           <Typography variant="h5">Thankyou for your Response</Typography>
                           <Typography variant="body2">{user.fullname}</Typography>
           <Typography variant="subtitle1" color="inherit">Skills Known Are</Typography>
                <List>{user.skills.map(skill=>{return  <ListItemText button primary={skill} />})}</List>
                <Typography variant="subtitle1" color="inherit">Phoneno:{user.phoneno}</Typography>
                <Typography variant="subtitle1" color="inherit">Email:{user.email}</Typography>
                </Container>
                </CardContent>
                </Card>
                </center>
                </Container>
                </Container>
               </>
               :history.push('/')
            }
        </div>
    )
}

export default Home
