import React, {useState} from 'react';

export default function Form(){

    const [formState, setFormState] = useState({
        name: '',
        email:'',
        password:'',
        terms:'',

    })

    return(
        <form>
            <label htmlFor='name'>
                Name
                <input
                id='name'
                type='text'
                name='name'
                value={formState.name}
                />
            </label> <br/>

            <label htmlFor='email'>
                Email
                <input
                id='email'
                type='text'
                name='email'
                value={formState.email}
                />
            </label> <br/>

            <label htmlFor='password'>
                Password
                <input
                id='password'
                type='text'
                name='password'
                value={formState.password}
                />
            </label> <br/>

            <label htmlFor='terms' className='terms'>
                <input
                type='checkbox'
                name='terms'
                checked={formState.terms}
                />
            </label> <br/>
        </form>
    )
}