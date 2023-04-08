import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function Home(){
    return(
        <>
            
        <div className='App'>
        <NavBar/>
        <Banner />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        </div>

        </>
    )
}

export default Home