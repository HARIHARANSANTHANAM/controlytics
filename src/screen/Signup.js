import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import {Container,CssBaseline,Button} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  submit:{
   background:"black",
   color:"white"
  }
}));

function Signup() {
    
    const history=useHistory();
    const [user,setuser]=useState({
        email:"",
        phoneno:"",
        fullname:"",
        skills:[""]
    })
    const classes=useStyles();
    
    const handleAddSkills=(e)=>{
            e.preventDefault();
            const values = [...user.skills];
            values.push({ value: null });
            setuser({skills:values});
            console.log(user);
    }

    const handleDeleteSkills=(e,i)=>{
        e.preventDefault();
        const values = [...user.skills];
        values.splice(i, 1);
        setuser({skills:values});
        console.log(user);
}
   const  handleChangeSkills=(i, event)=> {
    const values = [...user.skills];
    values[i] = event.target.value;
    setuser({skills:values});
  }

  const  handleChange=(event)=> {
    console.log(event.target.name+":"+event.target.value)
    const values={...user};
    values[event.target.name]=event.target.value;
    console.log(values)
    setuser(values)
  }

  
    
    const handleSubmit = (e) => {
        history.push('/Home')
     }

    return (
        <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>


        <form className={classes.form}>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'email'}
            name="email"
            onChange={handleChange}
            value={user.email}
          />
        </FormControl>
        
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Phone No</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'number'}
            name="phoneno"
            value={user.phoneno}
            fullWidth
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">FullName</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'text'}
            name="fullname"
            onChange={handleChange}
            value={user.fullname}
          />
        </FormControl>
       
        {
        user.skills && user.skills.map((skill,index)=>{
            return <form key={index} >
                <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Skills</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'text'}
            value={skill.value}
            onChange={e => handleChangeSkills(index, e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e)=>handleDeleteSkills(e,index)}
                >
                   <DeleteIcon /> 
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>
                 
            </form>
        })
        }
        <br></br>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleAddSkills}
      >
        Add Skills
      </Button>

        <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Signup
            </Button>
      </form>
        </div>
        </Container>
        </div>
    )
}

export default Signup
