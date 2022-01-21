import React from 'react' 
import { Wrapper } from './Wrapper';

interface LayoutsProps {
    variant?: "small" | "regular";
}

const Layout: React.FC<LayoutsProps> = ({variant, children}) =>{
        return (
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        );
}
export default Layout