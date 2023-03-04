import { render, screen, cleanup} from '@testing-library/react';
import MainContents from '../Components/MainContents';

test('should render MainContent component', () => {    
    render(<MainContents/>)
    const typeElement = screen.getByTestId('section-id')
    expect(typeElement).toBeInTheDocument();
})