import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Input} from '@material-ui/core';
import { Container, CssBaseline, Button,FormHelperText ,Typography} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import logo from '../assets/signup_icon.jpg';
import CreateAccount from '../Action/UserAction';
import {useDispatch} from 'react-redux'

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
  submit: {
    background: "black",
    color: "white"
  }
}));

function Signup() {

  const history = useHistory();
  const [user, setuser] = useState({
    email: "",
    phoneno: "",
    fullname: "",
    skills: [""]
  })
  
  const dispatch = useDispatch()

  const [Error, setError] = useState({
    email:{
    error: false,
    helperText: "",
    },
    phone:{
      error: false,
      helperText: "",
    },
    fullname:{
      error: false,
      helperText: "",
    },
    skills:[{
      error: false,
      helperText: "",
    }]
  });



  const classes = useStyles();

  const handleState=(seterror,values)=>{
     setError({...Error,skills:seterror})
    setuser({...user, skills: [...values] });
  }

  const handleAddSkills = (e) => {
    e.preventDefault();
    const values = [...user.skills];
    values.push("");
    const seterror=[...Error.skills];
    seterror.push({error: false,helperText: ""})
    handleState(seterror,values);
  }

  const handleDeleteSkills = (e, i) => {
    e.preventDefault();
    const values = [...user.skills];
    values.splice(i, 1);
    const seterror=[...Error.skills];
    seterror.splice(i,1);
    handleState(seterror,values);
  }

  const handleChangeSkills = (i, event) => {
    const values = [...user.skills];
    values[i] = event.target.value;
    const res={...Error};
    res.skills[i]={  helperText: "",
    error: false}
    setError(res)
    setuser({ ...user,skills: [...values] });
  }

  const handleChange = (event) => {
    const values = { ...user };
    const res={...Error};
    switch(event.target.name)
    {
      case "email":validateEmail(event);
                    break;
      case "phoneno":validatePhone(event);
                    break;
      case "fullname":res.fullname={helperText: "", error: false}
                      setError(res);
                      break;
      default:break;
    }
    values[event.target.name] = event.target.value;
    setuser(values)
  }


  const validateEmail = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const res={...Error};
    if (!pattern.test(e.target.value)) {
      res.email={  helperText: "Enter a valid Email Address!",error: true,};
      setError(res);
    } else {
      res.email={helperText: "", error: false}
      setError(res);
    }
  };

  const validatePhone = (e) => {
    const res={...Error};
    if (e.target.value.trim().length !== 10) {
      res.phone={ helperText: "Enter a valid Phone number!", error: true };
      setError(res);
    } else {
      res.phone={helperText: "", error: false}
      setError(res);
    }
  };


  const handleValidationOnsubmit=()=>{
    const res={...Error};
    if(user.email==="" || res.email.error)
    {
      res.email={ helperText: "Enter a valid Email Address!",
      error: true,}
      setError(res);
      return false;
    }
   
    if(user.phoneno ==="" || res.phone.error)
    {
      res.phone={  helperText: "Enter a valid Phone No!",
      error: true,}
      setError(res);
      return false;
    }
    if(user.fullname === "")
    {
      res.fullname={ error: true,
        helperText: "Enter Your Fullname"}
        setError(res);
        return false;
    }


    for(let i=0;i<user.skills.length;i++)
    {
      if(!user.skills[i])
      {
        res.skills[i]={ helperText: "Enter a valid Skills",
        error: true,}
        setError(res);
        return false;
      }
    }


    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(handleValidationOnsubmit())
    {
      console.log(user)
        dispatch(CreateAccount(user));
        history.push('/Home')
    }
   
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

        <div>
            <img src={logo} alt="Poornatha" style={{ width: "50px" }} />
          </div>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
         
          <form className={classes.form}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel shrink htmlFor="standard-adornment-password">Email</InputLabel>
              <Input
                id="standard-adornment-password"
                type={'email'}
                name="email"
                onChange={handleChange}
                value={user.email}
                error={Error.email.error}
              />
               <FormHelperText id="component-error-text">{Error.email.helperText}</FormHelperText>
            </FormControl>

            <FormControl  className={clsx(classes.margin, classes.textField)}>
              <InputLabel shrink htmlFor="outlined-adornment-phoneno">Phone No</InputLabel>
              <Input
                id="outlined-adornment-phoneno"
                type={'number'}
                name="phoneno"
                value={user.phoneno}
                fullWidth
                error={Error.phone.error}
                onChange={handleChange}
                labelWidth={70}
              />
              <FormHelperText id="component-error-text">{Error.phone.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel shrink htmlFor="standard-adornment-password">FullName</InputLabel>
              <Input
                id="standard-adornment-password"
                type={'text'}
                name="fullname"
                error={Error.fullname.error}
                onChange={handleChange}
                value={user.fullname}
              />
              
              <FormHelperText id="component-error-text">{Error.fullname.helperText}</FormHelperText>
            </FormControl>

            {
              user.skills && user.skills.map((skill, index) => {
                return <form key={index} >
                  <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel shrink htmlFor="standard-adornment-password">Skills</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={'text'}
                      value={skill}
                      onChange={e => handleChangeSkills(index, e)}
                      error={Error.skills[index].error}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => handleDeleteSkills(e, index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                        
                      }
                    />
                      <FormHelperText id="component-error-text">{Error.skills[index].helperText}</FormHelperText>
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
