import React from 'react' 
import { NavBar } from './NavBar';
import { Wrapper } from './Wrapper';

interface LayoutsProps {
    variant?: "small" | "regular";
}

const Layout: React.FC<LayoutsProps> = ({variant, children}) =>{
        return (
        <>
        <NavBar />
            <Wrapper variant={variant}>
                
                {children}
            </Wrapper>
        </>
        );
}
export default Layout