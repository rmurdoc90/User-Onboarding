import React, {useState} from 'react';
import './Form.css'
import * as yup from 'yup';
import axios from 'axios';



const formSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    email: yup.string().email().required('Invalid Email'),
    password: yup.string().required('Enter Valid Password'),
    terms: yup.boolean().oneOf([true], "Please Join The Dark Side")
})





export default function Form(){

    const [formState, setFormState] = useState({
        name: '',
        email:'',
        password:'',
        terms:'',

    })

    const [errors, setErrors] = useState({
        name: '',
        email:'',
        password:'',
        terms:'',

    })

    const [users, setUsers] =useState([])

    const [post, setPost] =useState([])

    const validateChange = e =>{
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
            setErrors({
                ...errors, [e.target.name]: ''
            })
        })
        .catch(err =>{
            setErrors({
                ...errors,[e.target.name]: err.errors
            })
        })
    }

    const formSubmit = e =>{
        e.preventDefault();
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res =>{
            setPost(res.data);
            console.log("success", post);
            
            setFormState({
                name:'',
                email:'',
                password:'',
                terms:'',
            })
            setUsers({
                ...users, setFormState
            })
        })
        .catch(err =>{
            console.log(err.res)
        })
    }

    const inputChange = e => {
        e.persist();
        const newFormData ={
            ...formState,[e.target.name]:
            e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        validateChange(e);
        setFormState(newFormData)
    }

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
                <input
                id='name'
                type='text'
                name='name'
                value={formState.name}
                onChange={inputChange}
                />
                {errors.name.length > 0 ? (<p className='error'>{errors.name}</p>) : null}
            </label> <br/>
    
            <label htmlFor='email'>
                Email
                <input
                id='email'
                type='text'
                name='email'
                value={formState.email}
                onChange={inputChange}
                />
                {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>) : null}

            </label> <br/>

            <label htmlFor='password'>
                Password
                <input
                id='password'
                type='text'
                name='password'
                value={formState.password}
                onChange={inputChange}
                />
                {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>) : null}

            </label> <br/>

            <label htmlFor='terms' className='terms'>
                <input
                type='checkbox'
                name='terms'
                checked={formState.terms}
                onChange={inputChange}
                />
                Lover of tacos

            </label> <br/>

            <pre>{JSON.stringify(post)}</pre>
            <button htmlFor='submit button'>Submit</button>
        </form>
    )
}