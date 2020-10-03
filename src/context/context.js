import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


// provider, consumer used to create global variable
const GithubContext = React.createContext();

const GithubProvider = ({children}) => {

    const [githubUser,setgithubUser] = useState(mockUser)
    const [repos,setrepos] = useState(mockRepos)
    const [followers,setfollowers] = useState(mockFollowers)

    // request loading
    const [requests,setRequests] = useState(0);
    const [isLoadind,setisLoading] = useState(false)

    // error
    const [error,setError] = useState({show:false,msg:""})

    //search user
    const searchGithubUser = async (user) =>{
        toggleError(false,"")
        setisLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).
        catch(err => console.log(err))

        if(response){
            setgithubUser(response.data)

            const {login,followers_url} = response.data;

            //repos
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).
            then(response => setrepos(response.data))

            //followers
            axios(`${followers_url}?per_page=100`).
            then(response => setfollowers(response.data))
        }
        else
        {
            toggleError(true,'There is no user with this username')
        }
        checkRequest();
        setisLoading(false)
    }


    //Check rate
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) => {
            let {rate:{remaining}} = data;
            
            setRequests(remaining)
            if(remaining === 0)
            {
                toggleError(true,'sorry you have exceeded your hourly rate limit !')
            }
        })
        .catch((err) => console.log(err))
    
    }

    function toggleError(show,msg){
        setError({show,msg})
    }

    
    useEffect(checkRequest,[])

    // global variables 
    return ( <GithubContext.Provider value={{githubUser,repos,followers,requests,error,isLoadind,searchGithubUser}}>{children}</GithubContext.Provider>)
}

export {GithubProvider,GithubContext}
